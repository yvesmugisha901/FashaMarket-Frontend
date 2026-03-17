import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import api from '@/api/axios'

const PROBLEM_TYPES = [
    'Fraudulent seller',
    'Item not as described',
    'Payment issue',
    'Delivery problem',
    'Seller not responding',
    'Counterfeit item',
    'Other',
]

export default function ReportProblemPage() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        problem_type: '',
        order_id: '',
        description: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Log to backend for now — email will send when configured
            await api.post('/auth/report-problem', form).catch(() => { })
            setSubmitted(true)
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-zinc-50">
                <Navbar />
                <div className="max-w-lg mx-auto px-4 py-20 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 mb-2">Report Submitted</h1>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        Thank you for reporting this issue. Our team will review it within 24 hours and contact you at the email provided.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-zinc-900 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-zinc-700 transition-all">
                        Back to Home
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO title="Report a Problem" description="Report a problem on FashaMarket — fraud, delivery issues, or seller disputes." />
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900">Report a Problem</h1>
                            <p className="text-zinc-500 text-sm">We take all reports seriously and respond within 24 hours.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Your Name</label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                    placeholder="Jean Pierre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Problem Type</label>
                            <select
                                required
                                value={form.problem_type}
                                onChange={(e) => setForm({ ...form, problem_type: e.target.value })}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-zinc-700"
                            >
                                <option value="">Select problem type</option>
                                {PROBLEM_TYPES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                Order ID <span className="text-zinc-400 font-normal">(if applicable)</span>
                            </label>
                            <input
                                value={form.order_id}
                                onChange={(e) => setForm({ ...form, order_id: e.target.value })}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                                placeholder="Paste your order ID here"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Describe the Problem</label>
                            <textarea
                                required
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={5}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all resize-none"
                                placeholder="Please describe the problem in detail — what happened, when, and what you expected..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-40 text-sm flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Report'
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}