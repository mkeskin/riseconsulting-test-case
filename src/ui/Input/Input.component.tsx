import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import cx from 'clsx'

import styles from './Input.module.scss'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = ({ label, id: idProp, className, ...rest }: InputProps) => {
  const id = idProp || useId()

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={cx(className, styles.input)} {...rest} />
    </div>
  )
}

export default Input
