import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, Loader2, MessageSquare } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1000))
        setSubmitted(true)
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title="Contact Us"
                description="Contact FashaMarket support — we're here to help with any questions about buying, selling or your account."
            />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
                    <h1 className="text-4xl font-bold text-zinc-900">Contact Us</h1>
                    <p className="text-zinc-500 mt-3 text-lg">We respond to all messages within 24 hours.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Contact Info */}
                    <div className="space-y-4">
                        {[
                            { icon: <Mail className="h-5 w-5 text-white" />, title: 'Email', value: 'support@fashamarket.rw', desc: 'Best for general inquiries' },
                            { icon: <Phone className="h-5 w-5 text-white" />, title: 'Phone', value: '+250 784 559 922', desc: 'Mon-Fri, 8am-6pm CAT' },
                            { icon: <MapPin className="h-5 w-5 text-white" />, title: 'Location', value: 'Kigali, Rwanda', desc: 'Serving all of Rwanda' },
                            { icon: <MessageSquare className="h-5 w-5 text-white" />, title: 'Response Time', value: 'Within 24 hours', desc: 'We reply to every message' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl border border-zinc-100 p-5 flex gap-4">
                                <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-zinc-900 text-sm">{item.title}</p>
                                    <p className="text-zinc-900 text-sm font-medium">{item.value}</p>
                                    <p className="text-zinc-400 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        {submitted ? (
                            <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900 mb-2">Message Sent!</h2>
                                <p className="text-zinc-500 text-sm">
                                    Thank you for reaching out. We'll get back to you at <span className="font-semibold text-zinc-900">{form.email}</span> within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-zinc-100 p-8">
                                <h2 className="text-lg font-bold text-zinc-900 mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name</label>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
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
                                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Subject</label>
                                        <input
                                            required
                                            value={form.subject}
                                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Message</label>
                                        <textarea
                                            required
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 resize-none"
                                            placeholder="Tell us more about your question or issue..."
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
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}