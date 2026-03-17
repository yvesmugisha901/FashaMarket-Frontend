import { Link } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, ShieldCheck, UserCheck, FileText } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function HowWeVerifyPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO title="How We Verify Sellers" description="Learn how FashaMarket verifies sellers to ensure safe and trusted transactions." />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-10">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">How We Verify Sellers</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Our verification process keeps FashaMarket safe for everyone.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: <UserCheck className="h-6 w-6 text-white" />, bg: 'bg-zinc-900', title: 'Identity Check', desc: 'Every seller submits their full name, phone number and email. Our admin team manually reviews each seller account before approving them to list products.' },
                            { icon: <FileText className="h-6 w-6 text-white" />, bg: 'bg-zinc-700', title: 'Agreement Signed', desc: 'Before listing any product, sellers must read and sign our seller agreement which includes commission terms, prohibited items, and shipping obligations.' },
                            { icon: <ShieldCheck className="h-6 w-6 text-white" />, bg: 'bg-zinc-900', title: 'Admin Approval', desc: 'Every product listing goes through manual admin review before appearing on the marketplace. Listings with false descriptions or prohibited items are rejected.' },
                            { icon: <BadgeCheck className="h-6 w-6 text-white" />, bg: 'bg-zinc-700', title: 'Verified Badge', desc: 'Sellers who pass all checks receive a blue verified badge on their profile and listings. This badge means the seller has been manually reviewed by our team.' },
                        ].map((item) => (
                            <div key={item.title} className="flex gap-4">
                                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                        <h2 className="font-bold text-zinc-900 mb-2">What if a seller is fraudulent?</h2>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            If you encounter a fraudulent seller, report them immediately via our <Link to="/contact" className="text-zinc-900 font-semibold hover:underline">Report a Problem</Link> page. We take fraud seriously and will suspend the account, investigate the transaction, and work to resolve any financial loss.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}