import React from 'react'
import { useTheme } from 'styled-components'

import {
  Input,
  InputContainer,
  InputIconContainer
} from './custom-input.styles'

const CustomInput = ({ iconSize, Icon, ...props }) => {
  const theme = useTheme()

  return (
    <InputContainer>
      <InputIconContainer>
        {Icon ? (
          <Icon color={theme.form.field.icon} size={iconSize || 24} />
        ) : (
          ''
        )}
      </InputIconContainer>
      <Input {...props} Icon={Icon} />
    </InputContainer>
  )
}

export default CustomInput
