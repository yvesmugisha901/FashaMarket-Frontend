import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { LoginInput } from '@/types'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Minimum 6 characters'),
})

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({ resolver: zodResolver(schema) })
    const onSubmit = async (data: LoginInput) => {
        try {
            const result = await login(data)
            if (result.user.role === 'ADMIN') {
                navigate('/admin')
            } else if (result.user.role === 'SELLER') {
                navigate('/dashboard')
            } else {
                navigate('/products')
            }
        } catch {
            setError('root', { message: 'Invalid email or password' })
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="card max-w-sm w-full p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-sm text-gray-500 mt-1">Log in to your FashaMarket account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input {...register('email')} type="email" className="input" placeholder="you@example.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input {...register('password')} type="password" className="input" placeholder="••••••••" />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
                    )}

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-2.5">
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    No account?{' '}
                    <Link to="/register" className="text-brand-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}