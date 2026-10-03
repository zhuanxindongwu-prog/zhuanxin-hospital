export const editorialContentPaths = Object.freeze([
  '/services/veterinary-cardiology',
  '/services/echocardiography',
  '/services/veterinary-oncology',
  '/topics/mmvd',
  '/topics/congestive-heart-failure'
])

export const usesEditorialChrome = (path) =>
  !['/', '/adminLogin', '/adminAppointments', '/pet-cpr-game'].includes(path)

export const isEditorialContentPath = (path) => editorialContentPaths.includes(path)
