import { Outlet } from 'react-router-dom'
import IconRail from './IconRail'
import TopHeader from './TopHeader'

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <IconRail />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
