import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/auth"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-medium text-gray-900 mt-1">{session.user?.email}</p>
        </div>
      </div>
    </main>
  )
}
