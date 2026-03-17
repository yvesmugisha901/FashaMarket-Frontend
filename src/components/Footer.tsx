import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import logo from '@/assets/fasha2.jpeg'

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-400">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="space-y-4">
                        <img src={logo} alt="FashaMarket" className="h-10 w-auto object-contain" />
                        <p className="text-sm leading-relaxed">
                            Rwanda's trusted second-hand marketplace. Verified sellers, signed agreements, structured delivery.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-brand-400 flex-shrink-0" />
                                <span>Kigali, Rwanda</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-brand-400 flex-shrink-0" />
                                <span>+250 784 559 922</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-brand-400 flex-shrink-0" />
                                <span>support@fashamarket.rw</span>
                            </div>
                        </div>
                    </div>

                    {/* Marketplace */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Marketplace</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">Browse Products</Link></li>
                            <li><Link to="/products?category=electronics" className="hover:text-brand-400 transition-colors">Electronics</Link></li>
                            <li><Link to="/products?category=clothing" className="hover:text-brand-400 transition-colors">Clothing</Link></li>
                            <li><Link to="/products?category=furniture" className="hover:text-brand-400 transition-colors">Furniture</Link></li>
                            <li><Link to="/products?category=shoes" className="hover:text-brand-400 transition-colors">Shoes</Link></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Account</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register" className="hover:text-brand-400 transition-colors">Create Account</Link></li>
                            <li><Link to="/login" className="hover:text-brand-400 transition-colors">Log In</Link></li>
                            <li><Link to="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/sell" className="hover:text-brand-400 transition-colors">Sell an Item</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Trust & Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/terms" className="hover:text-brand-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/how-we-verify" className="hover:text-brand-400 transition-colors">How We Verify Sellers</Link></li>
                            <li><Link to="/purchase-agreements" className="hover:text-brand-400 transition-colors">Purchase Agreements</Link></li>
                            <li><Link to="/delivery-policy" className="hover:text-brand-400 transition-colors">Delivery Policy</Link></li>
                            <li><Link to="/return-policy" className="hover:text-brand-400 transition-colors">Return Policy</Link></li>
                            <li><Link to="/report-problem" className="hover:text-brand-400 transition-colors">Report a Problem</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <p>© {new Date().getFullYear()} FashaMarket. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-brand-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}