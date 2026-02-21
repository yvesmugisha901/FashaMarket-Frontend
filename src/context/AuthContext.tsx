import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authApi } from '@/api/auth'
import type { User, LoginInput, RegisterInput } from '@/types'

interface AuthContextValue {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: LoginInput) => Promise<{ user: User }>
    register: (data: RegisterInput) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // On mount: restore session from token
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setIsLoading(false)
            return
        }
        authApi
            .me()
            .then(setUser)
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setIsLoading(false))
    }, [])

    const login = async (data: LoginInput) => {
        const { token, user } = await authApi.login(data)
        localStorage.setItem('token', token)
        setUser(user)
        return { user }
    }

    const register = async (data: RegisterInput) => {
        const { token, user } = await authApi.register(data)
        localStorage.setItem('token', token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}