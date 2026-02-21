import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function AdminRoute() {
    const { user, isLoading } = useAuth()

    if (isLoading) return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>
    if (!user || user.role !== 'ADMIN') return <Navigate to="/" replace />

    return <Outlet />
}