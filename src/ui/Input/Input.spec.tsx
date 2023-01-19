import { fireEvent, render, waitFor } from '@testing-library/react'

import Input from './Input.component'

describe('<Input>', () => {
  it('Test the label text', () => {
    const { getByLabelText } = render(<Input label="Test Field" />)

    const label = getByLabelText('Test Field')
    expect(label).toBeInTheDocument()
  })

  it('Test the value attribute', async () => {
    const { getByPlaceholderText } = render(<Input placeholder="Input" />)

    const form = getByPlaceholderText('Input')

    fireEvent.input(form, {
      target: {
        value: 'test@example.com',
      },
    })

    await waitFor(() => expect(form).toHaveValue('test@example.com'))
  })
})
