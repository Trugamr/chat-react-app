import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ThemeProvider } from 'styled-components'
import { selectCurrentTheme } from '../../redux/theme/theme.selectors'

const CustomThemeProvider = ({ children, currentTheme, ...props }) => (
  <ThemeProvider theme={currentTheme} {...props}>
    {children}
  </ThemeProvider>
)

const mapStateToProps = createStructuredSelector({
  currentTheme: selectCurrentTheme
})

export default connect(mapStateToProps)(CustomThemeProvider)
