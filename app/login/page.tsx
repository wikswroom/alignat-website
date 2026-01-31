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
    if (!email) {
      setMessage("Skriv in din e-post för att återställa.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Återställningslänk skickad om kontot finns.");
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("Kunde inte skicka återställningslänk.");
    } finally {
      setIsLoading(false);
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
          onClick={handleReset}
          disabled={isLoading}
          className="mt-3 w-full rounded-lg border border-gray-200 text-[#0077B6] font-semibold py-3 hover:bg-gray-50 transition disabled:opacity-60"
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
    </div>
  );
}
