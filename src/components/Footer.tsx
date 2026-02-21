import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-brand-600 p-1.5 rounded-lg">
                                <ShoppingBag className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-white">
                                Fasha<span className="text-brand-400">Market</span>
                            </span>
                        </div>
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
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">Electronics</Link></li>
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">Clothing</Link></li>
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">Furniture</Link></li>
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">Shoes</Link></li>
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
                        </ul>
                    </div>

                    {/* Trust */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Trust & Safety</h3>
                        <ul className="space-y-2 text-sm">
                            <li><span className="hover:text-brand-400 transition-colors cursor-pointer">How We Verify Sellers</span></li>
                            <li><span className="hover:text-brand-400 transition-colors cursor-pointer">Purchase Agreements</span></li>
                            <li><span className="hover:text-brand-400 transition-colors cursor-pointer">Delivery Policy</span></li>
                            <li><span className="hover:text-brand-400 transition-colors cursor-pointer">Return Policy</span></li>
                            <li><span className="hover:text-brand-400 transition-colors cursor-pointer">Report a Problem</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <p>© {new Date().getFullYear()} FashaMarket. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-brand-400 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-brand-400 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}