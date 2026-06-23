import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sofa, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@manleyfurniture.in')
  const [password, setPassword] = useState('demo1234')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Dummy login — no real auth, just enter the app.
    navigate('/')
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-brand-600 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-brand-600">
            M
          </div>
          <span className="text-xl font-semibold">Manley Furniture</span>
        </div>

        <div>
          <Sofa className="mb-6 h-16 w-16 text-brand-200" />
          <h1 className="text-4xl font-bold leading-tight">
            Crafting comfort,
            <br />
            one sofa at a time.
          </h1>
          <p className="mt-4 max-w-md text-brand-100">
            Kerala's trusted maker of sofas, recliners and bespoke home & office
            furniture. Sign in to manage sales, customers and your team.
          </p>
        </div>

        <p className="text-sm text-brand-200">© 2026 Manley Furniture, Kerala · ERP</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-extrabold text-white">
                M
              </div>
              <span className="text-lg font-semibold text-gray-800">Manley Furniture</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to your ERP account.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className="font-medium text-brand-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 rounded-lg bg-brand-50 px-3 py-2 text-center text-xs text-brand-700">
            Demo login — credentials are pre-filled, just click <strong>Sign In</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
