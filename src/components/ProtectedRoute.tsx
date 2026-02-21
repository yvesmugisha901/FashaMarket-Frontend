import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>
    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <Outlet />
}