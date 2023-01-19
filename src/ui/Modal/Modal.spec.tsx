import { render, renderHook } from '@testing-library/react'

import { useModal } from './Modal.component'

describe('<Modal>', () => {
  const { result } = renderHook(() => useModal())
  const { Modal } = result.current

  it('Check the content text', () => {
    const { getByTestId } = render(
      <Modal show={true}>
        <p data-testid="test-paragraph">This area for modal content.</p>
      </Modal>
    )

    const paragraph = getByTestId('test-paragraph')
    expect(paragraph).toHaveTextContent('modal content')
  })
})
