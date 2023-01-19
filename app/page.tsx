import ExampleData from '@components/ExampleData'
import NewJobForm from '@components/NewJobForm'
import JobListTable from '@components/JobListTable'

export default function Page() {
  return (
    <>
      <ExampleData />

      <div className="my-4">
        <NewJobForm />
      </div>

      <div className="my-4">
        <JobListTable />
      </div>
    </>
  )
}
