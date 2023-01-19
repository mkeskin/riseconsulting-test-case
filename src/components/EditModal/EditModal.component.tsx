import { useState, createElement } from 'react'

import styles from './EditModal.module.scss'
import { useModal as useModalHook, ModalProps } from '@ui/Modal'
import Button from '@ui/Button'
import Input from '@ui/Input'
import Selectbox from '@ui/Selectbox'
import useTodoStore from '@store/todo'

export type EditModalProps = ModalProps & {
  name: string
  priority: string
  onSubmit: (props: { priority: string }) => void
}

export const useModal = () => {
  const { priorities } = useTodoStore(({ priorities }) => ({
    priorities,
  }))

  const { modalState, showModal, hideModal, toggleModal, Modal } =
    useModalHook()
  const { show } = modalState

  const EditModal = (props: EditModalProps) => {
    const { name, priority, onSubmit, ...rest } = props
    const [priorityState, setPriorityState] = useState<string>()

    const container = (
      <>
        <div className="my-4">
          <Input label="Job Name" value={name} disabled readOnly />
        </div>
        <div className="my-4">
          <Selectbox
            label="Job Priority"
            defaultValue={priority}
            options={priorities.map(({ key, name }) => ({
              value: key,
              text: name,
              // selected: key === priority,
            }))}
            onChange={({ target: { value } }) => {
              setPriorityState(value)
            }}
          />
        </div>
        <div className="flex w-full my-4">
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
              onSubmit({ priority: priorityState })
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
    Modal: EditModal,
  }
}
