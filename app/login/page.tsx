import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignInButtons from "@/components/sign-in-buttons"

export const metadata = {
  title: "Sign In | Property SaaS",
}

export default async function LoginPage() {
  // If the user is already signed in, send them to the dashboard
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-black mb-4">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Sign-in buttons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <SignInButtons />

          <p className="mt-6 text-center text-xs text-gray-400">
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  )
}
