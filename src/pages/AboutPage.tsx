import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ShieldCheck, BadgeCheck, Truck, Users, ArrowRight,
    TrendingUp, Globe, Zap, Heart, Star, ChevronDown
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, inView }
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const { ref, inView } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {children}
        </div>
    )
}

function FadeLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const { ref, inView } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
            {children}
        </div>
    )
}

function FadeRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const { ref, inView } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
            {children}
        </div>
    )
}

export default function AboutPage() {
    const [heroVisible, setHeroVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="min-h-screen bg-zinc-50 overflow-x-hidden">
            <SEO
                title="About Us"
                description="FashaMarket — Rwanda's trusted second-hand marketplace. Our mission, vision and story."
            />
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative min-h-[90vh] flex items-center bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-zinc-700/30 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-brand-600/5 rounded-full blur-[80px]" />

                <div className="relative max-w-5xl mx-auto px-4 py-24 w-full">
                    <div className="max-w-3xl">

                        <div className={`transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                                We are rebuilding
                                <br />trust in
                                <br /><span className="text-brand-400">online commerce.</span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
                                FashaMarket was born from a simple frustration — buying second-hand in Rwanda was risky, unstructured, and full of scams. We decided to fix that.
                            </p>
                        </div>

                        <div className={`transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <div className="mt-10 flex flex-wrap gap-3">
                                <Link to="/register"
                                    className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm hover:bg-zinc-100 hover:scale-[1.02]">
                                    Join FashaMarket
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link to="/products"
                                    className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-7 py-3.5 rounded-xl border border-white/15 text-sm hover:bg-white/5">
                                    Browse Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="h-5 w-5 text-zinc-600" />
                </div>
            </section>

            {/* ── THE PROBLEM ── */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeLeft>
                            <div>
                                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">The Problem</p>
                                <h2 className="text-4xl font-bold text-zinc-900 leading-tight mb-6">
                                    Online commerce in Rwanda was broken.
                                </h2>
                                <div className="space-y-4 text-zinc-600 leading-relaxed">
                                    <p>Sellers would misrepresent products. Buyers would pay and never receive. There was no accountability, no structure, no protection.</p>
                                    <p>Trust in online shopping had collapsed. People were afraid to buy anything online because they had been cheated too many times.</p>
                                    <p>We saw this problem every day. And we knew we could fix it.</p>
                                </div>
                            </div>
                        </FadeLeft>

                        <FadeRight>
                            <div className="space-y-4">
                                {[
                                    { emoji: '😤', title: 'Fake listings everywhere', desc: 'Products looked nothing like their photos. Descriptions were completely misleading.' },
                                    { emoji: '💸', title: 'Money lost with no recourse', desc: 'Buyers paid and received nothing. There was no way to get money back.' },
                                    { emoji: '🚫', title: 'No seller accountability', desc: 'Anyone could sell anything with no verification, no consequences for fraud.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                                        <span className="text-2xl">{item.emoji}</span>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h3>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeRight>
                    </div>
                </div>
            </section>

            {/* ── OUR SOLUTION ── */}
            <section className="py-24 bg-zinc-900">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">Our Solution</p>
                            <h2 className="text-4xl font-bold text-white">We built the infrastructure for trust.</h2>
                            <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
                                Every feature we built solves a real problem that was hurting buyers and sellers in Rwanda.
                            </p>
                        </div>
                    </FadeUp>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <BadgeCheck className="h-6 w-6 text-white" />, title: 'Verified Sellers', desc: 'Every seller is manually reviewed and identity-checked before they can list a single product.', before: 'Anyone could sell', after: 'Only verified sellers' },
                            { icon: <ShieldCheck className="h-6 w-6 text-white" />, title: 'Digital Agreements', desc: 'Every transaction is backed by a legally binding digital agreement signed by both parties.', before: 'No protection', after: 'Legal agreement' },
                            { icon: <Truck className="h-6 w-6 text-white" />, title: 'Structured Delivery', desc: 'Sellers must ship within 2 business days. Clear timelines, no guessing, no excuses.', before: 'No timeline', after: '2-day guarantee' },
                            { icon: <Zap className="h-6 w-6 text-white" />, title: 'Admin Review', desc: 'Every product listing is reviewed by our team before appearing on the marketplace.', before: 'Fake listings', after: 'Reviewed products' },
                            { icon: <Star className="h-6 w-6 text-white" />, title: 'Reviews & Ratings', desc: 'Buyers leave honest reviews after every purchase, building seller reputation over time.', before: 'No accountability', after: 'Public reputation' },
                            { icon: <Heart className="h-6 w-6 text-white" />, title: 'Dispute Resolution', desc: 'Our admin team mediates every dispute fairly, with the purchase agreement as evidence.', before: 'No recourse', after: 'Fair resolution' },
                        ].map((item, i) => (
                            <FadeUp key={item.title} delay={i * 80}>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full line-through">{item.before}</span>
                                        <ArrowRight className="h-3 w-3 text-zinc-500" />
                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{item.after}</span>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION ── */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <FadeLeft>
                            <div className="bg-zinc-900 rounded-3xl p-10 h-full">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mb-6">
                                    <Heart className="h-6 w-6 text-brand-400" />
                                </div>
                                <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Mission</p>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Make second-hand commerce in Rwanda safe for everyone.
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    We believe everyone deserves access to affordable, quality products without the risk of being cheated. Our mission is to build the infrastructure that makes this possible — verified sellers, transparent transactions, and fair dispute resolution for every Rwandan.
                                </p>
                            </div>
                        </FadeLeft>

                        <FadeRight>
                            <div className="bg-brand-600 rounded-3xl p-10 h-full">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                    <Globe className="h-6 w-6 text-white" />
                                </div>
                                <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-3">Our Vision</p>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Become the most trusted marketplace in East Africa.
                                </h3>
                                <p className="text-white/80 leading-relaxed">
                                    We are starting in Rwanda but our vision is bigger. We want to bring the FashaMarket model of verified, structured, agreement-backed commerce to Uganda, Kenya, Tanzania and beyond. Every country in East Africa deserves a marketplace they can trust.
                                </p>
                            </div>
                        </FadeRight>
                    </div>
                </div>
            </section>

            {/* ── IMPACT ── */}
            <section className="py-24 bg-zinc-50">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">Our Impact</p>
                            <h2 className="text-4xl font-bold text-zinc-900">Growing every day.</h2>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { value: '500+', label: 'Verified Users', icon: <Users className="h-5 w-5" />, color: 'text-blue-600 bg-blue-50' },
                            { value: '1,200+', label: 'Products Listed', icon: <TrendingUp className="h-5 w-5" />, color: 'text-green-600 bg-green-50' },
                            { value: '4.8/5', label: 'Average Rating', icon: <Star className="h-5 w-5" />, color: 'text-amber-600 bg-amber-50' },
                            { value: '98%', label: 'Satisfaction', icon: <Heart className="h-5 w-5" />, color: 'text-red-600 bg-red-50' },
                        ].map((stat, i) => (
                            <FadeUp key={stat.label} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-zinc-100 p-6 text-center">
                                    <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                                    <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROADMAP ── */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">Where We Are Going</p>
                            <h2 className="text-4xl font-bold text-zinc-900">The road ahead.</h2>
                        </div>
                    </FadeUp>

                    <div className="space-y-4">
                        {[
                            { phase: 'Now', title: 'Rwanda Launch', desc: 'Full marketplace live in Rwanda with verified sellers, digital agreements, and MTN MoMo payments.', status: 'live', color: 'bg-green-500' },
                            { phase: 'Q2 2026', title: 'Flutterwave Integration', desc: 'Full payment integration supporting MTN MoMo, Airtel Money, Visa and Mastercard.', status: 'building', color: 'bg-brand-600' },
                            { phase: 'Q3 2026', title: 'Mobile App', desc: 'Native iOS and Android app for faster browsing, instant notifications, and easier selling.', status: 'planned', color: 'bg-zinc-400' },
                            { phase: 'Q4 2026', title: 'Uganda & Kenya Expansion', desc: 'Taking the FashaMarket model to Uganda and Kenya with local payment methods and verification.', status: 'planned', color: 'bg-zinc-400' },
                            { phase: '2027', title: 'East Africa Marketplace', desc: 'Cross-border buying and selling across Rwanda, Uganda, Kenya and Tanzania.', status: 'vision', color: 'bg-zinc-300' },
                        ].map((item, i) => (
                            <FadeUp key={item.phase} delay={i * 100}>
                                <div className="flex gap-5 items-start bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                        <div className={`w-3 h-3 ${item.color} rounded-full mt-1`} />
                                        {i < 4 && <div className="w-0.5 h-8 bg-zinc-200" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.phase}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${item.status === 'live' ? 'bg-green-100 text-green-700' :
                                                item.status === 'building' ? 'bg-brand-100 text-brand-700' :
                                                    item.status === 'planned' ? 'bg-zinc-100 text-zinc-500' :
                                                        'bg-zinc-100 text-zinc-400'
                                                }`}>
                                                {item.status === 'live' ? '✓ Live' : item.status === 'building' ? '⚡ Building' : item.status === 'planned' ? 'Planned' : 'Vision'}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 bg-zinc-900">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <FadeUp>
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            Be part of the movement.
                        </h2>
                        <p className="text-zinc-400 text-lg mb-10">
                            Join thousands of Rwandans who are already buying and selling safely on FashaMarket.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/register"
                                className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm hover:bg-zinc-100 hover:scale-[1.02]">
                                Create Free Account
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-8 py-3.5 rounded-xl border border-white/15 text-sm hover:bg-white/5">
                                Contact Us
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>

            <Footer />
        </div>
    )
}