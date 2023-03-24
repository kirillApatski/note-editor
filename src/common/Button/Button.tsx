import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}

const Button: React.FC<ButtonPropsType> = (
  {
    className,
    ...restProps
  }
) => {
  const finalClassName = className ? className : s.button

  return (
    <button
      className={finalClassName}
      {...restProps}
    />
  )
}

export default Button
