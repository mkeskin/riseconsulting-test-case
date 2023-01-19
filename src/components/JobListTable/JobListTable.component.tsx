'use client'
import type { ReactNode, MouseEvent, ReactElement } from 'react'
import { useEffect, useState, useMemo } from 'react'
import cx from 'clsx'

import styles from './JobListTable.module.scss'
import Table from '@ui/Table'
import Button from '@ui/Button'
import Input from '@ui/Input'
import Selectbox from '@ui/Selectbox'
import { useModal as useEditModal } from '@components/EditModal'
import { useModal as useDeleteModal } from '@components/DeleteModal'
import EditIcon from '@vectors/EditIcon'
import DeleteIcon from '@vectors/DeleteIcon'
import { sort } from '@utils/array'
import debounce from '@utils/debounce'
import { useReducerState } from '@utils/hooks'
import useTodoStore, { Job, JobPriority } from '@store/todo'

export type JobListTableProps = {}

type TableFilterProps = {
  onFilter: (props: { query: string; priorities: string[] }) => void
}

const TableFilter = ({ onFilter }: TableFilterProps) => {
  const { priorities } = useTodoStore(({ priorities }) => ({
    priorities,
  }))

  const [state, setState] = useReducerState({
    query: '',
    priorities: [],
  })

  const onChange = debounce((newState: typeof state) => {
    setState(newState)
    onFilter(newState)
  })

  return (
    <div className="flex gap-4 bg-blue-50 py-2.5 px-3 border-b border-b-stone-200">
      <div className="w-1/2 sm:w-3/4">
        <Input
          placeholder="Job Name"
          onChange={({ target: { value } }) => {
            const newState = {
              ...state,
              query: value,
            }

            onChange(newState)
          }}
        />
      </div>
      <div className="w-1/2 sm:w-1/4">
        <Selectbox
          multiple
          options={priorities.map(({ key, name }) => ({
            value: key,
            text: name,
          }))}
          placeholder="Priority (all)"
          onChange={({ target: { selectedOptions } }) => {
            const newState = {
              ...state,
              priorities: Array.from(selectedOptions).map(({ value }) => value),
            }

            setState(newState)
            onFilter(newState)
          }}
        />
      </div>
    </div>
  )
}

const JobListTable = ({}: JobListTableProps) => {
  const { Modal: EditModal, showModal: showEditModal } = useEditModal()
  const { Modal: DeleteModal, showModal: showDeleteModal } = useDeleteModal()

  const { priorities, jobs, getJobs, setJobs } = useTodoStore(
    ({ priorities, jobs, getJobs, setJobs }) => ({
      priorities,
      jobs,
      getJobs,
      setJobs,
    })
  )

  const [data, setData] = useState<Job[]>([])
  const [job, setJob] = useState<Job>()

  useEffect(() => {
    const loadJobs = async () => {
      await getJobs()
    }

    loadJobs()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let items = [...JSON.parse(JSON.stringify(jobs))] as typeof jobs
    items = sort(items, 'priority' as keyof typeof data, false)
    setData(items)
  }, [jobs])

  const colors = useMemo(
    () => ({
      '3-urgent': 'bg-pink-600',
      '2-regular': 'bg-amber-400',
      '1-trivial': 'bg-blue-500',
    }),
    []
  )

  const onSort = (key: string, asc: boolean) => {
    const sorted = sort(data, key as keyof typeof data, asc)
    setData(sorted)
  }

  const columns = useMemo(
    () => [
      {
        id: 'name',
        title: 'Name',
        sortable: true,
        className: 'w-full',
        wrapper: (content: string) => (
          <span className="tracking-tight">{content}</span>
        ),
        onClick: (
          _: MouseEvent<unknown, globalThis.MouseEvent>,
          asc: boolean
        ) => onSort('name', asc),
      },
      {
        id: 'priority',
        title: 'Priority',
        sortable: true,
        wrapper: (content: string) => {
          const { name: display } =
            priorities.find(({ key }) => content === key) || {}

          return (
            <span
              className={cx(
                'cursor-default px-4 py-2 rounded text-xs text-white font-semibold tracking-tight capitalize',
                colors[content]
              )}
            >
              {display}
            </span>
          )
        },
        onClick: (
          _: MouseEvent<unknown, globalThis.MouseEvent>,
          asc: boolean
        ) => onSort('priority', asc),
      },
      {
        id: 'actions',
        title: 'Actions',
        className: '!text-center',
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, priorities, colors]
  )

  const rows = data.map((item: Job & { actions: ReactElement }) => {
    item.actions = (
      <div className="flex gap-2">
        <Button
          variant="light"
          className="!px-2.5"
          onClick={() => {
            setJob(item)
            showEditModal()
          }}
        >
          <EditIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="light"
          className="!px-2.5"
          onClick={() => {
            setJob(item)
            showDeleteModal()
          }}
        >
          <DeleteIcon className="w-5 h-5" />
        </Button>
      </div>
    )

    return item as { [key: string]: ReactNode }
  })

  return (
    <>
      <h3 className="text-lg tracking-tight font-bold py-2 lg:py-3 lg:mb-2 lg:text-xl">
        Job List
      </h3>
      <TableFilter
        onFilter={({ query, priorities }) => {
          const filtered = JSON.parse(JSON.stringify(jobs)).filter(
            ({ name, priority }) =>
              name.includes(query) &&
              (priorities.length > 0 ? priorities.indexOf(priority) > -1 : true)
          )

          setData(filtered)
        }}
      />
      <div className="overflow-x-auto">
        <Table
          sorted={{
            key: 'priority',
            isDesc: true,
          }}
          columns={columns}
          data={rows}
        />
      </div>
      <EditModal
        name={job?.name}
        priority={job?.priority}
        onSubmit={({ priority }) => {
          const newData = data.map(({ actions, ...rest }) => {
            if (job.id === rest.id) {
              rest.priority = priority as JobPriority
            }

            return rest
          }) as typeof data
          setJobs(newData)
        }}
      />
      <DeleteModal
        onSubmit={() => {
          const newData = data
            .filter(({ id }) => job.id !== id)
            .map(({ actions, ...rest }) => rest) as typeof data
          setJobs(newData)
        }}
      />
    </>
  )
}

export default JobListTable
