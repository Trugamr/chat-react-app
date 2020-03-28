import React from 'react'

import { FormErrorContainer, Heading, Error } from './form.error.styles'

const FormError = ({ errors = [{ message: 'some error occured' }] }) => {
  return (
    <FormErrorContainer>
      <Heading>Error</Heading>
      {errors.map((error, i) => (
        <Error key={i}>{error.message}</Error>
      ))}
    </FormErrorContainer>
  )
}

export default FormError
