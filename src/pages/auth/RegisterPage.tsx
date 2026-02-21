import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { RegisterInput } from '@/types'

const schema = z.object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Enter a valid phone number'),
    password: z.string().min(6, 'Minimum 6 characters'),
    role: z.enum(['BUYER', 'SELLER']),
})

export default function RegisterPage() {
    const { register: registerUser } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(schema),
        defaultValues: { role: 'BUYER' },
    })

    const onSubmit = async (data: RegisterInput) => {
        try {
            await registerUser(data)
            navigate('/')
        } catch {
            setError('root', { message: 'Registration failed. Email may already be in use.' })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="card max-w-sm w-full p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
                    <p className="text-sm text-gray-500 mt-1">Join FashaMarket today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input {...register('name')} className="input" placeholder="Jean Paul Uwimana" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input {...register('email')} type="email" className="input" placeholder="you@example.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input {...register('phone')} className="input" placeholder="07XXXXXXXX" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input {...register('password')} type="password" className="input" placeholder="••••••••" />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
                        <select {...register('role')} className="input">
                            <option value="BUYER">Buy items</option>
                            <option value="SELLER">Sell items</option>
                        </select>
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-500 text-center">{errors.root.message}</p>
                    )}

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-2.5">
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-600 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}