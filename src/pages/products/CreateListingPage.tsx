import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Upload, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { productsApi } from '@/api/products'
import api from '@/api/axios'
import type { CreateProductInput } from '@/types'
import SellerAgreementModal from '@/pages/seller/SellerAgreementModal'

const schema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Describe your item in detail'),
    price: z.coerce.number().positive('Price must be positive'),
    condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']),
    category_id: z.string().min(1, 'Select a category'),
})

const CATEGORIES = [
    { id: '8c50f7f1-12a3-4065-93ec-7e46aa5f9467', name: 'Clothing' },
    { id: '3755c6fb-92a9-4a82-a9c1-fbf58ec25858', name: 'Electronics' },
    { id: 'c285703a-0abc-4a25-a6a9-0ae6c7090657', name: 'Furniture' },
    { id: '5b7a77be-ee7b-4ab7-b28f-9365194ce8cc', name: 'Shoes' },
    { id: '3cf97dc8-aa1f-4ecf-ab87-c40dacd6ac14', name: 'Other' },
]

const CONDITIONS = [
    { value: 'NEW', label: 'New', desc: 'Never used, original packaging' },
    { value: 'LIKE_NEW', label: 'Like New', desc: 'Used once or twice, no defects' },
    { value: 'GOOD', label: 'Good', desc: 'Minor signs of use, fully functional' },
    { value: 'FAIR', label: 'Fair', desc: 'Visible wear but works perfectly' },
]

export default function CreateListingPage() {
    const navigate = useNavigate()
    const [images, setImages] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [showAgreement, setShowAgreement] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm<Omit<CreateProductInput, 'images'>>({
        resolver: zodResolver(schema),
        defaultValues: { condition: 'GOOD' },
    })

    const selectedCondition = watch('condition')
    const price = watch('price')

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        setUploading(true)
        try {
            for (const file of Array.from(files)) {
                const formData = new FormData()
                formData.append('image', file)
                const res = await api.post<{ url: string }>('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                setImages((prev) => [...prev, res.data.url])
            }
        } catch {
            alert('Image upload failed. Try again.')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (url: string) => {
        setImages((prev) => prev.filter((i) => i !== url))
    }

    const mutation = useMutation({
        mutationFn: (data: Omit<CreateProductInput, 'images'>) =>
            productsApi.create({ ...data, images }),
        onSuccess: () => navigate('/dashboard'),
        onError: () => setError('root', { message: 'Failed to create listing. Try again.' }),
    })

    const commissionRate = 10
    const sellerReceives = price ? Math.round(price * (1 - commissionRate / 100)) : 0

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            {/* Seller Agreement Modal */}
            {showAgreement && !agreedToTerms && (
                <SellerAgreementModal
                    commissionRate={commissionRate}
                    onAgree={() => {
                        setAgreedToTerms(true)
                        setShowAgreement(false)
                    }}
                    onClose={() => navigate('/dashboard')}
                />
            )}

            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Create Listing</h1>
                        {agreedToTerms && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                <CheckCircle className="h-3 w-3" /> Terms Agreed
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-zinc-500">
                        Your listing will be reviewed by admin before going live. Fill in accurate details.
                    </p>
                </div>

                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">

                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <label className="block text-sm font-semibold text-zinc-900 mb-4">
                            Product Photos
                            <span className="text-zinc-400 font-normal ml-1">(add up to 5)</span>
                        </label>

                        {images.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                                {images.map((url, i) => (
                                    <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 group">
                                        <img src={url} alt="product" className="w-full h-full object-cover" />
                                        {i === 0 && (
                                            <span className="absolute bottom-1 left-1 text-[10px] bg-zinc-900 text-white px-1.5 py-0.5 rounded-md font-medium">
                                                Main
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <label className="aspect-square rounded-xl border-2 border-dashed border-zinc-200 flex items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors">
                                        {uploading ? (
                                            <Loader2 className="h-5 w-5 text-zinc-400 animate-spin" />
                                        ) : (
                                            <Upload className="h-5 w-5 text-zinc-300" />
                                        )}
                                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="hidden" />
                                    </label>
                                )}
                            </div>
                        )}

                        {images.length === 0 && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl p-10 cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all">
                                {uploading ? (
                                    <Loader2 className="h-8 w-8 text-zinc-400 animate-spin" />
                                ) : (
                                    <Upload className="h-8 w-8 text-zinc-300" />
                                )}
                                <span className="text-sm font-medium text-zinc-500 mt-3">
                                    {uploading ? 'Uploading...' : 'Click to upload photos'}
                                </span>
                                <span className="text-xs text-zinc-400 mt-1">PNG, JPG up to 5MB each</span>
                                <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="hidden" />
                            </label>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5">
                        <h2 className="text-sm font-semibold text-zinc-900">Product Details</h2>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Title</label>
                            <input
                                {...register('title')}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400"
                                placeholder="e.g. iPhone 13 Pro — 256GB Space Gray"
                            />
                            {errors.title && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
                            <textarea
                                {...register('description')}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 min-h-[120px] resize-y"
                                placeholder="Describe the item honestly — condition, any defects, reason for selling, what's included..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Category</label>
                            <select
                                {...register('category_id')}
                                className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-zinc-700"
                            >
                                <option value="">Select a category</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.category_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Price & Condition */}
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-5">
                        <h2 className="text-sm font-semibold text-zinc-900">Pricing & Condition</h2>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Price (RWF)</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-medium">RWF</span>
                                <input
                                    {...register('price')}
                                    type="number"
                                    className="w-full pl-14 pr-4 py-2.5 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 font-semibold"
                                    placeholder="50000"
                                />
                            </div>
                            {errors.price && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> {errors.price.message}
                                </p>
                            )}

                            {/* Commission breakdown */}
                            {price > 0 && (
                                <div className="mt-3 bg-zinc-50 border border-zinc-100 rounded-xl p-3 space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-500">Listing price</span>
                                        <span className="font-semibold text-zinc-900">{Number(price).toLocaleString()} RWF</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-500">FashaMarket commission ({commissionRate}%)</span>
                                        <span className="font-semibold text-red-500">- {Math.round(price * commissionRate / 100).toLocaleString()} RWF</span>
                                    </div>
                                    <div className="flex justify-between text-xs pt-1.5 border-t border-zinc-200">
                                        <span className="font-semibold text-zinc-900">You receive</span>
                                        <span className="font-black text-green-600">{sellerReceives.toLocaleString()} RWF</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Condition selector */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Condition</label>
                            <div className="grid grid-cols-2 gap-2">
                                {CONDITIONS.map((c) => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setValue('condition', c.value as any)}
                                        className={`p-3 rounded-xl border text-left transition-all ${selectedCondition === c.value
                                            ? 'border-zinc-900 bg-zinc-900 text-white'
                                            : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 text-zinc-700'
                                            }`}
                                    >
                                        <p className="text-sm font-semibold">{c.label}</p>
                                        <p className={`text-xs mt-0.5 ${selectedCondition === c.value ? 'text-zinc-400' : 'text-zinc-400'}`}>
                                            {c.desc}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {errors.root && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <p className="text-sm text-red-600">{errors.root.message}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={mutation.isPending || uploading || !agreedToTerms}
                        className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Listing for Review'
                        )}
                    </button>

                    <p className="text-xs text-zinc-400 text-center">
                        Your listing will be reviewed by our admin team within 24 hours before going live.
                    </p>
                </form>
            </div>
        </div>
    )
}