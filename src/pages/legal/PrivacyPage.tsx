import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title="Privacy Policy"
                description="FashaMarket Privacy Policy — how we collect, use and protect your personal data."
            />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Last updated: March 2026</p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">1. Information We Collect</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            When you register on FashaMarket, we collect your full name, email address, and phone number. When you list products, we collect product details and images. When you place orders, we collect transaction information including payment references. We also collect basic usage data such as pages visited and actions taken on the platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">2. How We Use Your Information</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            We use your information to operate the marketplace, process transactions, send order notifications, verify seller identities, resolve disputes, improve our services, and comply with legal obligations in Rwanda. We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">3. Information Sharing</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            We share limited information between buyers and sellers to facilitate transactions — for example, a seller may see a buyer's name in connection with an order. We do not share your email address or phone number with other users without your consent. We may share information with law enforcement if required by Rwandan law.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">4. Data Storage & Security</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Your data is stored securely on servers hosted by Railway (EU region). Passwords are hashed using bcrypt and are never stored in plain text. We use HTTPS encryption for all data transmission. JWT tokens expire after 7 days. We implement rate limiting and other security measures to protect your account.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">5. Images</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            Product images uploaded to FashaMarket are stored on Cloudinary, a secure cloud image hosting service. By uploading images, you confirm you have the right to use them. FashaMarket may remove images that violate our terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">6. Cookies</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket uses browser local storage to maintain your login session via JWT tokens. We do not currently use tracking cookies or advertising cookies. We may use analytics tools in the future to understand how users interact with the platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">7. Your Rights</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            You have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and associated data, and opt out of non-essential communications. To exercise these rights contact us at <span className="text-zinc-900 font-medium">support@fashamarket.rw</span>.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">8. Data Retention</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            We retain your account data for as long as your account is active. Order records are retained for 3 years for legal and financial compliance purposes. If you delete your account, personal data is removed within 30 days except where retention is required by law.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">9. Children's Privacy</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            FashaMarket is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has registered, we will terminate that account immediately.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">10. Changes to This Policy</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify users of significant changes via email or a notice on the platform. Continued use of FashaMarket after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900">11. Contact</h2>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            For privacy concerns or data requests, contact us at <span className="text-zinc-900 font-medium">support@fashamarket.rw</span>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    )
}