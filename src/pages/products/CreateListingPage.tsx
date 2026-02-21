import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Upload, X, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { productsApi } from '@/api/products'
import api from '@/api/axios'
import type { CreateProductInput } from '@/types'

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

export default function CreateListingPage() {
    const navigate = useNavigate()
    const [images, setImages] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Omit<CreateProductInput, 'images'>>({
        resolver: zodResolver(schema),
    })

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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Listing</h1>
                <p className="text-sm text-gray-500 mb-8">
                    Your listing will be reviewed by admin before it goes live.
                </p>

                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="card p-6 space-y-5">

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Images
                        </label>

                        {/* Uploaded images preview */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {images.map((url) => (
                                    <div key={url} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                        <img src={url} alt="product" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload button */}
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors">
                            {uploading ? (
                                <Loader2 className="h-6 w-6 text-brand-500 animate-spin" />
                            ) : (
                                <Upload className="h-6 w-6 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-500 mt-2">
                                {uploading ? 'Uploading...' : 'Click to upload images'}
                            </span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input {...register('title')} className="input" placeholder="e.g. iPhone 11 Pro — 128GB" />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            className="input min-h-[100px] resize-y"
                            placeholder="Describe the item honestly — condition, any defects, reason for selling..."
                        />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Price + Condition */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (RWF)</label>
                            <input {...register('price')} type="number" className="input" placeholder="15000" />
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <select {...register('condition')} className="input">
                                <option value="NEW">New</option>
                                <option value="LIKE_NEW">Like New</option>
                                <option value="GOOD">Good</option>
                                <option value="FAIR">Fair</option>
                            </select>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select {...register('category_id')} className="input">
                            <option value="">Select category</option>
                            {CATEGORIES.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-xs text-red-500 mt-1">{errors.category_id.message}</p>}
                    </div>

                    {errors.root && <p className="text-sm text-red-500 text-center">{errors.root.message}</p>}

                    <button
                        type="submit"
                        disabled={mutation.isPending || uploading}
                        className="btn-primary w-full py-2.5"
                    >
                        {mutation.isPending ? 'Submitting...' : 'Submit Listing for Review'}
                    </button>
                </form>
            </div>
        </div>
    )
}