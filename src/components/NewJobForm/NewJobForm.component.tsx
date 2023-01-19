'use client'
import type { MouseEvent } from 'react'
import { useEffect } from 'react'

import styles from './NewJobForm.module.scss'
import Button from '@ui/Button'
import Input from '@ui/Input'
import Selectbox from '@ui/Selectbox'
import AddIcon from '@vectors/AddIcon'
import { random } from '@utils/hash'
import { useReducerState } from '@utils/hooks'
import useTodoStore from '@store/todo'

const emptyState = {
  id: '',
  name: '',
  priority: '',
}

export type NewJobFormProps = {
  maxLength?: number
}

const NewJobForm = ({ maxLength = 255 }: NewJobFormProps) => {
  const { priorities, getPriorities, jobs, setJobs } = useTodoStore(
    ({ priorities, getPriorities, jobs, setJobs }) => ({
      priorities,
      getPriorities,
      jobs,
      setJobs,
    })
  )

  useEffect(() => {
    getPriorities()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [state, setState] = useReducerState(emptyState)
  const resetState = () => setState(emptyState)

  const onSubmitHandler = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault()

    const j = [
      ...jobs,
      {
        ...state,
        id: random(),
        name: state.name.trim().slice(0, maxLength),
      },
    ]

    setJobs(j as typeof jobs)
    resetState()
  }

  return (
    <>
      <h3 className="text-lg tracking-tight font-bold py-2 sm:py-3 sm:mb-2 sm:text-xl">
        Create a New Job
      </h3>
      <div className="grid sm:flex gap-4 items-end">
        <div className="sm:w-full">
          <Input
            label="Job Name"
            value={state.name}
            maxLength={maxLength}
            onKeyDown={(event) => {
              const regexp = /^[-\w\s]+$/gi // Allow only alphanumeric characters
              if (!regexp.test(event.key)) {
                event.preventDefault()
              }
            }}
            onChange={({ target: { value } }) => {
              setState({
                name: value,
              })
            }}
          />
        </div>
        <div className="sm:w-1/4">
          <Selectbox
            label="Job Priority"
            options={priorities.map(({ key, name }) => ({
              value: key,
              text: name,
            }))}
            onChange={({ target: { value } }) => {
              setState({
                priority: value,
              })
            }}
          />
        </div>
        <div className="sm:w-auto">
          <Button onClick={onSubmitHandler}>
            <AddIcon className="mr-1 w-6 h-6" />
            Create
          </Button>
        </div>
      </div>
    </>
  )
}

export default NewJobForm
