import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { productsApi } from '@/api/products'
import type { ProductFilters } from '@/types'
import SEO from '@/components/SEO'

const CATEGORIES = [
    { id: '8c50f7f1-12a3-4065-93ec-7e46aa5f9467', name: 'Clothing' },
    { id: '3755c6fb-92a9-4a82-a9c1-fbf58ec25858', name: 'Electronics' },
    { id: 'c285703a-0abc-4a25-a6a9-0ae6c7090657', name: 'Furniture' },
    { id: '5b7a77be-ee7b-4ab7-b28f-9365194ce8cc', name: 'Shoes' },
    { id: '3cf97dc8-aa1f-4ecf-ab87-c40dacd6ac14', name: 'Other' },
]

const CONDITIONS = [
    { value: 'NEW', label: 'New' },
    { value: 'LIKE_NEW', label: 'Like New' },
    { value: 'GOOD', label: 'Good' },
    { value: 'FAIR', label: 'Fair' },
]

export default function ProductsPage() {
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<ProductFilters>({ page: 1, limit: 20 })

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', filters],
        queryFn: () => productsApi.getAll(filters),
    })

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setFilters((prev) => ({ ...prev, search, page: 1 }))
    }

    const handleFilter = (key: keyof ProductFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 }))
    }

    const clearFilters = () => {
        setSearch('')
        setFilters({ page: 1, limit: 20 })
    }

    const hasActiveFilters = filters.category_id || filters.condition || filters.min_price || filters.max_price || filters.search

    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title="Browse Products"
                description="Browse hundreds of verified second-hand products in Rwanda. Electronics, clothing, furniture, shoes and more at great prices."
                keywords="second hand products Rwanda, buy used electronics Kigali, affordable clothes Rwanda"
            />

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Search + Filter toggle */}
                <div className="flex gap-2 mb-6">
                    <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                            />
                        </div>
                        <button type="submit"
                            className="bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                            Search
                        </button>
                    </form>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${showFilters ? 'border-zinc-900 text-zinc-900 bg-zinc-50' : 'border-zinc-200 text-zinc-600 bg-white hover:border-zinc-300'
                            }`}>
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                    </button>

                    {hasActiveFilters && (
                        <button onClick={clearFilters}
                            className="flex items-center gap-1 px-4 py-2.5 border border-red-200 text-red-500 bg-white rounded-xl text-sm font-medium hover:bg-red-50 transition-all">
                            <X className="h-4 w-4" />
                            Clear
                        </button>
                    )}
                </div>

                {/* Filters panel */}
                {showFilters && (
                    <div className="bg-white border border-zinc-100 rounded-2xl p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Category</label>
                            <select
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                value={filters.category_id ?? ''}
                                onChange={(e) => handleFilter('category_id', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Condition</label>
                            <select
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                value={filters.condition ?? ''}
                                onChange={(e) => handleFilter('condition', e.target.value)}
                            >
                                <option value="">All Conditions</option>
                                {CONDITIONS.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Min Price (RWF)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                placeholder="0"
                                value={filters.min_price ?? ''}
                                onChange={(e) => handleFilter('min_price', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Max Price (RWF)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                placeholder="Any"
                                value={filters.max_price ?? ''}
                                onChange={(e) => handleFilter('max_price', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Loading */}
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden animate-pulse">
                                <div className="aspect-square bg-zinc-100" />
                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-zinc-100 rounded-full w-3/4" />
                                    <div className="h-4 bg-zinc-100 rounded-full w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="text-center py-20 text-red-500">Failed to load products.</div>
                )}

                {/* Empty */}
                {data && data.data.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-400 text-lg font-medium">No products found.</p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters}
                                className="mt-4 px-5 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-all">
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {/* Results */}
                {data && data.data.length > 0 && (
                    <>
                        <p className="text-sm text-zinc-400 mb-4 font-medium">
                            {data.total} product{data.total !== 1 ? 's' : ''} found
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {data.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}