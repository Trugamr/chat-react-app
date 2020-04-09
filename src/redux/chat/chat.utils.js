export const getChannelsWithStarred = (channels, starred) => {
  if (starred !== undefined) {
    channels.map(channel => {
      if (starred.includes(channel.id)) {
        channel.starred = true
      } else {
        channel.starred = false
      }

      return channel
    })
  }

  return [...channels]
}
