import PageContainer from '@/components/PageContainer'

export default function Dashboard() {
  return (
    <PageContainer
      title="Dashboard"
      description="Overview of Manley Furniture operations."
    >
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">
          Dashboard widgets will be built here to match the reference screenshots.
        </p>
      </div>
    </PageContainer>
  )
}
