import { doctors } from './doctors.js'

export const createArticleByline = (article, siteUrl) => {
  const origin = siteUrl.replace(/\/$/, '')
  const clinicId = `${origin}/#clinic`
  if (!article.authors?.length) {
    return { '@type': 'Organization', '@id': clinicId, name: '專心動物醫院', url: `${origin}/` }
  }

  return article.authors.map(author => {
    const profile = new URL(author.path, origin + '/')
    const knownDoctor = profile.origin === new URL(origin).origin &&
      doctors.some(doctor => profile.pathname === `/doctor/${doctor.id}`)
    return {
      '@type': 'Person',
      ...(knownDoctor ? { '@id': `${profile.href}#person` } : {}),
      name: author.name,
      ...(author.title ? { jobTitle: author.title } : {}),
      url: profile.href,
      ...(knownDoctor ? { worksFor: { '@id': clinicId } } : {})
    }
  })
}
