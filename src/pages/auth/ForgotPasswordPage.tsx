import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import api from '@/api/axios'
import SEO from '@/components/SEO'

const schema = z.object({
    email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false)
    const [sentEmail, setSentEmail] = useState('')

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormData) => {
        try {
            await api.post('/auth/forgot-password', { email: data.email })
            setSentEmail(data.email)
            setSent(true)
        } catch {
            setError('root', { message: 'Something went wrong. Please try again.' })
        }
    }

    if (sent) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
                <SEO title="Check Your Email" />
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-7 w-7 text-green-600" />
                    </div>
                    <h1 className="text-xl font-bold text-zinc-900">Check your email</h1>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        We sent a password reset link to <span className="font-semibold text-zinc-900">{sentEmail}</span>.
                        Check your inbox and click the link to reset your password.
                    </p>
                    <p className="text-xs text-zinc-400">
                        Didn't receive it? Check your spam folder or{' '}
                        <button
                            onClick={() => setSent(false)}
                            className="text-zinc-900 font-semibold hover:underline"
                        >
                            try again
                        </button>
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
            <SEO title="Forgot Password" description="Reset your FashaMarket password" />

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm max-w-sm w-full p-8 space-y-6">
                <div>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900">Forgot password?</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                            placeholder="you@example.com"
                            autoFocus
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
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
                                Sending...
                            </>
                        ) : (
                            'Send reset link'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}