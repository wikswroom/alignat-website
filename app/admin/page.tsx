"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function AdminPage() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
      return;
    }
    // Hämta företagets status från Firestore.
    const companyDocRef = doc(db, "companies", companyId);
    const companyDoc = await getDoc(companyDocRef);
    setCompany(companyDoc.exists() ? (companyDoc.data() as CompanyData) : null);
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
          : formatDate(undefined);

  const handleOpenPortal = async () => {
    if (!userProfile?.companyId) {
      setMessage("Saknar företag.");
      return;
    }
    setMessage("");
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
        return;
      }
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      setMessage("Kunde inte öppna portalen.");
    }
  };

  const handleInvite = async () => {
    const trimmed = inviteEmail.trim().toLowerCase();
    if (!trimmed || !userProfile?.companyId) {
      setMessage("Skriv en giltig e-postadress.");
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
      const responseMessage = (result.data as { message?: string })?.message;
      setMessage(responseMessage || "Inbjudan skickad.");
      setInviteEmail("");
      await loadInvites(userProfile.companyId);
    } catch (error) {
      console.error("Invite error:", error);
      setMessage("Kunde inte skicka inbjudan.");
    } finally {
      setIsSendingInvite(false);
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">Admin Portal</h1>
            <p className="text-sm text-[#8e8e93]">
              {userProfile.email || firebaseUser.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="text-sm font-semibold text-[#0077B6] underline"
          >
            Logga ut
          </button>
        </div>

        {message && (
          <div className="mb-6 text-sm text-[#d9534f] bg-[#fde8e8] border border-[#d9534f] rounded-lg px-3 py-2">
            {message}
          </div>
        )}

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
              className="rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3 hover:bg-[#0067a1] transition"
            >
              Hantera Prenumeration & Fakturor
            </button>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Personal</h2>

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
                    <span className="text-[#8e8e93]">
                      {employee.role || "okänd"}
                    </span>
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
                    <span className="text-[#8e8e93]">{invite.status}</span>
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
                  className="rounded-lg border border-[#0077B6] text-[#0077B6] font-semibold px-4 py-3 hover:bg-[#f2f7ff] transition disabled:opacity-60"
                >
                  {isSendingInvite ? "Skickar..." : "Skicka inbjudan"}
                </button>
              </div>
              <p className="text-xs text-[#8e8e93] mt-2">
                En prenumerationsuppdatering görs automatiskt för nya unika
                anställda.
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
    </div>
  );
}
