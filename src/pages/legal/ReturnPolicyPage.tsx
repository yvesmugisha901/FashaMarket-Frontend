import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO title="Return Policy" description="FashaMarket return policy — when and how you can return items." />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                                <RotateCcw className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-zinc-900">Return Policy</h1>
                        </div>
                        <p className="text-zinc-500 mt-2 text-sm">We want every transaction to be fair. Here's how returns work on FashaMarket.</p>
                    </div>

                    <div className="bg-zinc-900 rounded-2xl p-6 text-white">
                        <h2 className="font-bold text-lg mb-1">48-Hour Return Window</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            You have 48 hours from the time of delivery to raise a return request if the item significantly differs from the listing description. After 48 hours the transaction is considered final.
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-zinc-900">Valid Reasons for Return</h2>
                        <div className="space-y-2">
                            {[
                                'Item is significantly different from the description',
                                'Item has major defects not mentioned in the listing',
                                'Wrong item was delivered',
                                'Item is non-functional despite being listed as working',
                                'Item is counterfeit or not authentic as described',
                            ].map((reason) => (
                                <div key={reason} className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <p className="text-sm text-zinc-700">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-zinc-900">Not Valid for Return</h2>
                        <div className="space-y-2">
                            {[
                                'Buyer changed their mind after receiving',
                                'Minor wear consistent with the listed condition',
                                'Item matches description but buyer expected more',
                                'Return request raised after 48 hours',
                                'Item has been used or damaged by buyer after delivery',
                            ].map((reason) => (
                                <div key={reason} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                    <p className="text-sm text-zinc-700">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">How to Request a Return</h2>
                        <div className="space-y-3">
                            {[
                                { step: '01', title: 'Take photos', desc: 'Document the item and any defects with clear photos immediately upon receiving.' },
                                { step: '02', title: 'Contact support', desc: 'Reach out via our Contact page within 48 hours of delivery with photos and order details.' },
                                { step: '03', title: 'Admin review', desc: 'Our admin team will review your case and contact both parties within 24 hours.' },
                                { step: '04', title: 'Resolution', desc: 'If the return is valid, we will arrange return shipping and a refund or replacement.' },
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
                            Do not confirm delivery on the platform if you have an issue with the item. Once you confirm delivery, the transaction is considered complete. Contact <Link to="/contact" className="font-semibold hover:underline">support</Link> before confirming if something is wrong.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}