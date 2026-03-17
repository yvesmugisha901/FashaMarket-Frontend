import { Link } from 'react-router-dom'
import { ArrowLeft, Truck, Clock, MapPin, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function DeliveryPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO title="Delivery Policy" description="FashaMarket delivery policy — timelines, coverage and what to expect." />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">Delivery Policy</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Clear timelines and expectations for every delivery on FashaMarket.</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: <Clock className="h-6 w-6 text-white" />, title: '2 Business Days', desc: 'Seller must ship within 2 business days of payment confirmation' },
                            { icon: <Truck className="h-6 w-6 text-white" />, title: '1-3 Days Delivery', desc: 'Estimated delivery time after shipping within Rwanda' },
                            { icon: <MapPin className="h-6 w-6 text-white" />, title: 'Nationwide', desc: 'Delivery available across all provinces of Rwanda' },
                        ].map((item) => (
                            <div key={item.title} className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 text-center">
                                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">Seller Shipping Obligations</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Once payment is confirmed by FashaMarket admin, the seller has 2 business days to ship the item. The seller is responsible for packaging the item securely and choosing a reliable delivery method. The seller must update the order status to "Shipped" on the platform once dispatched.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">Cash on Delivery (COD)</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            For COD orders, the seller delivers the item directly to the buyer. The buyer pays the full amount in cash upon receiving the item. The seller must confirm cash receipt on the platform. COD is available within Kigali and selected areas across Rwanda.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">Delivery Costs</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Delivery costs are negotiated directly between buyer and seller. FashaMarket does not currently include delivery fees in the listed price. Buyers and sellers should agree on delivery cost before completing the transaction. This will be clearly outlined in the purchase agreement.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">Late or Missing Deliveries</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            If a seller does not ship within 2 business days without communication, the buyer may contact FashaMarket support to escalate. If an item is lost during delivery, FashaMarket will mediate between the buyer and seller to find a resolution. Always confirm receipt only after physically receiving and inspecting the item.
                        </p>
                    </section>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                            Never confirm delivery on the platform before physically receiving your item. Once you confirm delivery, the transaction is considered complete. Contact <Link to="/contact" className="font-semibold hover:underline">support</Link> if you have any delivery issues.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}