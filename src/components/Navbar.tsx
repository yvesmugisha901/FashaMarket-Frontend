import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, LogOut, Plus, Menu, X, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
        setMenuOpen(false)
    }

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-brand-600 p-1.5 rounded-lg">
                            <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Fasha<span className="text-brand-600">Market</span>
                        </span>
                    </Link>

                    {/* Center search bar - desktop */}
                    <div className="hidden md:flex flex-1 max-w-sm mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const val = (e.target as HTMLInputElement).value
                                        navigate(`/products?search=${val}`)
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-4 text-sm">
                        <Link to="/products" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                            Browse
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {user?.role === 'SELLER' && (
                                    <Link to="/sell" className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-full transition-colors text-sm">
                                        <Plus className="h-4 w-4" />
                                        Sell Item
                                    </Link>
                                )}
                                {user?.role === 'BUYER' && (
                                    <Link to="/products" className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-full transition-colors text-sm">
                                        Shop Now
                                    </Link>
                                )}
                                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-brand-600 transition-colors font-medium">
                                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                                        {user?.name[0].toUpperCase()}
                                    </div>
                                    <span className="hidden lg:block">{user?.name.split(' ')[0]}</span>
                                </Link>
                                {user?.role === 'ADMIN' && (
                                    <Link to="/admin" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                    Log in
                                </Link>
                                <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-full transition-colors">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-700 font-medium py-2">Browse</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-gray-700 font-medium py-2">Dashboard</Link>
                                {user?.role === 'SELLER' && (
                                    <Link to="/sell" onClick={() => setMenuOpen(false)} className="block text-brand-600 font-medium py-2">+ Sell Item</Link>
                                )}
                                {user?.role === 'ADMIN' && (
                                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-brand-600 font-medium py-2">Admin Panel</Link>
                                )}
                                <button onClick={handleLogout} className="block text-red-500 font-medium py-2 w-full text-left">Log out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 font-medium py-2">Log in</Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-brand-600 font-medium py-2">Get Started</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}