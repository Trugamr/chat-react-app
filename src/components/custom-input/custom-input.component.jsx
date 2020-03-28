import React from 'react'
import { useTheme } from 'styled-components'

import {
  Input,
  InputContainer,
  InputIconContainer
} from './custom-input.styles'

const CustomInput = ({ iconSize, Icon, error, ...props }) => {
  const theme = useTheme()

  return (
    <InputContainer>
      <InputIconContainer>
        {Icon ? (
          <Icon
            color={error ? theme.form.error.placeholder : theme.form.field.icon}
            size={iconSize || 24}
          />
        ) : (
          ''
        )}
      </InputIconContainer>
      <Input {...props} error={error} Icon={Icon} />
    </InputContainer>
  )
}

export default CustomInput
