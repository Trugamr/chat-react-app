import React from 'react'
import { Link } from './custom-link.styles'

const CustomLink = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>
}

export default CustomLink
