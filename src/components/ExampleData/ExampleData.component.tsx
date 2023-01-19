'use client'
import { useId, useEffect } from 'react'

import styles from './ExampleData.module.scss'
import store from '@utils/store'

export type ExampleDataProps = {}

const ExampleData = () => {
  const examples = [
    {
      id: useId(),
      name: 'Minim dolore veniam elit ut est ex pariatur cillum fugiat fugiat irure ullamco.',
      priority: '3-urgent',
    },
    {
      id: useId(),
      name: 'Excepteur proident reprehenderit culpa commodo nulla irure pariatur fugiat.',
      priority: '2-regular',
    },
    {
      id: useId(),
      name: 'Sit tempor ut enim qui do nulla officia aute ut ex consequat commodo elit exercitation.',
      priority: '1-trivial',
    },
  ]

  useEffect(() => {
    const data = store.get('jobs', undefined)

    if (!data) {
      store.set('jobs', examples)
    }
  }, [])

  return <></>
}

export default ExampleData
