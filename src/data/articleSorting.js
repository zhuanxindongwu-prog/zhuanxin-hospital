const getArticleTime = (article) => Date.parse(article.date || article.publishedDate || '') || 0

export const sortArticlesByDateDesc = (articles) =>
  [...articles].sort((a, b) => getArticleTime(b) - getArticleTime(a))
