import ExampleData from '@components/ExampleData'
import JobListTable from '@components/JobListTable'

export default function Page() {
  return (
    <>
      <ExampleData />

      <div className="my-4">
        <JobListTable />
      </div>
    </>
  )
}
