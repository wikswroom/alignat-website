"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "@/app/lib/firebaseClient";

// Tier-konfiguration (matchar appen)
// priceExkl = Stripe (exkl. moms), priceInkl = Apple (inkl. moms)
const TIERS: Record<string, { name: string; priceExkl: number; priceInkl: number }> = {
  grund: { name: "Grundpaket", priceExkl: 119, priceInkl: 149 },
  liten: { name: "Liten", priceExkl: 199, priceInkl: 249 },
  mellan: { name: "Mellan", priceExkl: 279, priceInkl: 349 },
  stor: { name: "Stor", priceExkl: 399, priceInkl: 499 },
};

type CompanyData = {
  subscriptionStatus?: string;
  subscriptionTier?: "grund" | "liten" | "mellan" | "stor";
  paymentProvider?: "stripe" | "apple" | "none";
  subscriptionEndsAt?: { seconds?: number };
  trialEndsAt?: { seconds?: number };
  pendingTierChange?: "grund" | "liten" | "mellan" | "stor";
  pendingTierChangeDate?: { seconds?: number };
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
};

type UserProfile = {
  companyId?: string;
  role?: string;
  email?: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);
  const [isActivatingSubscription, setIsActivatingSubscription] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  // Återställ portal-laddning när användaren kommer tillbaka till sidan.
  useEffect(() => {
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

  // Auth guard och data-laddning
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
      } catch (error) {
        console.error("Auth guard error:", error);
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  // Hämta företagsdata och prenumerationsdetaljer
  const loadCompanyData = async (companyId?: string) => {
    if (!companyId) {
      setCompany(null);
      setSubscriptionDetails(null);
      return;
    }
    const companyDocRef = doc(db, "companies", companyId);
    const companyDoc = await getDoc(companyDocRef);
    const companyData = companyDoc.exists()
      ? (companyDoc.data() as CompanyData)
      : null;
    setCompany(companyData);

    // Hämta prenumerationsdetaljer från Stripe via Cloud Function
    if (companyData?.stripeSubscriptionId) {
      try {
        const getStripeSubscription = httpsCallable(functions, "getStripeSubscription");
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

  // Översätt prenumerationsstatus till svenska
  const translateStatus = (status?: string) => {
    const statusMap: Record<string, string> = {
      trialing: "Provperiod",
      active: "Aktiv",
      past_due: "Betalning förfallen",
      payment_failed: "Betalning misslyckad", // Apple-specifik
      canceled: "Avslutad",
      unpaid: "Obetald",
      cancelling: "Avslutas",
      expired: "Utgånget",
      none: "Provperiod",
    };
    return statusMap[status || ""] || status || "Okänd";
  };

  // Formatera datum
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("sv-SE");
  };

  // Beräkna tillstånd
  const currentStatus = company?.subscriptionStatus || "none";
  const currentTier = company?.subscriptionTier || "grund";
  const tierInfo = TIERS[currentTier] || TIERS.grund;
  const paymentProvider = company?.paymentProvider || "none";
  const isAppleUser = paymentProvider === "apple";
  const hasStripeConnection = !!company?.stripeCustomerId;

  const subscriptionEndsAtSeconds = company?.subscriptionEndsAt?.seconds;
  const trialEndsAtSeconds = company?.trialEndsAt?.seconds;
  const pendingTierChangeDate = company?.pendingTierChangeDate?.seconds;
  const now = new Date();
  const subscriptionEndsAt = subscriptionEndsAtSeconds
    ? new Date(subscriptionEndsAtSeconds * 1000)
    : null;
  const trialEndsText = trialEndsAtSeconds
    ? new Date(trialEndsAtSeconds * 1000).toLocaleDateString("sv-SE")
    : null;

  const isLapsed =
    ["canceled", "expired", "past_due", "payment_failed"].includes(currentStatus) ||
    (currentStatus === "cancelling" && subscriptionEndsAt && subscriptionEndsAt < now);

  // Beräkna nästa betalningstext
  const nextPaymentText =
    currentStatus === "cancelling"
      ? `Avslutas ${formatDate(subscriptionEndsAtSeconds)}`
      : currentStatus === "canceled" || currentStatus === "expired"
        ? "Ingen planerad"
        : currentStatus === "past_due" || currentStatus === "payment_failed"
          ? "Betalning misslyckad"
          : currentStatus === "none" && trialEndsText
            ? `Efter provperioden ${trialEndsText}`
            : formatDate(subscriptionDetails?.nextPaymentTimestamp || undefined);

  // Betalning via-text (baserat på faktisk koppling, inte bara paymentProvider-fältet)
  const paymentProviderText =
    paymentProvider === "apple"
      ? "App Store"
      : hasStripeConnection
        ? "Stripe"
        : "Ej aktiverad";

  // Permissions
  const canDelete = !["active", "trialing"].includes(currentStatus);
  const canCancel = !isAppleUser && hasStripeConnection && ["active", "trialing"].includes(currentStatus);
  const canResume = !isAppleUser && hasStripeConnection && currentStatus === "cancelling";

  // Bekräftelseruta
  const confirmAction = (title: string, body: string) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({
        title,
        body,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  // Öppna Stripe Portal
  const handleOpenPortal = async () => {
    if (!userProfile?.companyId) {
      setMessage("Saknar företag.");
      return;
    }
    setMessage("");
    setIsOpeningPortal(true);
    try {
      const createPortalSession = httpsCallable(functions, "createStripePortalSession");
      const result = await createPortalSession({
        companyId: userProfile.companyId,
        returnUrl: `${window.location.origin}/admin`,
        source: "web",
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

  // Aktivera prenumeration via Stripe Checkout
  const handleActivateSubscription = async () => {
    if (!userProfile?.companyId || !firebaseUser) {
      setMessage("Saknar användarinformation.");
      return;
    }
    setMessage("");
    setIsActivatingSubscription(true);
    try {
      const createCheckoutSession = httpsCallable(functions, "createStripeCheckoutSession");
      const result = await createCheckoutSession({
        userId: userProfile.companyId,
        email: userProfile.email || firebaseUser.email,
        source: "web",
      });
      const url = (result.data as { url?: string })?.url;
      if (!url) {
        setMessage("Kunde inte starta betalning.");
        setIsActivatingSubscription(false);
        return;
      }
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Kunde inte starta betalning.");
      setIsActivatingSubscription(false);
    }
  };

  // Avsluta prenumeration
  const handleCancelSubscription = async () => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Avsluta Prenumeration",
      "Är du säker? Din prenumeration kommer att fortsätta till slutet av den nuvarande perioden, men kommer inte att förnyas."
    );
    if (!confirmed) return;

    setIsProcessing(true);
    setMessage("");
    try {
      const cancelStripeSubscription = httpsCallable(functions, "cancelStripeSubscription");
      await cancelStripeSubscription({ companyId: userProfile.companyId });
      setMessage("Din prenumeration kommer att avslutas vid periodens slut.");
      await loadCompanyData(userProfile.companyId);
    } catch (error) {
      console.error("Cancel subscription error:", error);
      setMessage("Kunde inte avsluta prenumerationen.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Återuppta prenumeration
  const handleResumeSubscription = async () => {
    if (!userProfile?.companyId) return;
    const confirmed = await confirmAction(
      "Återuppta Prenumeration",
      "Vill du återuppta din prenumeration? Den kommer att förnyas automatiskt vid slutet av varje period."
    );
    if (!confirmed) return;

    setIsProcessing(true);
    setMessage("");
    try {
      const resumeStripeSubscription = httpsCallable(functions, "resumeStripeSubscription");
      await resumeStripeSubscription({ companyId: userProfile.companyId });
      setMessage("Din prenumeration har återupptagits.");
      await loadCompanyData(userProfile.companyId);
    } catch (error) {
      console.error("Resume subscription error:", error);
      setMessage("Kunde inte återuppta prenumerationen.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Radera konto
  const handleDeleteAccount = async () => {
    if (!userProfile?.companyId) return;
    setIsDeleting(true);
    try {
      const permanentlyDeleteCompanyData = httpsCallable(functions, "permanentlyDeleteCompanyData");
      await permanentlyDeleteCompanyData({ companyId: userProfile.companyId });
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Kunde inte radera kontot.");
      setIsDeleting(false);
    }
  };

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
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-black">Admin Portal</h1>
              <p className="text-sm text-[#8e8e93] mt-1 truncate">
                {userProfile.email || firebaseUser.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-black hover:bg-gray-50 transition flex items-center gap-2 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logga ut
            </button>
          </div>
        </div>

        {/* Global meddelande-ruta */}
        {message && (
          <div
            className={`rounded-lg px-4 py-3 border text-sm mb-6 ${
              message.includes("kunde inte") || message.includes("måste")
                ? "text-[#d9534f] bg-[#fde8e8] border-[#d9534f]"
                : "text-green-700 bg-green-50 border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid gap-6">
          {/* Prenumerationsstatus */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Prenumerationsstatus</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#8e8e93]">Status</span>
                <span className="text-black font-semibold">{translateStatus(currentStatus)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8e8e93]">Plan</span>
                <div className="text-right">
                  <span className="text-black font-semibold">
                    {tierInfo.name} ({isAppleUser ? tierInfo.priceInkl : tierInfo.priceExkl} kr/mån{isAppleUser ? "" : " exkl. moms"})
                  </span>
                  {/* Visa pending nedgradering */}
                  {company?.pendingTierChange && company.pendingTierChange !== currentTier && (
                    <p className="text-xs text-[#8e8e93] mt-0.5">
                      → {TIERS[company.pendingTierChange]?.name || company.pendingTierChange} från{" "}
                      {formatDate(pendingTierChangeDate)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8e8e93]">Betalning via</span>
                <span className="text-black">{paymentProviderText}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8e8e93]">Nästa betalning</span>
                <span className="text-black">{nextPaymentText}</span>
              </div>
            </div>
          </section>

          {/* Betalning */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Betalning</h2>

            {isAppleUser ? (
              // Apple-användare: Visa info-box
              <div className="bg-[#f2f2ff] border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold text-black mb-2">
                      Din prenumeration hanteras via App Store
                    </p>
                    <p className="text-sm text-[#8e8e93] mb-3">
                      För att ändra, uppgradera eller avsluta:
                    </p>
                    <ol className="text-sm text-[#8e8e93] list-decimal list-inside space-y-1">
                      <li>Öppna Inställningar på din iPhone/iPad</li>
                      <li>Tryck på ditt namn högst upp</li>
                      <li>Tryck på Prenumerationer</li>
                      <li>Välj Alignat</li>
                    </ol>
                    <p className="text-sm text-[#8e8e93] mt-3">
                      Alternativt: Öppna Alignat-appen på din iOS-enhet.
                    </p>
                  </div>
                </div>
              </div>
            ) : hasStripeConnection ? (
              // Stripe-användare: Visa Portal-knapp
              <button
                type="button"
                onClick={handleOpenPortal}
                disabled={isOpeningPortal}
                className="rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3 hover:bg-[#0067a1] transition disabled:opacity-60 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {isOpeningPortal ? "Öppnar portal..." : "Hantera Betalning & Fakturor"}
              </button>
            ) : (
              // Ingen koppling: Visa Checkout-knapp
              <div>
                <button
                  type="button"
                  onClick={handleActivateSubscription}
                  disabled={isActivatingSubscription}
                  className="rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3 hover:bg-[#0067a1] transition disabled:opacity-60 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isActivatingSubscription ? "Öppnar..." : "Lägg till betalkort"}
                </button>
                <p className="text-xs text-[#8e8e93] mt-2">
                  Du skickas till Stripe för att lägga till betalmetod.
                </p>
              </div>
            )}
          </section>

          {/* Konto & Prenumeration (endast för Stripe-användare eller ingen koppling) */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Konto & Prenumeration</h2>

            {isAppleUser ? (
              // Apple-användare: Visa endast Radera-knapp
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                <p className="text-sm text-[#8e8e93] text-center mb-2">
                  För att avsluta eller ändra din prenumeration, använd App Store-inställningarna på din iOS-enhet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (!canDelete) {
                      setMessage("För att radera kontot måste du först avsluta prenumerationen i App Store.");
                      return;
                    }
                    setShowDeleteModal(true);
                  }}
                  disabled={!canDelete}
                  className={`w-full rounded-lg border font-semibold px-4 py-3 transition flex items-center justify-center gap-2 ${
                    canDelete
                      ? "border-[#d9534f] text-[#d9534f] hover:bg-[#fde8e8]"
                      : "border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Radera Konto & All Data
                </button>
                {!canDelete && (
                  <p className="text-xs text-[#8e8e93] text-center">
                    Avsluta prenumerationen i App Store innan du kan radera kontot.
                  </p>
                )}
              </div>
            ) : (
              // Stripe-användare: Visa alla knappar
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                {canCancel && (
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    className="w-full rounded-lg border border-[#d9534f] text-[#d9534f] font-semibold px-4 py-3 hover:bg-[#fde8e8] transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Avsluta Prenumeration
                  </button>
                )}

                {canResume && (
                  <button
                    type="button"
                    onClick={handleResumeSubscription}
                    className="w-full rounded-lg border border-[#5cb85c] text-[#5cb85c] font-semibold px-4 py-3 hover:bg-[#f0fdf4] transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Återuppta Prenumeration
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!canDelete) {
                      setMessage("För att radera kontot måste du först avsluta prenumerationen.");
                      return;
                    }
                    setShowDeleteModal(true);
                  }}
                  disabled={!canDelete}
                  className={`w-full rounded-lg border font-semibold px-4 py-3 transition flex items-center justify-center gap-2 ${
                    canDelete
                      ? "border-[#d9534f] text-[#d9534f] hover:bg-[#fde8e8]"
                      : "border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Radera Konto & All Data
                </button>

                {!canDelete && (
                  <p className="text-xs text-[#8e8e93] text-center">
                    För att radera kontot måste du först avsluta prenumerationen.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Info om personal-hantering */}
          <section className="bg-[#f2f2ff] rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#0077B6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#0077B6] mb-1">
                  Hantera personal och planer i appen
                </p>
                <p className="text-xs text-[#8e8e93]">
                  Bjud in anställda, byt plan och hantera ditt team direkt i Alignat-appen.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Radera-modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-2">Bekräfta radering</h3>
            <p className="text-sm text-[#8e8e93] mb-4">
              Skriv ordet RADERA för att bekräfta permanent radering.
            </p>
            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
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

      {/* Processing overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-6 py-4 text-black font-semibold">
            Bearbetar...
          </div>
        </div>
      )}

      {/* Bekräftelseruta */}
      {confirmState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-2">{confirmState.title}</h3>
            <p className="text-sm text-[#8e8e93] mb-4">{confirmState.body}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
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
