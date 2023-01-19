'use client'
import type { HTMLAttributes, ReactNode, ReactElement, MouseEvent } from 'react'
import { useState } from 'react'
import cx from 'clsx'

import styles from './Table.module.scss'
import ChevronDownIcon from '@vectors/ChevronDownIcon'

type TableHead = {
  id: string
  title: string
  sortable?: boolean
  srOnly?: boolean
  wrapper?: (content: ReactNode) => ReactElement
  className?: string
  onClick?: <T = Element>(
    event?: MouseEvent<T, globalThis.MouseEvent>,
    asc?: boolean
  ) => void
}

export type TableProps = HTMLAttributes<HTMLTableElement> & {
  sorted?: {
    key: string
    isDesc: boolean
  }
  columns: TableHead[]
  data: {
    [key: string]: ReactNode
  }[]
}

const Table = ({
  sorted: sortedProp,
  columns,
  data,
  className,
}: TableProps) => {
  const [sorted, setSorted] = useState(sortedProp)

  return (
    <div className={styles.outside}>
      <table className={cx(className, styles.table)}>
        <thead>
          <tr>
            {columns.map(
              ({
                id,
                title,
                sortable = false,
                srOnly = false,
                className,
                onClick,
              }) => (
                <th
                  scope="col"
                  className={cx(className, {
                    [styles['sr-only']]: srOnly,
                  })}
                  key={id}
                >
                  {srOnly ? (
                    <span className="sr-only">{title}</span>
                  ) : sortable ? (
                    <a
                      href="#"
                      className="group inline-flex"
                      onClick={(event) => {
                        event.preventDefault()

                        const isDesc =
                          sorted === undefined
                            ? false
                            : sorted.key === id
                            ? !sorted.isDesc
                            : false
                        onClick(event, !isDesc)
                        setSorted({ key: id, isDesc })
                      }}
                    >
                      {title}
                      <span
                        className={cx(
                          styles['sort-icon'],
                          {
                            [styles.sorted]: sorted?.key === id,
                          },
                          'group-hover:visible'
                        )}
                      >
                        <ChevronDownIcon
                          className={cx(styles.icon, {
                            'rotate-180': sorted?.isDesc || false,
                          })}
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  ) : (
                    title
                  )}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, i) => (
            <tr
              className={cx({
                'bg-stone-50': i % 2 === 0,
              })}
              key={`tr-${i + 1}`}
            >
              {columns.map(({ id, wrapper }) => (
                <td key={`col-${id}`}>
                  {wrapper ? wrapper(item[id]) : item[id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
