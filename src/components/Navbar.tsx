import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Plus, Menu, X, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import logo from '@/assets/fasha1.jpeg'

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        setMenuOpen(false)
    }

    return (
        <>
            {/* Fixed navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-md border-b border-zinc-100'
                : 'bg-white/80 backdrop-blur-md border-b border-zinc-100'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo — large and clear */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="FashaMarket"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>

                        {/* Search — desktop */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:bg-white transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = (e.target as HTMLInputElement).value
                                            navigate(`/products?search=${val}`)
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Nav links — desktop */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <Link
                                to="/products"
                                className="text-zinc-600 hover:text-zinc-900 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 transition-all"
                            >
                                Browse
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    {user?.role === 'ADMIN' && (
                                        <Link
                                            to="/admin"
                                            className="text-brand-600 font-semibold px-3 py-2 rounded-lg hover:bg-brand-50 transition-all"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    {user?.role === 'SELLER' && (
                                        <Link
                                            to="/sell"
                                            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Sell Item
                                        </Link>
                                    )}
                                    {user?.role === 'BUYER' && (
                                        <Link
                                            to="/products"
                                            className="bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all"
                                        >
                                            Shop Now
                                        </Link>
                                    )}
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-zinc-50 transition-all"
                                    >
                                        <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {user?.name[0].toUpperCase()}
                                        </div>
                                        <span className="text-zinc-700 font-medium hidden lg:block">
                                            {user?.name.split(' ')[0]}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Logout"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-zinc-600 hover:text-zinc-900 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 transition-all"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 text-zinc-600 hover:bg-zinc-50 rounded-lg transition-all"
                        >
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menuOpen && (
                        <div className="md:hidden border-t border-zinc-100 py-4 space-y-1">
                            <div className="relative mb-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = (e.target as HTMLInputElement).value
                                            navigate(`/products?search=${val}`)
                                            setMenuOpen(false)
                                        }
                                    }}
                                />
                            </div>

                            <Link to="/products" onClick={() => setMenuOpen(false)}
                                className="flex items-center px-3 py-2.5 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors">
                                Browse
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                                        className="flex items-center px-3 py-2.5 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors">
                                        Dashboard
                                    </Link>
                                    {user?.role === 'SELLER' && (
                                        <Link to="/sell" onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2 px-3 py-2.5 text-zinc-900 font-semibold rounded-xl hover:bg-zinc-50 transition-colors">
                                            <Plus className="h-4 w-4" /> Sell Item
                                        </Link>
                                    )}
                                    {user?.role === 'ADMIN' && (
                                        <Link to="/admin" onClick={() => setMenuOpen(false)}
                                            className="flex items-center px-3 py-2.5 text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={handleLogout}
                                        className="flex items-center gap-2 px-3 py-2.5 text-red-500 font-medium rounded-xl hover:bg-red-50 w-full text-left transition-colors">
                                        <LogOut className="h-4 w-4" /> Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMenuOpen(false)}
                                        className="flex items-center px-3 py-2.5 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors">
                                        Log in
                                    </Link>
                                    <Link to="/register" onClick={() => setMenuOpen(false)}
                                        className="flex items-center justify-center px-3 py-2.5 text-white font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-700 transition-colors">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Spacer so content doesn't hide behind fixed navbar */}
            <div className="h-20" />
        </>
    )
}