import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle } from 'lucide-react'
import api from '@/api/axios'
import SEO from '@/components/SEO'

const schema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [done, setDone] = useState(false)
    const token = searchParams.get('token')

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormData) => {
        try {
            await api.post('/auth/reset-password', { token, password: data.password })
            setDone(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch {
            setError('root', { message: 'Reset link is invalid or expired. Please request a new one.' })
        }
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 text-center">
                    <p className="text-zinc-500">Invalid reset link.</p>
                    <Link to="/forgot-password" className="text-zinc-900 font-semibold hover:underline mt-4 block">
                        Request a new one
                    </Link>
                </div>
            </div>
        )
    }

    if (done) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h1 className="text-xl font-bold text-zinc-900">Password reset!</h1>
                    <p className="text-sm text-zinc-500">Your password has been updated. Redirecting to login...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
            <SEO title="Reset Password" />

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Set new password</h1>
                    <p className="text-sm text-zinc-500 mt-1">Choose a strong password for your account.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">New Password</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                            placeholder="••••••••"
                            autoFocus
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Confirm Password</label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
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
                                Updating...
                            </>
                        ) : (
                            'Reset password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}