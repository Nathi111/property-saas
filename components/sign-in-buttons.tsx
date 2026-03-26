"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInButtons() {
  const [loadingProvider, setLoadingProvider] = useState<"apple" | "google" | null>(null)

  async function handleSignIn(provider: "apple" | "google") {
    setLoadingProvider(provider)
    // callbackUrl takes the user to the dashboard after a successful login
    await signIn(provider, { callbackUrl: "/dashboard" })
    // setLoadingProvider(null) is intentionally omitted — the page will
    // redirect away, so resetting state would cause a flash.
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => handleSignIn("apple")}
        disabled={loadingProvider !== null}
        className="flex items-center justify-center gap-3 w-full rounded-xl bg-black text-white px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingProvider === "apple" ? (
          <Spinner className="text-white" />
        ) : (
          <AppleIcon />
        )}
        Continue with Apple
      </button>

      <button
        onClick={() => handleSignIn("google")}
        disabled={loadingProvider !== null}
        className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingProvider === "google" ? (
          <Spinner className="text-gray-600" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </button>
    </div>
  )
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 814 1000"
      className="h-4 w-4 fill-current"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.8-49 192.3-49 30.5 0 110.1 2.6 171.7 98.1zm-234.6-181.4c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-4 w-4"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}
