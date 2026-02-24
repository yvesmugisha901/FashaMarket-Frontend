import { useState } from 'react'
import { CheckCircle, FileText, X } from 'lucide-react'

interface Props {
    onAgree: () => void
    onClose: () => void
    commissionRate?: number
}

export default function SellerAgreementModal({ onAgree, onClose, commissionRate = 10 }: Props) {
    const [checked, setChecked] = useState(false)

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-zinc-900">Seller Agreement</h2>
                            <p className="text-xs text-zinc-400">Please read and agree before listing</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-50 rounded-lg transition-colors">
                        <X className="h-4 w-4 text-zinc-400" />
                    </button>
                </div>

                {/* Agreement text */}
                <div className="p-6 max-h-72 overflow-y-auto">
                    <div className="bg-zinc-50 rounded-xl p-4 text-xs text-zinc-600 leading-relaxed space-y-3 font-mono">
                        <p className="font-bold text-zinc-900 text-sm">SELLER TERMS — FashaMarket</p>
                        <p><strong>1. COMMISSION</strong><br />
                            FashaMarket charges a {commissionRate}% commission on every successful sale.
                            You will receive {100 - commissionRate}% of the listed price after delivery is confirmed.</p>
                        <p><strong>2. PRODUCT LISTING</strong><br />
                            You confirm that the product is yours to sell, matches the description and photos, and is in the condition stated.</p>
                        <p><strong>3. SHIPPING OBLIGATION</strong><br />
                            Once payment is confirmed by admin, you must ship within 2 business days.</p>
                        <p><strong>4. PROHIBITED ITEMS</strong><br />
                            Stolen goods, counterfeit items, illegal products, and weapons are strictly prohibited.</p>
                        <p><strong>5. DISPUTES</strong><br />
                            FashaMarket admin is the final arbitrator in all buyer-seller disputes.</p>
                        <p><strong>6. PAYOUT</strong><br />
                            Seller payout is processed after buyer confirms delivery. Payment via Mobile Money within 48 hours.</p>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="px-6 pb-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div
                            onClick={() => setChecked(!checked)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checked ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300 group-hover:border-zinc-500'
                                }`}
                        >
                            {checked && <CheckCircle className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <span className="text-sm text-zinc-600 leading-relaxed">
                            I have read and agree to the FashaMarket Seller Terms. I understand that <strong>{commissionRate}%</strong> commission will be deducted from every sale.
                        </span>
                    </label>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 border border-zinc-200 text-zinc-600 font-semibold rounded-xl hover:bg-zinc-50 transition-all text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAgree}
                        disabled={!checked}
                        className="flex-1 py-2.5 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Agree & Continue
                    </button>
                </div>
            </div>
        </div>
    )
}