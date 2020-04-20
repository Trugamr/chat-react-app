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
  littleLighterGray: 'rgba(108, 117, 125, 0.25)',
  lightGray: 'rgba(108, 117, 125, 0.12)',
  veryLightGray: 'rgba(108, 117, 125, 0.06)',
  black: '#3E3E3E',
  littleDarkerBlack: '#1E1E1E',
  darkerBlack: '#141414',
  white: '#FFFFFF',
  lightWhite: 'rgba(255, 255, 255, 0.6)',
  veryLightWhite: 'rgba(255, 255, 255, 0.2)',
  lightest: '#F9F9FB',
  yellow: '#FFC400',
  lightYellow: 'rgba(255, 196, 0, 0.12)'
}

//--THEMES--//

//--LIGHT--//
export const light = {
  name: 'light',
  bg: colors.lightest,
  text: colors.gray,
  scrollbar: {
    bg: colors.lightGray,
    fg: colors.littleLighterGray,
    fgHover: colors.littleLightGray
  },
  sidePanel: {
    bg: colors.white,
    shadow: colors.lightBlue,
    closeButton: {
      bg: colors.lightBlue,
      text: colors.blue
    }
  },
  message: {
    textPrimary: colors.black,
    textSecondary: colors.littleLightGray
  },
  messages: {
    bg: colors.white,
    placeholder: colors.littleLightGray
  },
  typingUsers: {
    itemBg: colors.veryLightGray,
    dot: colors.gray,
    text: colors.gray
  },
  messageInput: {
    bg: colors.white,
    attachFg: colors.gray,
    emojiBg: colors.lightYellow,
    sendBg: colors.lightBlue,
    sendFg: colors.blue,
    placeholder: colors.gray,
    text: colors.black,
    outline: colors.blue,
    errorBg: colors.lightRed,
    progress: colors.lightGreen
  },
  channelHeader: {
    bg: colors.white,
    text: colors.black,
    starIcon: colors.yellow,
    sidebarIcon: colors.blue,
    search: {
      text: colors.gray,
      placeholder: colors.littleLightGray,
      bg: colors.lightGray
    },
    status: {
      online: colors.green,
      offline: colors.red,
      away: colors.yellow
    }
  },
  userStatusCard: {
    bg: colors.blue,
    text: colors.white,
    subText: colors.lightest,
    icon: colors.lightest,
    optionBg: colors.veryLightWhite,
    statusColors: {
      online: colors.pastelGreen,
      offline: colors.red,
      away: colors.yellow
    },
    modal: {
      bg: colors.lightBlue,
      modalBg: colors.white,
      textPrimary: colors.blue,
      textSecondary: colors.white,
      buttonPrimary: colors.blue,
      buttonSeconday: colors.white
    }
  },
  starred: {
    bg: colors.lightYellow,
    text: colors.yellow,
    hover: colors.lightYellow,
    icon: colors.yellow
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
    },
    notificationsBg: colors.white,
    notificationsFg: colors.blue
  },
  directMessages: {
    bg: colors.lightBlue,
    text: colors.blue,
    hover: colors.lightBlue,
    icon: colors.blue,
    status: {
      online: colors.green,
      offline: colors.red,
      away: colors.yellow
    }
  },
  meta: {
    bg: colors.white,
    textPrimary: colors.black,
    textSecondary: colors.gray
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
  name: 'dark',
  bg: colors.littleDarkerBlack,
  text: colors.white,
  scrollbar: {
    bg: colors.lightGray,
    fg: colors.littleLighterGray,
    fgHover: colors.littleLightGray
  },
  sidePanel: {
    bg: colors.darkerBlack,
    shadow: colors.lightBlue,
    closeButton: {
      bg: colors.lightBlue,
      text: colors.blue
    }
  },
  message: {
    textPrimary: colors.white,
    textSecondary: colors.lightWhite
  },
  messages: {
    bg: colors.darkerBlack,
    placeholder: colors.lightWhite
  },
  typingUsers: {
    itemBg: colors.littleDarkerBlack,
    dot: colors.lightWhite,
    text: colors.lightWhite
  },
  messageInput: {
    bg: colors.darkerBlack,
    attachFg: colors.lightWhite,
    emojiBg: colors.lightYellow,
    sendBg: colors.lightBlue,
    sendFg: colors.blue,
    placeholder: colors.lightWhite,
    text: colors.white,
    outline: colors.blue,
    errorBg: colors.lightRed,
    progress: colors.lightGreen
  },
  channelHeader: {
    bg: colors.darkerBlack,
    text: colors.white,
    starIcon: colors.yellow,
    sidebarIcon: colors.blue,
    search: {
      text: colors.white,
      placeholder: colors.littleWhite,
      bg: colors.littleDarkerBlack
    },
    status: {
      online: colors.green,
      offline: colors.red,
      away: colors.yellow
    }
  },
  userStatusCard: {
    bg: colors.blue,
    text: colors.white,
    subText: colors.lightest,
    icon: colors.lightest,
    optionBg: colors.veryLightWhite,
    statusColors: {
      online: colors.pastelGreen,
      offline: colors.red,
      away: colors.yellow
    },
    modal: {
      bg: colors.lightBlue,
      modalBg: colors.darkerBlack,
      textPrimary: colors.blue,
      textSecondary: colors.littleDarkerBlack,
      buttonPrimary: colors.blue,
      buttonSeconday: colors.littleDarkerBlack
    }
  },
  starred: {
    bg: colors.lightYellow,
    text: colors.yellow,
    hover: colors.lightYellow,
    icon: colors.yellow
  },
  channels: {
    bg: colors.lightBlue,
    text: colors.blue,
    hover: colors.lightBlue,
    icon: colors.blue,
    modal: {
      bg: colors.lightBlue,
      modalBg: colors.darkerBlack,
      textPrimary: colors.blue,
      textSecondary: colors.littleDarkerBlack,
      buttonPrimary: colors.littleDarkerBlack,
      buttonSeconday: colors.littleDarkerBlack
    },
    notificationsBg: colors.white,
    notificationsFg: colors.blue
  },
  directMessages: {
    bg: colors.lightBlue,
    text: colors.blue,
    hover: colors.lightBlue,
    icon: colors.blue,
    status: {
      online: colors.green,
      offline: colors.red,
      away: colors.yellow
    }
  },
  meta: {
    bg: colors.darkerBlack,
    textPrimary: colors.white,
    textSecondary: colors.lightWhite
  },
  spinner: {
    bg: colors.littleDarkerBlack,
    text: colors.blue,
    loaderFg: colors.blue,
    loaderBg: colors.lightBlue
  },
  form: {
    bg: colors.darkerBlack,
    headingText: colors.white,
    text: colors.white,
    field: {
      icon: colors.white,
      text: colors.white,
      bg: colors.littleDarkerBlack,
      placeholder: colors.gray,
      focusBorder: colors.blue
    },
    error: {
      bg: colors.lightRed,
      text: colors.red,
      placeholder: colors.littleLightRed
    }
  },
  button: {
    text: colors.darkerBlack,
    bg: colors.blue,
    bgDisabled: colors.lightBlue
  },
  link: {
    bg: colors.lightBlue,
    text: colors.blue
  }
}

//--DEFAULT EXPORT--//
export default {
  light,
  dark
}
