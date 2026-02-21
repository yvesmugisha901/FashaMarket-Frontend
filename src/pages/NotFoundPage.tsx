import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-gray-200">404</h1>
            <p className="text-xl font-semibold text-gray-900 mt-4">Page not found</p>
            <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn-primary mt-6">
                Back to Home
            </Link>
        </div>
    )
}