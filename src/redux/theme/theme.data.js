//--COLORS--//

export const colors = {
  red: '#FF073A',
  littleLightRed: 'rgba(255, 7, 58, 0.5)',
  lightRed: 'rgba(255, 7, 58, 0.12)',
  green: '#28A745',
  pastelGreen: '#41F56A',
  lightGreen: 'rgba(40, 167, 69, 0.12)',
  blue: '#007BFF',
  lightBlue: 'rgba(0, 122, 255, 0.12)',
  gray: '#6C757D',
  littleLightGray: 'rgba(108, 117, 125, 0.5)',
  lightGray: 'rgba(108, 117, 125, 0.12)',
  black: '#3E3E3E',
  white: '#FFFFFF',
  lightWhite: 'rgba(255, 255, 255, 0.2)',
  lightest: '#F9F9FB',
  yellow: '#F7D154',
  lightYellow: 'rgba(247, 209, 84, 0.12)'
}

//--THEMES--//

//--LIGHT--//
export const light = {
  bg: colors.lightest,
  text: colors.gray,
  sidePanel: {
    bg: colors.white
  },
  userStatusCard: {
    bg: colors.blue,
    text: colors.white,
    subText: colors.lightest,
    icon: colors.lightest,
    optionBg: colors.lightWhite,
    statusColors: {
      online: colors.pastelGreen,
      offline: colors.red,
      away: colors.yellow
    }
  },
  channels: {
    bg: colors.lightBlue,
    text: colors.blue,
    hover: colors.lightBlue,
    icon: colors.blue,
    modal: {
      bg: colors.lightBlue,
      modalBg: colors.white,
      textPrimary: colors.blue,
      textSecondary: colors.white,
      buttonPrimary: colors.blue,
      buttonSeconday: colors.white
    }
  },
  spinner: {
    bg: colors.lightest,
    text: colors.blue,
    loaderFg: colors.blue,
    loaderBg: colors.lightBlue
  },
  form: {
    bg: colors.white,
    headingText: colors.gray,
    text: colors.gray,
    field: {
      icon: colors.gray,
      text: colors.gray,
      bg: colors.lightest,
      placeholder: colors.littleLightGray,
      focusBorder: colors.blue
    },
    error: {
      bg: colors.lightRed,
      text: colors.red,
      placeholder: colors.littleLightRed
    }
  },
  button: {
    text: colors.white,
    bg: colors.blue,
    bgDisabled: colors.lightBlue
  },
  link: {
    bg: colors.lightBlue,
    text: colors.blue
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
