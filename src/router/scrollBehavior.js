const DEFAULT_NAVBAR_OFFSET = 96

export const createScrollBehavior = (navbarOffset = DEFAULT_NAVBAR_OFFSET) => {
  return (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        top: navbarOffset,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  }
}
