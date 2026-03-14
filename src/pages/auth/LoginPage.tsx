import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'
import type { LoginInput } from '@/types'
import SEO from '@/components/SEO'

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
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
            <SEO title="Login" description="Log in to your FashaMarket account" />

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
                    <p className="text-sm text-zinc-500 mt-1">Log in to your FashaMarket account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-zinc-700">Password</label>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            {...register('password')}
                            type="password"
                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {errors.root && (
                        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                            <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-40 text-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            'Log in'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-500">
                    No account?{' '}
                    <Link to="/register" className="text-zinc-900 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}