import { createElement } from 'react'

import styles from './DeleteModal.module.scss'
import { useModal as useModalHook, ModalProps } from '@ui/Modal'
import Button from '@ui/Button'

export type DeleteModalProps = ModalProps & {
  onSubmit: () => void
}

export const useModal = () => {
  const { modalState, showModal, hideModal, toggleModal, Modal } =
    useModalHook()
  const { show } = modalState

  const DeleteModal = (props: DeleteModalProps) => {
    const { onSubmit, ...rest } = props

    const container = (
      <>
        <div className="my-4">
          <h3 className="text-lg font-bold tracking-tight text-center">
            Are you sure you want to delete it?
          </h3>
        </div>
        <div className="flex w-full">
          <Button
            className="w-full justify-center mx-4"
            variant="light"
            onClick={() => {
              hideModal()
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full justify-center mx-4"
            variant="danger"
            onClick={() => {
              onSubmit()
              hideModal()
            }}
          >
            Save
          </Button>
        </div>
      </>
    )

    return createElement(
      Modal,
      {
        show,
        onClose: hideModal,

        ...rest,
      },
      container
    )
  }

  return {
    modalState,
    showModal,
    hideModal,
    toggleModal,
    Modal: DeleteModal,
  }
}
