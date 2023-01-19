import type { HTMLAttributes } from 'react'
import cx from 'clsx'

import styles from './Header.module.scss'
import Logo from '@vectors/Logo'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {}

const HeaderProps = ({ className }: HeaderProps) => {
  return (
    <div className={cx(className, styles.header)}>
      <Logo height={32} />
    </div>
  )
}

export default HeaderProps
