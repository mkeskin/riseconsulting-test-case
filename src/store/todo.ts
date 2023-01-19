import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { apiService } from '@utils/fetch'
import store from '@utils/store'

export type JobPriority = 'urgent' | 'regular' | 'trivial'

export type Job = {
  actions: JSX.Element
  id: string
  name: string
  priority: JobPriority
}

type PriorityItem = {
  key: Lowercase<JobPriority>
  name: Capitalize<JobPriority>
}

export interface TodoStore {
  job?: Job
  jobs: Job[]
  priorities: PriorityItem[]
  getJob?: () => Promise<Job>
  getJobs: () => Promise<Job[]>
  setJobs: (data: Job[]) => void
  getPriorities: () => Promise<PriorityItem[]>
}

let priorities: PriorityItem[] = []

const useStore = create<TodoStore>((set, _) => ({
  job: undefined,
  jobs: [],
  priorities: [],
  getJob: () => {
    throw new Error('This method has not yet been implemented.')
  },
  getJobs: async () => {
    const data = store.get('jobs', []) as Job[]
    set(() => ({ jobs: data }))

    return data
  },
  setJobs: (data: Job[]) => {
    store.set('jobs', data)
    set(() => ({ jobs: data }))
  },
  getPriorities: async () => {
    if (priorities.length === 0) {
      priorities = (await apiService.get()) as PriorityItem[]
    }

    const data = priorities

    set(() => ({ priorities: data }))
    return data
  },
}))

export default useStore
