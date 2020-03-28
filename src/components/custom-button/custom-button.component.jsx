import React from 'react'
import { Button, Spinner } from './custom-button.styles'

const CustomButton = ({ children, loading, ...props }) => {
  return <Button {...props}>{loading ? <Spinner /> : children}</Button>
}

export default CustomButton
