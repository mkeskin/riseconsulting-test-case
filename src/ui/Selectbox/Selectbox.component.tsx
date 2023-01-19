import type { RefObject, SelectHTMLAttributes } from 'react'
import {
  useId,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react'
import cx from 'clsx'

import styles from './Selectbox.module.scss'

type Option = {
  value: string | number
  text: string
  selected?: boolean
}

export type SelectboxProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'hidden'
> & {
  label?: string
  options?: Option[]
}

const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(
  (
    {
      id: idProp,
      label,
      options,
      className,
      placeholder,
      multiple,
      ...rest
    }: SelectboxProps,
    ref
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = idProp || useId()

    const containerRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>
    const selectRef =
      useRef<HTMLSelectElement>() as RefObject<HTMLSelectElement>

    const [opened, open] = useState(false)
    const [selecteds, setSelecteds] = useState(
      options.filter(({ selected }) => selected)
    )

    useEffect(() => {
      if (selecteds.length === 0) {
        setSelecteds(Array.from(selectRef.current.selectedOptions))
      }
    }, [selectRef?.current?.selectedOptions])

    const setSelectOption = (index: number) => {
      const select = selectRef.current

      const opts = select?.options
      if (!opts) return

      const item = opts[index]
      if (!item) return

      if (!multiple) {
        for (let i = 0; i < opts.length; i++) {
          if (i == index) continue
          opts[i].removeAttribute('selected')
        }
      }

      if (item.hasAttribute('selected')) {
        item.removeAttribute('selected')
      } else {
        item.setAttribute('selected', 'selected')
      }

      setSelecteds(Array.from(selectRef.current.selectedOptions))

      const changeEvent = new Event('change', { bubbles: true })
      selectRef.current.dispatchEvent(changeEvent)

      if (!multiple) {
        open(false)
      }
    }

    const onClickHandler = (option: Option, index: number) => {
      setSelectOption(index)
    }

    useEffect(() => {
      const clickOutsideHandler = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node | null)
        ) {
          open(false)
        }
      }

      document.addEventListener('mousedown', clickOutsideHandler)
      return () => {
        document.removeEventListener('mousedown', clickOutsideHandler)
      }
    }, [containerRef])

    useImperativeHandle(ref, () => selectRef.current!)

    return (
      <div
        ref={containerRef}
        className={cx(styles.selectbox, className, {
          [styles.opened]: opened,
        })}
      >
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <select ref={selectRef} multiple={multiple} hidden {...rest}>
          {options?.map(({ text, value, selected }, i) => (
            <option value={value} key={i} selected={selected}>
              {text}
            </option>
          ))}
        </select>
        <div
          className={styles.input}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()

            open(!opened)
          }}
        >
          <span
            className={cx({
              [styles.placeholder]: selecteds.length === 0,
            })}
          >
            {selecteds.length > 0
              ? selecteds.map(({ text }) => text).join(', ')
              : placeholder || <>&nbsp;</>}
          </span>
          <svg
            width="9"
            height="6"
            viewBox="0 0 6 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L3 3L5 1" stroke="#01083A" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.menu} tabIndex={0}>
          <ul>
            {options?.map((option, i) => (
              <li
                className={cx({
                  [styles.selected]: selecteds.find(
                    ({ value }) => option.value === value
                  ),
                })}
                onClick={(event) => {
                  event.preventDefault()

                  onClickHandler(option, i)
                }}
                key={i}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
)

Selectbox.displayName = 'Selectbox'

export default Selectbox
