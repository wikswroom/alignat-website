"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "@/app/lib/firebaseClient";

type CompanyData = {
  subscriptionStatus?: string;
  subscriptionEndsAt?: { seconds?: number };
  trialEndsAt?: { seconds?: number };
  stripeSubscriptionId?: string;
};

type UserProfile = {
  companyId?: string;
  role?: string;
  email?: string;
};

type Invite = {
  id: string;
  email: string;
  status: string;
};

type Employee = {
  id: string;
  email?: string;
  role?: string;
};

type SubscriptionDetails = {
  nextPaymentTimestamp?: number | null;
  status?: string;
};

type ConfirmState = {
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AdminPage() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<SubscriptionDetails | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false); // UI feedback for portal launch
  const [isProcessingStaff, setIsProcessingStaff] = useState(false); // Overlay for staff actions
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  useEffect(() => {
    // Återställ portal-laddning när användaren kommer tillbaka till sidan.
    const resetPortalLoading = () => {
      if (document.visibilityState === "visible") {
        setIsOpeningPortal(false);
      }
    };

    window.addEventListener("pageshow", resetPortalLoading);
    document.addEventListener("visibilitychange", resetPortalLoading);

    return () => {
      window.removeEventListener("pageshow", resetPortalLoading);
      document.removeEventListener("visibilitychange", resetPortalLoading);
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setFirebaseUser(user);
      setIsLoading(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await signOut(auth);
          router.push("/login");
          return;
        }

        const profile = userDoc.data() as UserProfile;
        if (profile.role !== "superadmin") {
          await signOut(auth);
          router.push("/login");
          return;
        }

        setUserProfile(profile);
        await loadCompanyData(profile.companyId);
        await loadEmployees(profile.companyId);
        await loadInvites(profile.companyId);
      } catch (error) {
        console.error("Auth guard error:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const loadCompanyData = async (companyId?: string) => {
    if (!companyId) {
      setCompany(null);
      setSubscriptionDetails(null);
      return;
    }
    // Hämta företagets status från Firestore.
    const companyDocRef = doc(db, "companies", companyId);
    const companyDoc = await getDoc(companyDocRef);
    const companyData = companyDoc.exists()
      ? (companyDoc.data() as CompanyData)
      : null;
    setCompany(companyData);

    // Hämta prenumerationsdetaljer från Stripe via Cloud Function.
    if (companyData?.stripeSubscriptionId) {
      try {
        const getStripeSubscription = httpsCallable(
          functions,
          "getStripeSubscription",
        );
        const result = await getStripeSubscription({
          subscriptionId: companyData.stripeSubscriptionId,
          companyId,
        });
        setSubscriptionDetails(result.data as SubscriptionDetails);
      } catch (error) {
        console.error("Fel vid hämtning av prenumeration:", error);
        setSubscriptionDetails(null);
      }
    } else {
      setSubscriptionDetails(null);
    }
  };

  const loadEmployees = async (companyId?: string) => {
    if (!companyId) {
      setEmployees([]);
      return;
    }
    // Hämta alla användare i företaget.
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("companyId", "==", companyId));
    const snapshot = await getDocs(usersQuery);
    const list = snapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as Employee),
      id: docSnap.id,
    }));
    setEmployees(list);
  };

  const loadInvites = async (companyId?: string) => {
    if (!companyId) {
      setInvites([]);
      return;
    }
    // Hämta pending invites.
    const invitesRef = collection(db, "invites");
    const invitesQuery = query(
      invitesRef,
      where("companyId", "==", companyId),
      where("status", "==", "pending"),
    );
    const snapshot = await getDocs(invitesQuery);
    const list = snapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as Invite),
      id: docSnap.id,
    }));
    setInvites(list);
  };

  const translateStatus = (status?: string) => {
    const statusMap: Record<string, string> = {
      trialing: "Provperiod",
      active: "Aktiv",
      past_due: "Förfallen",
      canceled: "Avslutad",
      unpaid: "Obetald",
      cancelling: "Avslutas",
      expired: "Utgånget",
      none: "Provperiod",
    };
    return statusMap[status || ""] || status || "Okänd";
  };

  const getRoleLabel = (role?: string) => {
    if (role === "superadmin") return "Ägare";
    if (role === "admin") return "Admin";
    if (role === "employee") return "Anställd";
    return "Okänd";
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("sv-SE");
  };

  const currentStatus = company?.subscriptionStatus || "none";
  const subscriptionEndsAtSeconds = company?.subscriptionEndsAt?.seconds;
  const trialEndsAtSeconds = company?.trialEndsAt?.seconds;
  const now = new Date();
  const subscriptionEndsAt =
    subscriptionEndsAtSeconds ? new Date(subscriptionEndsAtSeconds * 1000) : null;
  const trialEndsText = trialEndsAtSeconds
    ? new Date(trialEndsAtSeconds * 1000).toLocaleDateString("sv-SE")
    : null;

  const isLapsed =
    ["canceled", "expired", "past_due"].includes(currentStatus) ||
    (currentStatus === "cancelling" &&
      subscriptionEndsAt &&
      subscriptionEndsAt < now);

  const nextPaymentText =
    currentStatus === "cancelling"
      ? `Avslutas ${formatDate(subscriptionEndsAtSeconds)}`
      : currentStatus === "past_due"
        ? "Betalning misslyckad"
        : currentStatus === "none" && trialEndsText
          ? `Efter provperioden ${trialEndsText}`
          : formatDate(subscriptionDetails?.nextPaymentTimestamp || undefined);

  const handleOpenPortal = async () => {
    if (!userProfile?.companyId) {
      setMessage("Saknar företag.");
      return;
    }
    setMessage("");
    setIsOpeningPortal(true); // Show loading state before redirect
    try {
      // Anropa Cloud Function för Stripe Portal.
      const createPortalSession = httpsCallable(
        functions,
        "createStripePortalSession",
      );
      const result = await createPortalSession({
        companyId: userProfile.companyId,
        // Skicka in korrekt web-return URL för Stripe Portal.
        returnUrl: `${window.location.origin}/admin`,
      });
      const url = (result.data as { url?: string })?.url;
      if (!url) {
        setMessage("Kunde inte öppna portalen.");
        setIsOpeningPortal(false);
        return;
      }
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      setMessage("Kunde inte öppna portalen.");
      setIsOpeningPortal(false);
    }
  };

  const handleInvite = async () => {
    const trimmed = inviteEmail.trim().toLowerCase();
    if (!trimmed || !userProfile?.companyId) {
      setMessage("Skriv en giltig e-postadress.");
      return;
    }
    
    // Enkel email-validering på klientsidan
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setMessage("Ogiltig e-postadress. Kontrollera formatet.");
      return;
    }
    
    setIsSendingInvite(true);
    setMessage("");
    try {
      // Anropa Cloud Function för inbjudningar.
      const inviteEmployees = httpsCallable(functions, "inviteEmployees");
      const result = await inviteEmployees({
        emails: [trimmed],
        companyId: userProfile.companyId,
      });
      const fullResponse = result.data as { message?: string; success?: boolean };
      
      // Visa backend-meddelande.
      const responseMessage = fullResponse?.message || "";
      
      // Kolla om backend returnerade "Ogiltiga"
      if (responseMessage.includes("Ogiltiga:")) {
        setMessage("Ogiltig e-postadress. Kontrollera formatet.");
      } else if (responseMessage.toLowerCase().includes("inga nya") || 
          responseMessage.includes("redan")) {
        setMessage(
          "Inbjudan kunde inte skickas. Användaren finns redan, är redan inbjuden, " +
          "eller så har du nyligen bjudit in samma person (vänta 1-2 minuter och försök igen)."
        );
      } else if (responseMessage.includes("skickad")) {
        setMessage("Inbjudan skickad!");
      } else if (responseMessage) {
        setMessage(responseMessage);
      } else {
        setMessage("Inbjudan skickad!");
      }
      
      setInviteEmail("");
      
      // Ge Firestore lite tid att synca innan reload
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await loadInvites(userProfile.companyId);
      await loadEmployees(userProfile.companyId);
    } catch (error: any) {
      console.error("Invite error:", error);
      // Visa Firebase error om möjligt.
      const errorMsg = error?.message || "Kunde inte skicka inbjudan.";
      setMessage(errorMsg);
    } finally {
      setIsSendingInvite(false);
    }
  };

  const confirmAction = (title: string, body: string) => {
    // Visa en egen bekräftelseruta för jämnare UI.
    return new Promise<boolean>((resolve) => {
      setConfirmState({
        title,
        body,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  const handlePromote = async (userId: string, email?: string) => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Befordra",
      `Befordra ${email || "användare"} till admin?`,
    );
    if (!confirmed) {
      return;
    }
    setIsProcessingStaff(true);
    setMessage("");
    try {
      const promoteToAdmin = httpsCallable(functions, "promoteToAdmin");
      await promoteToAdmin({ userIdToPromote: userId });
      await loadEmployees(userProfile.companyId);
    } catch (error) {
      console.error("Promote error:", error);
      setMessage("Kunde inte befordra användaren.");
    } finally {
      setIsProcessingStaff(false);
    }
  };

  const handleDemote = async (userId: string, email?: string) => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Degradera",
      `Degradera ${email || "användare"} till anställd?`,
    );
    if (!confirmed) {
      return;
    }
    setIsProcessingStaff(true);
    setMessage("");
    try {
      const demoteToEmployee = httpsCallable(functions, "demoteToEmployee");
      await demoteToEmployee({ userIdToDemote: userId });
      await loadEmployees(userProfile.companyId);
    } catch (error) {
      console.error("Demote error:", error);
      setMessage("Kunde inte degradera användaren.");
    } finally {
      setIsProcessingStaff(false);
    }
  };

  const handleRemoveEmployee = async (userId: string, email?: string) => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Ta bort",
      `Ta bort ${email || "användare"}?`,
    );
    if (!confirmed) {
      return;
    }
    setIsProcessingStaff(true);
    setMessage("");
    try {
      const removeEmployee = httpsCallable(functions, "removeEmployee");
      await removeEmployee({
        userIdToRemove: userId,
        companyId: userProfile.companyId,
      });
      await loadEmployees(userProfile.companyId);
    } catch (error) {
      console.error("Remove employee error:", error);
      setMessage("Kunde inte ta bort användaren.");
    } finally {
      setIsProcessingStaff(false);
    }
  };

  const handleDeleteInvite = async (inviteId: string, email?: string) => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Ta bort inbjudan",
      `Ta bort inbjudan till ${email || "användare"}?`,
    );
    if (!confirmed) {
      return;
    }
    setIsProcessingStaff(true);
    setMessage("");
    try {
      const deleteInvite = httpsCallable(functions, "deleteInvite");
      await deleteInvite({ inviteId, companyId: userProfile.companyId });
      await loadInvites(userProfile.companyId);
    } catch (error) {
      console.error("Delete invite error:", error);
      setMessage("Kunde inte ta bort inbjudan.");
    } finally {
      setIsProcessingStaff(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userProfile?.companyId) {
      return;
    }
    setIsDeleting(true);
    try {
      // Anropa Cloud Function för permanent radering.
      const permanentlyDeleteCompanyData = httpsCallable(
        functions,
        "permanentlyDeleteCompanyData",
      );
      await permanentlyDeleteCompanyData({ companyId: userProfile.companyId });
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Kunde inte radera kontot.");
      setIsDeleting(false);
    }
  };

  const canDelete = !["active", "trialing"].includes(currentStatus);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f2f2ff] flex items-center justify-center">
        <div className="text-[#8e8e93]">Laddar...</div>
      </div>
    );
  }

  if (!firebaseUser || !userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f2f2ff]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">Admin Portal</h1>
              <p className="text-sm text-[#8e8e93] mt-1">
                {userProfile.email || firebaseUser.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-black hover:bg-gray-50 transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logga ut
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Prenumerationsstatus
            </h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8e8e93]">Status</span>
              <span className="text-black font-semibold">
                {translateStatus(currentStatus)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-[#8e8e93]">Nästa betalning</span>
              <span className="text-black">{nextPaymentText}</span>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Betalning
            </h2>
            <button
              type="button"
              onClick={handleOpenPortal}
              disabled={isOpeningPortal}
              className="rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3 hover:bg-[#0067a1] transition disabled:opacity-60"
            >
              {isOpeningPortal
                ? "Öppnar portal..."
                : "Hantera Prenumeration & Fakturor"}
            </button>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Personal</h2>

            {message && (
              <div className={`mb-4 text-sm rounded-lg px-4 py-3 border ${
                message.includes("kunde inte") || message.includes("vänta") 
                  ? "text-[#d9534f] bg-[#fde8e8] border-[#d9534f]" 
                  : "text-green-700 bg-green-50 border-green-300"
              }`}>
                {message}
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-[#8e8e93] mb-2">Aktiva användare</p>
              <div className="space-y-2">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-sm"
                  >
                    <span className="text-black">
                      {employee.email || "Okänd e-post"}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#8e8e93]">
                        {getRoleLabel(employee.role)}
                      </span>
                      {/* Actions for staff management */}
                      {employee.role === "employee" && (
                        <button
                          type="button"
                          onClick={() => handlePromote(employee.id, employee.email)}
                          className="text-xs text-[#0077B6] underline"
                        >
                          Befordra
                        </button>
                      )}
                      {employee.role === "admin" && (
                        <button
                          type="button"
                          onClick={() => handleDemote(employee.id, employee.email)}
                          className="text-xs text-[#0077B6] underline"
                        >
                          Degradera
                        </button>
                      )}
                      {employee.role !== "superadmin" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveEmployee(employee.id, employee.email)
                          }
                          className="text-xs text-[#d9534f] underline"
                        >
                          Ta bort
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {employees.length === 0 && (
                  <div className="text-sm text-[#8e8e93]">
                    Inga användare hittades.
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[#8e8e93] mb-2">Inbjudningar</p>
              <div className="space-y-2">
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 text-sm"
                  >
                    <span className="text-black">{invite.email}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#8e8e93]">
                        {invite.status === "pending" ? "Väntar på svar" : invite.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteInvite(invite.id, invite.email)}
                        className="text-xs text-[#d9534f] underline"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))}
                {invites.length === 0 && (
                  <div className="text-sm text-[#8e8e93]">
                    Inga väntande inbjudningar.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-black mb-2">
                Bjud in anställd
              </label>
              
              <div className="mb-3 bg-[#f2f2ff] border border-gray-200 rounded-lg px-4 py-3 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#0077B6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-[#0077B6] font-medium mb-1">
                    Så här aktiverar den inbjudna sitt konto:
                  </p>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
                    Den inbjudna måste ladda ner Alignat-appen och skapa ett konto med samma e-postadress. 
                    Välj sedan <span className="font-medium">"Jag har blivit inbjuden"</span> vid registrering för att aktivera kontot.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  placeholder="e-post@foretag.se"
                />
                <button
                  type="button"
                  onClick={handleInvite}
                  disabled={isSendingInvite}
                  className="rounded-lg border border-[#0077B6] text-[#0077B6] font-semibold px-4 py-3 hover:bg-[#f2f7ff] transition disabled:opacity-60 active:scale-95"
                >
                  {isSendingInvite ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Skickar...
                    </span>
                  ) : (
                    "Skicka inbjudan"
                  )}
                </button>
              </div>
              <p className="text-xs text-[#8e8e93] mt-2">
                En prenumerationsuppdatering görs automatiskt för nya unika anställda.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Danger Zone
            </h2>
            <p className="text-sm text-[#8e8e93] mb-4">
              Radera hela företagskontot och all data permanent.
            </p>
            <button
              type="button"
              onClick={() => {
                if (!canDelete) {
                  setMessage(
                    "Du måste avsluta din prenumeration först.",
                  );
                  return;
                }
                setShowDeleteModal(true);
              }}
              className="rounded-lg border border-[#d9534f] text-[#d9534f] font-semibold px-4 py-3 hover:bg-[#fde8e8] transition"
            >
              Radera konto & all data
            </button>
          </section>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-2">
              Bekräfta radering
            </h3>
            <p className="text-sm text-[#8e8e93] mb-4">
              Skriv ordet RADERA för att bekräfta permanent radering.
            </p>
            <input
              type="text"
              value={deleteText}
              onChange={(event) => setDeleteText(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              placeholder="RADERA"
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-black font-semibold"
              >
                Avbryt
              </button>
              <button
                type="button"
                disabled={deleteText !== "RADERA" || isDeleting}
                onClick={handleDeleteAccount}
                className="flex-1 rounded-lg bg-[#d9534f] text-white font-semibold px-4 py-3 disabled:opacity-60"
              >
                {isDeleting ? "Raderar..." : "Bekräfta"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isProcessingStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl px-6 py-4 text-black font-semibold">
            Bearbetar...
          </div>
        </div>
      )}

      {confirmState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-2">
              {confirmState.title}
            </h3>
            <p className="text-sm text-[#8e8e93] mb-4">
              {confirmState.body}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  // Stäng modal och avbryt action.
                  confirmState.onCancel();
                  setConfirmState(null);
                }}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-black font-semibold"
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={() => {
                  // Stäng modal och bekräfta action.
                  confirmState.onConfirm();
                  setConfirmState(null);
                }}
                className="flex-1 rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
