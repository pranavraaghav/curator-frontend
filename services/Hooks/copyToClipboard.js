const copyToClipboard = (text) => {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(text)
  }
}

export default copyToClipboard
