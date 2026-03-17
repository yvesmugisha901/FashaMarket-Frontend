import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Shield, Clock, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function PurchaseAgreementsPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO title="Purchase Agreements" description="Learn how FashaMarket purchase agreements protect buyers and sellers." />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">Purchase Agreements</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Every transaction on FashaMarket is backed by a legally binding digital agreement.</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">What is a Purchase Agreement?</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            A purchase agreement is a digital contract between the buyer and seller for each transaction. It outlines the product condition, price, payment method, delivery timeline, return policy, and dispute resolution process. Both parties must sign before the transaction proceeds.
                        </p>
                    </section>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: <FileText className="h-5 w-5 text-white" />, title: 'What it covers', items: ['Product title and condition', 'Agreed price in RWF', 'Payment method chosen', 'Delivery timeline (2-3 days)', 'Return policy (48 hours)', 'Dispute resolution process'] },
                            { icon: <Shield className="h-5 w-5 text-white" />, title: 'How it protects you', items: ['Seller cannot change price after signing', 'Buyer cannot falsely claim non-delivery', 'Clear evidence in case of disputes', 'FashaMarket mediates using agreement', 'Timestamp of when signed', 'Both parties legally accountable'] },
                        ].map((item) => (
                            <div key={item.title} className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-zinc-900">{item.title}</h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {item.items.map((i) => (
                                        <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full flex-shrink-0" />
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">How the signing process works</h2>
                        <div className="space-y-3">
                            {[
                                { step: '01', title: 'Buyer places order', desc: 'Buyer selects payment method and places the order.' },
                                { step: '02', title: 'Agreement generated', desc: 'FashaMarket automatically generates a purchase agreement with all transaction details.' },
                                { step: '03', title: 'Buyer signs', desc: 'Buyer reads and digitally signs the agreement before payment.' },
                                { step: '04', title: 'Transaction proceeds', desc: 'Once signed, payment is processed and the seller is notified to ship.' },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4 items-start">
                                    <span className="text-xs font-bold text-zinc-300 w-8 flex-shrink-0 mt-0.5">{item.step}</span>
                                    <div>
                                        <p className="font-semibold text-zinc-900 text-sm">{item.title}</p>
                                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                            By signing a purchase agreement, you confirm you have read and understood all terms. The agreement is timestamped and stored securely. It will be used as evidence in any dispute resolution process.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}