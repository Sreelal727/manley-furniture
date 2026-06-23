import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        {/* Additional module routes will be added here once screenshots are provided. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
