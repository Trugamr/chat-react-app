//--COLORS--//

export const colors = {
  red: '#FF073A',
  lightRed: 'rgba(255, 7, 58, 0.12)',
  green: '#28A745',
  lightGreen: 'rgba(40, 167, 69, 0.12)',
  blue: '#007BFF',
  lightBlue: 'rgba(0, 122, 255, 0.12)',
  gray: '#6C757D',
  littleLightGray: 'rgba(108, 117, 125, 0.5)',
  lightGray: 'rgba(108, 117, 125, 0.12)',
  black: '#3E3E3E',
  white: '#FFFFFF',
  lightest: '#F9F9FB'
}

//--THEMES--//

//--LIGHT--//
export const light = {
  form: {
    bg: colors.white,
    headingText: colors.gray,
    text: colors.gray,
    link: {
      bg: colors.lightBlue,
      text: colors.blue
    },
    field: {
      icon: colors.gray,
      text: colors.gray,
      bg: colors.lightest,
      placeholder: colors.littleLightGray
    }
  },
  button: {
    text: colors.white,
    bg: colors.blue
  }
}

//--DARK--//
export const dark = {
  form: {
    bg: colors.white,
    headingText: colors.gray,
    text: colors.gray,
    link: {
      bg: colors.lightBlue,
      text: colors.blue
    },
    field: {
      icon: colors.gray,
      text: colors.gray,
      bg: colors.lightest,
      placeholder: colors.littleLightGray
    }
  },
  button: {
    text: colors.white,
    bg: colors.blue
  }
}

//--DEFAULT EXPORT--//
export default {
  light,
  dark
}
