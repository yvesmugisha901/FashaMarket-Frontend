import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ShieldCheck, Truck, BadgeCheck, ArrowRight,
    Star, Users, Package, TrendingUp, ChevronDown
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

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const { ref, inView } = useInView()
    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = target / 60
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [inView, target])
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const { ref, inView } = useInView()
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            {children}
        </div>
    )
}

const FEATURES = [
    {
        icon: <BadgeCheck className="h-6 w-6 text-white" />,
        bg: 'bg-zinc-900',
        title: 'Verified Sellers',
        desc: 'Every seller is identity-checked and admin-approved before listing anything on the platform.',
    },
    {
        icon: <ShieldCheck className="h-6 w-6 text-white" />,
        bg: 'bg-zinc-700',
        title: 'Signed Agreement',
        desc: 'Every purchase is backed by a digital agreement covering condition, returns, and delivery.',
    },
    {
        icon: <Truck className="h-6 w-6 text-white" />,
        bg: 'bg-brand-600',
        title: 'Defined Delivery',
        desc: 'Clear delivery timelines set at checkout. No guessing, no surprises, ever.',
    },
]

const CATEGORIES = [
    { name: 'Electronics', emoji: '📱', desc: 'Phones, laptops & gadgets', count: '200+ items' },
    { name: 'Clothing', emoji: '👗', desc: 'Fashion for everyone', count: '350+ items' },
    { name: 'Furniture', emoji: '🪑', desc: 'Home & office pieces', count: '120+ items' },
    { name: 'Shoes', emoji: '👟', desc: 'All styles & sizes', count: '180+ items' },
]

const TESTIMONIALS = [
    {
        name: 'Amina K.',
        role: 'Buyer from Kigali',
        text: 'I bought a laptop here and the whole process was so smooth. The agreement made me feel completely safe.',
        rating: 5,
        avatar: 'A',
    },
    {
        name: 'Jean Paul N.',
        role: 'Seller from Huye',
        text: 'FashaMarket helped me sell my old phone in 2 days. Very professional platform, I trust it completely.',
        rating: 5,
        avatar: 'J',
    },
    {
        name: 'Grace U.',
        role: 'Buyer from Musanze',
        text: 'Love that sellers are verified. I finally trust buying second-hand online. Will use again!',
        rating: 5,
        avatar: 'G',
    },
]

export default function HomePage() {
    const [heroVisible, setHeroVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="min-h-screen bg-zinc-50 overflow-x-hidden">
            <SEO
                title="Buy & Sell Second-Hand in Rwanda"
                description="FashaMarket — Rwanda's trusted marketplace for second-hand electronics, clothing, furniture and more. Verified sellers, safe payments, fast delivery in Kigali."
                keywords="buy sell Rwanda, second hand Kigali, marketplace Rwanda, used phones Rwanda, second hand clothes Kigali"
            />

            <Navbar />

            {/* ── HERO ── */}
            <section className="relative min-h-[92vh] flex items-center bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-zinc-700/30 rounded-full blur-[100px]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
                    <div className="max-w-2xl">
                        <div className={`transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                                The smarter way
                                <br />to buy & sell
                                <br /><span className="text-brand-400">second-hand.</span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <p className="mt-6 text-lg text-zinc-400 max-w-lg leading-relaxed">
                                Verified sellers, signed agreements, and structured delivery — all in one professional platform built for Rwanda.
                            </p>
                        </div>

                        <div className={`transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <div className="mt-10 flex flex-wrap gap-3">
                                <Link to="/products"
                                    className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm hover:bg-zinc-100 hover:scale-[1.02]">
                                    Browse Products
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link to="/register"
                                    className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-7 py-3.5 rounded-xl border border-white/15 transition-all duration-200 text-sm hover:bg-white/5 hover:border-white/25">
                                    Start Selling
                                </Link>
                            </div>
                        </div>

                        <div className={`transition-all duration-700 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <div className="mt-12 flex items-center gap-3 pt-8 border-t border-white/5">
                                <div className="flex -space-x-2.5">
                                    {['A', 'J', 'G', 'M', 'E'].map((l, i) => (
                                        <div key={l}
                                            className="w-8 h-8 rounded-full border-2 border-zinc-900 flex items-center justify-center text-white font-semibold text-xs"
                                            style={{ background: ['#4ade80', '#60a5fa', '#fb923c', '#a78bfa', '#f472b6'][i] }}>
                                            {l}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-zinc-500">
                                    <span className="text-zinc-300 font-medium">500+ people</span> trading safely
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="h-5 w-5 text-zinc-600" />
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="bg-white border-y border-zinc-100 py-14">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Users className="h-5 w-5" />, value: '500+', label: 'Registered Users' },
                            { icon: <Package className="h-5 w-5" />, value: '1,200+', label: 'Products Listed' },
                            { icon: <Star className="h-5 w-5" />, value: '4.8/5', label: 'Average Rating' },
                            { icon: <TrendingUp className="h-5 w-5" />, value: '98%', label: 'Satisfaction Rate' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="flex justify-center mb-2 text-zinc-400">{stat.icon}</div>
                                <p className="text-3xl font-bold text-zinc-900 tracking-tight">{stat.value}</p>
                                <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeUp>
                        <div className="max-w-xl mb-14">
                            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Why FashaMarket</p>
                            <h2 className="text-4xl font-bold text-zinc-900">Trust is our product.</h2>
                            <p className="text-zinc-500 mt-4 text-lg leading-relaxed">
                                We don't just connect buyers and sellers — we protect every transaction from start to finish.
                            </p>
                        </div>
                    </FadeUp>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {FEATURES.map((f, i) => (
                            <FadeUp key={f.title} delay={i * 120}>
                                <div className="group bg-white p-8 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300">
                                    <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-6`}>
                                        {f.icon}
                                    </div>
                                    <h3 className="font-bold text-zinc-900 text-lg mb-2">{f.title}</h3>
                                    <p className="text-zinc-500 leading-relaxed text-sm">{f.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeUp>
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Explore</p>
                                <h2 className="text-4xl font-bold text-zinc-900">Shop by Category</h2>
                            </div>
                            <Link to="/products"
                                className="hidden sm:flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium group">
                                View all
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </FadeUp>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {CATEGORIES.map((cat, i) => (
                            <FadeUp key={cat.name} delay={i * 80}>
                                <Link to="/products"
                                    className="group bg-zinc-50 hover:bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-100 hover:border-zinc-900 transition-all duration-300 block">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                                        {cat.emoji}
                                    </div>
                                    <h3 className="font-bold text-zinc-900 group-hover:text-white transition-colors">{cat.name}</h3>
                                    <p className="text-xs text-zinc-400 group-hover:text-zinc-400 mt-1">{cat.desc}</p>
                                    <span className="inline-block mt-3 text-xs bg-white group-hover:bg-zinc-800 text-zinc-500 group-hover:text-zinc-300 font-medium px-3 py-1 rounded-full transition-colors">
                                        {cat.count}
                                    </span>
                                </Link>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
                            <h2 className="text-4xl font-bold text-zinc-900">How it works</h2>
                            <p className="text-zinc-500 mt-4 text-lg">Four steps to a safe transaction</p>
                        </div>
                    </FadeUp>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Browse', desc: 'Explore verified second-hand products across all categories.', emoji: '🔍' },
                            { step: '02', title: 'Choose', desc: 'Find the perfect item. Check seller ratings and condition.', emoji: '✅' },
                            { step: '03', title: 'Agree', desc: 'Sign a digital agreement protecting both buyer and seller.', emoji: '📝' },
                            { step: '04', title: 'Receive', desc: 'Get your item delivered within the agreed timeline.', emoji: '📦' },
                        ].map((item, i) => (
                            <FadeUp key={item.step} delay={i * 120}>
                                <div className="bg-white p-6 rounded-2xl border border-zinc-100">
                                    <div className="text-3xl mb-4">{item.emoji}</div>
                                    <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-1">{item.step}</p>
                                    <h3 className="font-bold text-zinc-900 text-lg mb-2">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeUp>
                        <div className="text-center mb-14">
                            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Social Proof</p>
                            <h2 className="text-4xl font-bold text-zinc-900">What people say</h2>
                        </div>
                    </FadeUp>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, i) => (
                            <FadeUp key={t.name} delay={i * 120}>
                                <div className="bg-zinc-50 rounded-2xl p-7 border border-zinc-100 h-full flex flex-col">
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-zinc-600 leading-relaxed flex-1 text-sm">"{t.text}"</p>
                                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-200">
                                        <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-zinc-700">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-zinc-900 text-sm">{t.name}</p>
                                            <p className="text-xs text-zinc-400">{t.role}</p>
                                        </div>
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
                            Ready to start trading?
                        </h2>
                        <p className="text-zinc-400 text-lg mb-10">
                            Join thousands of Rwandans buying and selling safely on FashaMarket.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/register"
                                className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm hover:bg-zinc-100 hover:scale-[1.02]">
                                Create Free Account
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link to="/products"
                                className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-8 py-3.5 rounded-xl border border-white/15 transition-all duration-200 text-sm hover:bg-white/5">
                                Browse Products
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>

            <Footer />
        </div>
    )
}