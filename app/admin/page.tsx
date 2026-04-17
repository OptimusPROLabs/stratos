"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface WaitlistUser {
  id: string
  name: string
  email: string
  role: string
  answer?: string
  waitlistNumber: number
  createdAt: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<WaitlistUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/waitlist')
        if (res.ok) {
          const data = await res.json()
          setUsers(data.users || [])
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Waitlist Admin</h1>
            <p className="text-[#8899aa]">Total users: {users.length}</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 border border-[#1a2332] hover:border-[#b8ff56] rounded transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8899aa]">
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto border border-[#1a2332] rounded">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a2332]">
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">#</th>
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">Role</th>
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-[#8899aa]">Spot</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-b border-[#1a2332]/50 hover:bg-[#0a0f14]">
                    <td className="p-4 text-[#8899aa]">{index + 1}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-[#8899aa]">{user.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-[#b8ff56]/10 text-[#b8ff56] text-xs rounded border border-[#b8ff56]/20">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-[#8899aa]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-[#b8ff56]">#{user.waitlistNumber.toString().padStart(4, '0')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="text-center py-12 text-[#8899aa]">
            No users yet.
          </div>
        )}
      </div>
    </div>
  )
}
