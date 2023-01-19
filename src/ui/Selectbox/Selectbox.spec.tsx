import { useState } from 'react'
import { render, fireEvent, renderHook } from '@testing-library/react'

import Selectbox from './Selectbox.component'

describe('<Selectbox>', () => {
  const options = [
    {
      value: 'item1',
      text: 'Item 1',
    },
    {
      value: 'item2',
      text: 'Item 2',
    },
    {
      value: 'item3',
      text: 'Item 3',
    },
  ]

  it('Test the selection of single option', () => {
    const { result } = renderHook(() => useState(''))
    const [_, setSelection] = result.current

    const { container } = render(
      <Selectbox
        options={options}
        onChange={({ target: { value } }) => {
          setSelection(value)
        }}
      />
    )

    const li = container.getElementsByTagName('li')
    fireEvent.click(li[1])

    expect(result.current[0]).toEqual('item2')
  })

  it('Test the selection of multiple options', () => {
    const { result } = renderHook(() => useState([]))
    const [_, setSelections] = result.current

    const { container } = render(
      <Selectbox
        multiple
        options={options}
        onChange={({ target: { selectedOptions } }) => {
          const values = Array.from(selectedOptions).map(({ value }) => value)
          setSelections(values)
        }}
      />
    )

    const li = container.getElementsByTagName('li')
    fireEvent.click(li[0])
    fireEvent.click(li[1])

    expect(result.current[0]).toEqual(['item1', 'item2'])
  })
})
