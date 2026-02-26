import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { User, Lock, LogOut, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import api from '@/api/axios'

export default function SettingsPage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const qc = useQueryClient()

    const [name, setName] = useState(user?.name || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const updateProfile = useMutation({
        mutationFn: () => api.patch('/auth/profile', { name, phone }),
        onSuccess: () => {
            setProfileMsg({ type: 'success', text: 'Profile updated successfully' })
            qc.invalidateQueries({ queryKey: ['me'] })
            setTimeout(() => setProfileMsg(null), 3000)
        },
        onError: (err: any) => {
            setProfileMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' })
        },
    })

    const changePassword = useMutation({
        mutationFn: () => api.patch('/auth/password', {
            current_password: currentPassword,
            new_password: newPassword,
        }),
        onSuccess: () => {
            setPasswordMsg({ type: 'success', text: 'Password changed successfully' })
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setTimeout(() => setPasswordMsg(null), 3000)
        },
        onError: (err: any) => {
            setPasswordMsg({ type: 'error', text: err.response?.data?.message || 'Failed to change password' })
        },
    })

    const handlePasswordSubmit = () => {
        if (newPassword !== confirmPassword) {
            setPasswordMsg({ type: 'error', text: 'New passwords do not match' })
            return
        }
        if (newPassword.length < 6) {
            setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters' })
            return
        }
        changePassword.mutate()
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            {/* Header */}
            <div className="bg-white border-b border-zinc-100">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                    <Link to="/dashboard"
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-4 w-fit">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Account Settings</h1>
                    <p className="text-sm text-zinc-400 mt-0.5">Manage your profile and security</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {/* Account info card */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
                            {user?.name[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-lg">{user?.name}</p>
                            <p className="text-sm text-zinc-400">{user?.email}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${user?.role === 'ADMIN' ? 'bg-violet-100 text-violet-700' :
                                user?.role === 'SELLER' ? 'bg-blue-100 text-blue-700' :
                                    'bg-zinc-100 text-zinc-600'
                                }`}>
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Profile Update */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center">
                            <User className="h-4 w-4 text-zinc-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-zinc-900">Profile Information</h2>
                            <p className="text-xs text-zinc-400">Update your name and phone number</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Phone Number</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                placeholder="e.g. 0781234567"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={user?.email}
                                disabled
                                className="w-full px-3.5 py-2.5 border border-zinc-100 rounded-xl text-sm bg-zinc-50 text-zinc-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-zinc-400 mt-1">Email cannot be changed</p>
                        </div>

                        {profileMsg && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${profileMsg.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {profileMsg.type === 'success'
                                    ? <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                    : <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                }
                                {profileMsg.text}
                            </div>
                        )}

                        <button
                            onClick={() => updateProfile.mutate()}
                            disabled={updateProfile.isPending || !name.trim()}
                            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-40 text-sm"
                        >
                            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center">
                            <Lock className="h-4 w-4 text-zinc-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-zinc-900">Change Password</h2>
                            <p className="text-xs text-zinc-400">Use a strong password to keep your account safe</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                placeholder="Repeat new password"
                            />
                        </div>

                        {passwordMsg && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${passwordMsg.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {passwordMsg.type === 'success'
                                    ? <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                    : <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                }
                                {passwordMsg.text}
                            </div>
                        )}

                        <button
                            onClick={handlePasswordSubmit}
                            disabled={changePassword.isPending || !currentPassword || !newPassword || !confirmPassword}
                            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-40 text-sm"
                        >
                            {changePassword.isPending ? 'Changing...' : 'Change Password'}
                        </button>
                    </div>
                </div>

                {/* Danger zone */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                    <h2 className="font-bold text-zinc-900 mb-1">Sign Out</h2>
                    <p className="text-sm text-zinc-400 mb-4">Sign out of your FashaMarket account on this device.</p>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-4 py-2.5 rounded-xl transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}