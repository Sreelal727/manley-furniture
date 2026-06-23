import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="text-5xl font-bold text-brand-600">404</div>
      <p className="mt-2 text-gray-500">This page doesn’t exist yet.</p>
      <Link
        to="/"
        className="mt-4 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
