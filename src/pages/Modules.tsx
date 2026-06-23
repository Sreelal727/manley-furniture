import Placeholder from '@/components/Placeholder'

const wrap = (title: string, note: string) => () => (
  <div className="p-4 sm:p-6">
    <Placeholder title={title} note={note} />
  </div>
)

export const Tasks = wrap('Tasks', 'Task board and to-dos across the team.')
export const Reports = wrap('Reports', 'Sales, HR and operations analytics.')
export const Settings = wrap('Settings', 'Company, users and system configuration.')
