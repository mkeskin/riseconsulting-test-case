import { useState } from 'react'
import { render, fireEvent, renderHook } from '@testing-library/react'

import Table from './Table.component'
import { sort } from '@utils/array'

describe('<Table>', () => {
  const cols = 4
  const rows = 10

  const columns = [...Array(cols)].map((_, i) => ({
    id: `col${i}`,
    title: `Col ${i}`,
    sortable: i + 1 < cols,
    wrapper:
      i + 1 == cols
        ? (content: string) => (
            <span data-testid="test-wrapped-column">{content}</span>
          )
        : undefined,
    onClick: (__: any, asc: boolean) => {},
  }))

  const data = [...Array(rows)].map((_, i) =>
    columns.reduce((obj, curr, j) => {
      const item = {
        [curr.id]: `Value of Row: ${i} Col: ${j}`,
      }

      return { ...obj, ...item }
    }, {})
  )

  it('Check the column heads', () => {
    const { getAllByText } = render(<Table columns={columns} data={data} />)

    const ths = getAllByText(/Col\s[0-9]/i)
    expect(ths).toHaveLength(cols)
  })

  it('Check the rows', () => {
    const { getAllByTestId } = render(<Table columns={columns} data={data} />)

    const spans = getAllByTestId('test-wrapped-column')
    expect(spans).toHaveLength(rows)
  })

  it('Check the sorting', () => {
    const { result } = renderHook(() => useState(data))
    const [lines, setLines] = result.current

    const sortableColumns = columns.map((column) => {
      column.sortable = true
      column.onClick = (_, isAsc) => {
        const sorted = sort(lines, column.id as keyof any[], isAsc)
        setLines(sorted)
      }

      return column
    })

    const { getByText } = render(
      <Table columns={sortableColumns} data={data} />
    )
    const idx = Math.floor(Math.random() * cols)
    const th = getByText(`Col ${idx}`)

    fireEvent.click(th)
    fireEvent.click(th)

    const first = lines[0]

    expect(first[`col${idx}`]).toEqual(`Value of Row: 9 Col: ${idx}`)
  })
})
