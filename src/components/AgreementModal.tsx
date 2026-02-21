import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'

interface Props {
    agreementText: string
    onAccept: () => void
    onDecline: () => void
    isLoading?: boolean
}

export default function AgreementModal({ agreementText, onAccept, onDecline, isLoading }: Props) {
    const [checked, setChecked] = useState(false)

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="card max-w-lg w-full p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-50 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">Purchase Agreement</h2>
                        <p className="text-sm text-gray-500">Please read before confirming your order</p>
                    </div>
                </div>

                {/* Agreement text */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line">
                    {agreementText}
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="mt-0.5 h-4 w-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                    />
                    <span className="text-sm text-gray-700">
                        I have read and agree to the terms of this purchase agreement, including the product condition, return policy, and delivery timeline.
                    </span>
                </label>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                    <button onClick={onDecline} className="btn-secondary flex-1">
                        Cancel
                    </button>
                    <button
                        onClick={onAccept}
                        disabled={!checked || isLoading}
                        className="btn-primary flex-1"
                    >
                        {isLoading ? 'Confirming...' : 'Confirm Order'}
                    </button>
                </div>
            </div>
        </div>
    )
}