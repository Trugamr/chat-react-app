import React from 'react'

import { FormErrorContainer, Heading, Error } from './form.error.styles'

const FormError = ({ error = 'some error occured' }) => {
  return (
    <FormErrorContainer>
      <Heading>Error</Heading>
      <Error>{error}</Error>
    </FormErrorContainer>
  )
}

export default FormError
