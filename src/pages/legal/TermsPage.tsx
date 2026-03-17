import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title="Terms of Service"
                description="FashaMarket Terms of Service — rules and guidelines for buying and selling on our platform."
            />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">Terms of Service</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Last updated: March 2026</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">1. Acceptance of Terms</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            By accessing or using FashaMarket ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. FashaMarket is a marketplace operating in Rwanda that connects buyers and sellers of second-hand goods.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">2. Eligibility</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            You must be at least 18 years old to use FashaMarket. By registering, you confirm that you are 18 or older and that all information you provide is accurate and complete. FashaMarket reserves the right to suspend or terminate accounts that provide false information.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">3. Seller Responsibilities</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Sellers are responsible for accurately describing their products, including condition, defects, and any relevant details. Sellers must ship items within 2 business days of payment confirmation. FashaMarket charges a 10% commission on every successful sale. Sellers must not list prohibited items including stolen goods, counterfeit products, weapons, or illegal substances.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">4. Buyer Responsibilities</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Buyers agree to pay for items they order. For Mobile Money payments, buyers must submit accurate transaction IDs. For Cash on Delivery, buyers must have the full amount ready upon delivery. Buyers must confirm receipt of items honestly. False delivery confirmations are a violation of these terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">5. Digital Agreements</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Every transaction on FashaMarket requires both buyer and seller to sign a digital agreement. This agreement is legally binding and governs the terms of each individual transaction including product condition, payment, delivery timeline, and dispute resolution.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">6. Payments & Commission</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket currently accepts Mobile Money (MTN MoMo) and Cash on Delivery. A 10% commission is deducted from the seller's proceeds on every completed transaction. This commission covers platform maintenance, payment processing, and dispute resolution services. Commission rates may change with 30 days notice to sellers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">7. Returns & Disputes</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Returns are accepted within 48 hours of delivery if the item differs significantly from the listing description. Buyers must provide photo evidence. Disputes must be raised within 72 hours of delivery via our support channel. FashaMarket admin will mediate all disputes as the final arbitrator. FashaMarket's decision is final and binding.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">8. Prohibited Items</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            The following items are strictly prohibited on FashaMarket: stolen or counterfeit goods, weapons and ammunition, illegal drugs and substances, adult content, live animals, items that violate Rwandan law, and any item that FashaMarket deems inappropriate at its sole discretion. Violations will result in immediate account suspension and may be reported to authorities.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">9. Account Suspension</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket reserves the right to suspend or terminate any account that violates these terms, engages in fraudulent activity, receives multiple legitimate complaints from other users, or behaves in a manner that harms the platform or its users.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">10. Limitation of Liability</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket is a marketplace platform and is not responsible for the quality, safety, or legality of items listed. We facilitate connections between buyers and sellers but are not a party to any transaction. FashaMarket's total liability in any dispute shall not exceed the commission amount collected on the relevant transaction.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">11. Changes to Terms</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email where possible.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">12. Contact</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            For questions about these terms, contact us at <span className="text-zinc-900 font-medium">support@fashamarket.rw</span> or visit our <Link to="/contact" className="text-zinc-900 font-medium hover:underline">Contact page</Link>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}