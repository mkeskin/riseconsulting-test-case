import type { ButtonHTMLAttributes } from 'react'
import cx from 'clsx'

import styles from './Button.module.scss'

type ButtonColorVariant = 'primary' | 'danger' | 'light'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonColorVariant
}

const Button = ({
  variant = 'primary',
  children,
  className,
  ...rest
}: ButtonProps) => {
  const variants: {
    [key in ButtonColorVariant]: string
  } = {
    primary: styles.primary,
    danger: styles.danger,
    light: styles.light,
  }

  return (
    <button
      className={cx(className, styles.button, variants[variant])}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
