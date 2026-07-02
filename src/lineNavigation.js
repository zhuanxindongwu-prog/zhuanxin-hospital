const mobileUserAgentPattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export const isLineMobileContext = ({ userAgent = '', isCoarsePointer = false } = {}) =>
  mobileUserAgentPattern.test(userAgent) || isCoarsePointer

const getDefaultLineContext = () => ({
  userAgent: typeof navigator === 'undefined' ? '' : navigator.userAgent,
  isCoarsePointer:
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches
})

export const createLineAddFriendClickHandler = (
  lineUrl,
  { getContext = getDefaultLineContext, navigate } = {}
) => {
  const navigateToLine = navigate || ((url) => {
    if (typeof window !== 'undefined') {
      window.location.href = url
    }
  })

  return (event) => {
    if (!isLineMobileContext(getContext())) return

    event?.preventDefault?.()
    navigateToLine(lineUrl)
  }
}
