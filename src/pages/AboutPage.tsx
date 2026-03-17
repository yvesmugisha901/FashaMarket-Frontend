import { Link } from 'react-router-dom'
import { ShieldCheck, BadgeCheck, Truck, Users, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title="About Us"
                description="Learn about FashaMarket — Rwanda's trusted second-hand marketplace built to make buying and selling safe, simple and fair."
            />
            <Navbar />

            {/* Hero */}
            <section className="bg-zinc-900 py-20">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Built for Rwanda.<br />
                        <span className="text-brand-400">Built for Trust.</span>
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        FashaMarket is Rwanda's first structured second-hand marketplace — where every seller is verified, every transaction is protected by a digital agreement, and every buyer can shop with confidence.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Mission</p>
                        <h2 className="text-3xl font-bold text-zinc-900">Why we built FashaMarket</h2>
                    </div>
                    <div className="space-y-6 text-zinc-600 leading-relaxed">
                        <p>
                            Buying second-hand in Rwanda was broken. No trust, no structure, no protection. Sellers would misrepresent items, buyers would pay and never receive, and there was no platform designed specifically for the Rwandan context.
                        </p>
                        <p>
                            We built FashaMarket to change that. Every seller goes through manual verification. Every product is reviewed by our admin team before going live. Every transaction is backed by a digital purchase agreement that protects both parties.
                        </p>
                        <p>
                            Our goal is simple — make second-hand commerce in Rwanda as safe, transparent, and professional as buying new.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-zinc-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Values</p>
                        <h2 className="text-3xl font-bold text-zinc-900">What we stand for</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <BadgeCheck className="h-6 w-6 text-white" />, title: 'Trust', desc: 'Every seller is manually verified before listing anything on the platform.' },
                            { icon: <ShieldCheck className="h-6 w-6 text-white" />, title: 'Protection', desc: 'Digital agreements protect every buyer and seller from disputes.' },
                            { icon: <Truck className="h-6 w-6 text-white" />, title: 'Reliability', desc: 'Clear delivery timelines and tracking so you always know what to expect.' },
                            { icon: <Users className="h-6 w-6 text-white" />, title: 'Community', desc: 'Building a community of honest traders across Rwanda.' },
                        ].map((v) => (
                            <div key={v.title} className="bg-white rounded-2xl border border-zinc-100 p-6 text-center">
                                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    {v.icon}
                                </div>
                                <h3 className="font-bold text-zinc-900 mb-2">{v.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-y border-zinc-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '500+', label: 'Registered Users' },
                            { value: '1,200+', label: 'Products Listed' },
                            { value: '4.8/5', label: 'Average Rating' },
                            { value: '98%', label: 'Satisfaction Rate' },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="text-3xl font-bold text-zinc-900">{s.value}</p>
                                <p className="text-zinc-500 text-sm mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-zinc-50">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">The Team</p>
                    <h2 className="text-3xl font-bold text-zinc-900 mb-4">Made in Kigali</h2>
                    <p className="text-zinc-500 leading-relaxed">
                        FashaMarket was founded in Kigali, Rwanda by a team passionate about making commerce safer and more accessible for every Rwandan. We are a small team with a big vision — to become the most trusted marketplace in East Africa.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-zinc-900">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to join FashaMarket?</h2>
                    <p className="text-zinc-400 mb-8">Buy and sell second-hand products safely across Rwanda.</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link to="/register"
                            className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm hover:bg-zinc-100">
                            Create Free Account
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link to="/products"
                            className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-8 py-3.5 rounded-xl border border-white/15 transition-all text-sm hover:bg-white/5">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}