import type { ReactNode } from 'react'
import { useState, createElement } from 'react'
import cx from 'clsx'

import styles from './Modal.module.scss'

export type ModalProps = {
  show?: boolean
  onClose?: () => void
  children?: ReactNode
  className?: string
}

const ModalComponent = ({ show, onClose, children, className }: ModalProps) => {
  return (
    <div
      className={cx(className, styles.modal)}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.backdrop}></div>

      <div className={styles.container}>
        <div className={styles.dialog} role="document">
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const modalState = { show: modalOpen }
  const showModal = () => setModalOpen(true)
  const hideModal = () => setModalOpen(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  const Modal = (props: ModalProps) =>
    props.show &&
    createElement(ModalComponent, {
      show: modalOpen,
      onClose: hideModal,
      ...props,
    })

  return { modalState, showModal, hideModal, toggleModal, Modal }
}
