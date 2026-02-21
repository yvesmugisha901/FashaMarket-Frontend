import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, BadgeCheck, ArrowRight, Star, Users, Package, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const FEATURES = [
    {
        icon: <BadgeCheck className="h-7 w-7 text-brand-600" />,
        title: 'Verified Sellers',
        desc: 'Every seller goes through identity verification and admin approval before listing anything.',
    },
    {
        icon: <ShieldCheck className="h-7 w-7 text-brand-600" />,
        title: 'Signed Agreement',
        desc: 'Every purchase is backed by a digital agreement covering condition, returns, and delivery.',
    },
    {
        icon: <Truck className="h-7 w-7 text-brand-600" />,
        title: 'Defined Delivery',
        desc: 'Clear delivery timelines set at checkout. No guessing, no surprises.',
    },
]

const STATS = [
    { icon: <Users className="h-6 w-6" />, value: '500+', label: 'Registered Users' },
    { icon: <Package className="h-6 w-6" />, value: '1,200+', label: 'Products Listed' },
    { icon: <Star className="h-6 w-6" />, value: '4.8', label: 'Average Rating' },
    { icon: <TrendingUp className="h-6 w-6" />, value: '98%', label: 'Satisfaction Rate' },
]

const CATEGORIES = [
    { name: 'Electronics', emoji: '📱', desc: 'Phones, laptops, gadgets' },
    { name: 'Clothing', emoji: '👗', desc: 'Fashion for everyone' },
    { name: 'Furniture', emoji: '🪑', desc: 'Home & office pieces' },
    { name: 'Shoes', emoji: '👟', desc: 'All styles & sizes' },
]

const TESTIMONIALS = [
    {
        name: 'Amina K.',
        role: 'Buyer',
        text: 'I bought a laptop here and the whole process was so smooth. The agreement made me feel safe.',
        rating: 5,
    },
    {
        name: 'Jean Paul N.',
        role: 'Seller',
        text: 'FashaMarket helped me sell my old phone in 2 days. Very professional platform.',
        rating: 5,
    },
    {
        name: 'Grace U.',
        role: 'Buyer',
        text: 'Love that sellers are verified. I finally trust buying second-hand online.',
        rating: 5,
    },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-brand-50 via-white to-green-50 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                            Rwanda's #1 Trusted Marketplace
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                            Buy & Sell
                            <span className="text-brand-600"> Second-Hand</span>
                            <br />with Confidence
                        </h1>
                        <p className="mt-6 text-xl text-gray-500 max-w-xl leading-relaxed">
                            Verified sellers. Signed agreements. Structured delivery. FashaMarket brings trust to every transaction in Rwanda.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link to="/products" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base shadow-lg shadow-brand-200">
                                Browse Products
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link to="/register" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-full border border-gray-200 transition-colors text-base">
                                Start Selling
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                {['A', 'J', 'G', 'M'].map((l) => (
                                    <div key={l} className="w-8 h-8 rounded-full bg-brand-200 border-2 border-white flex items-center justify-center text-brand-800 font-bold text-xs">
                                        {l}
                                    </div>
                                ))}
                            </div>
                            <span>Join <strong>500+</strong> people already trading on FashaMarket</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-brand-600">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center text-white">
                            <div className="flex justify-center mb-2 opacity-80">{stat.icon}</div>
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-brand-200 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Built on trust
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                            We don't just connect buyers and sellers — we protect every transaction from start to finish.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-200 bg-white">
                                <div className="p-3 bg-brand-50 rounded-xl w-fit mb-5 group-hover:bg-brand-100 transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                        <p className="text-gray-500 mt-3">Find exactly what you're looking for</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products`}
                                className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all duration-200"
                            >
                                <div className="text-4xl mb-3">{cat.emoji}</div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{cat.name}</h3>
                                <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/products" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                            View all products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
                        <p className="text-gray-500 mt-3">Simple, safe, and structured</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Browse', desc: 'Explore hundreds of verified second-hand products across all categories.' },
                            { step: '02', title: 'Choose', desc: 'Find the perfect item. Check seller ratings and product condition.' },
                            { step: '03', title: 'Agree', desc: 'Sign a digital agreement that protects both buyer and seller.' },
                            { step: '04', title: 'Receive', desc: 'Get your item delivered within the agreed timeline. Rate your experience.' },
                        ].map((item) => (
                            <div key={item.step} className="relative">
                                <div className="text-6xl font-black text-brand-50 mb-4 leading-none">{item.step}</div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 -mt-4">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">What people say</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className="text-xs text-gray-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-brand-600">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Ready to buy or sell?
                    </h2>
                    <p className="text-brand-200 text-lg mb-8">
                        Join thousands of Rwandans trading safely on FashaMarket.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/register" className="bg-white text-brand-600 font-bold px-8 py-4 rounded-full hover:bg-brand-50 transition-colors">
                            Create Free Account
                        </Link>
                        <Link to="/products" className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-brand-700 transition-colors">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}