import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Star } from 'lucide-react'
import { reviewsApi } from '@/api/reviews'
import { useAuth } from '@/context/AuthContext'

interface Props {
    productId: string
    orderId?: string
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
    const [hovered, setHovered] = useState(0)

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => onChange && setHovered(star)}
                    onMouseLeave={() => onChange && setHovered(0)}
                    className={onChange ? 'cursor-pointer' : 'cursor-default'}
                >
                    <Star
                        className={`h-5 w-5 ${star <= (hovered || value)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}

export default function ReviewSection({ productId, orderId }: Props) {
    const { isAuthenticated } = useAuth()
    const qc = useQueryClient()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => reviewsApi.getByProduct(productId),
    })

    const mutation = useMutation({
        mutationFn: reviewsApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reviews', productId] })
            setSubmitted(true)
            setRating(0)
            setComment('')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!rating || !orderId) return
        mutation.mutate({ product_id: productId, order_id: orderId, rating, comment })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
                {data && (
                    <div className="flex items-center gap-1">
                        <StarRating value={Math.round(data.average)} />
                        <span className="text-sm text-gray-500">
                            {data.average} ({data.total})
                        </span>
                    </div>
                )}
            </div>

            {/* Leave a review */}
            {isAuthenticated && orderId && !submitted && (
                <form onSubmit={handleSubmit} className="card p-4 space-y-3">
                    <p className="text-sm font-medium text-gray-700">Leave a Review</p>
                    <StarRating value={rating} onChange={setRating} />
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="input resize-none"
                        rows={3}
                        placeholder="Share your experience with this product..."
                    />
                    <button
                        type="submit"
                        disabled={!rating || mutation.isPending}
                        className="btn-primary"
                    >
                        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}

            {submitted && (
                <div className="card p-4 bg-green-50 border-green-200 text-green-700 text-sm">
                    Thank you for your review!
                </div>
            )}

            {/* Reviews list */}
            {isLoading && <p className="text-sm text-gray-400">Loading reviews...</p>}

            {data?.data.length === 0 && (
                <p className="text-sm text-gray-400">No reviews yet. Be the first to review this product.</p>
            )}

            <div className="space-y-4">
                {data?.data.map((review: any) => (
                    <div key={review.id} className="card p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-medium text-sm">
                                    {review.user_name[0].toUpperCase()}
                                </div>
                                <span className="text-sm font-medium text-gray-900">{review.user_name}</span>
                            </div>
                            <StarRating value={review.rating} />
                        </div>
                        {review.comment && (
                            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                        )}
                        <p className="text-xs text-gray-400">
                            {new Date(review.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}