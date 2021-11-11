const isMobileBrowser = () => {
  if (typeof navigator !== "undefined")
    return Boolean(
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
}

export default isMobileBrowser
