"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Fyll i både e-post och lösenord.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || userDoc.data()?.role !== "superadmin") {
        // Blockera icke-superadmin och logga ut direkt.
        await signOut(auth);
        setMessage("Endast företagsägare kan logga in här.");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Fel e-post eller lösenord.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!resetEmail) {
      setResetMessage("Skriv in din e-postadress.");
      return;
    }
    setIsResetting(true);
    setResetMessage("");
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetMessage("Återställningslänk skickad om kontot finns.");
      setTimeout(() => {
        setShowResetModal(false);
        setResetEmail("");
        setResetMessage("");
      }, 2000);
    } catch (error) {
      console.error("Reset error:", error);
      setResetMessage("Kunde inte skicka återställningslänk.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2ff] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-black">Logga in</h1>
          <p className="text-sm text-[#8e8e93] mt-2">
            Endast företagsägare (superadmin)
          </p>
        </div>

        {message && (
          <div className="mb-4 text-sm text-[#d9534f] bg-[#fde8e8] border border-[#d9534f] rounded-lg px-3 py-2">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              E-postadress
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              placeholder="din@epost.se"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-[#0077B6] text-white font-semibold py-3 hover:bg-[#0067a1] transition disabled:opacity-60"
        >
          {isLoading ? "Loggar in..." : "Logga in"}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowResetModal(true);
            setResetEmail(email); // Kopiera email från login-fältet
          }}
          className="mt-3 w-full rounded-lg border border-gray-200 text-[#0077B6] font-semibold py-3 hover:bg-gray-50 transition"
        >
          Glömt lösenord?
        </button>

        <div className="mt-6 text-center text-sm text-[#8e8e93]">
          Tillbaka till{" "}
          <Link href="/" className="text-[#0077B6] underline">
            startsidan
          </Link>
          .
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 text-[#0077B6] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              
              <h2 className="text-2xl font-bold text-black mb-2">
                Återställ lösenord
              </h2>
              <p className="text-sm text-[#8e8e93] text-center mb-6">
                Ange din e-postadress så skickar vi en länk för att återställa ditt lösenord.
              </p>

              {resetMessage && (
                <div className={`w-full mb-4 text-sm rounded-lg px-4 py-3 border ${
                  resetMessage.includes("skickad") 
                    ? "text-green-700 bg-green-50 border-green-300" 
                    : "text-[#d9534f] bg-[#fde8e8] border-[#d9534f]"
                }`}>
                  {resetMessage}
                </div>
              )}

              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0077B6] mb-4"
                placeholder="E-postadress"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
              />

              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetEmail("");
                    setResetMessage("");
                  }}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-black font-semibold hover:bg-gray-50 transition"
                >
                  Avbryt
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isResetting}
                  className="flex-1 rounded-lg bg-[#0077B6] text-white font-semibold px-4 py-3 hover:bg-[#0067a1] transition disabled:opacity-60"
                >
                  {isResetting ? "Skickar..." : "Skicka länk"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
