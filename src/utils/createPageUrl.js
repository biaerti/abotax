// TODO: Wklej tutaj zawartość z Base44 - createPageUrl.js
// Funkcja do generowania adresów URL stron

export function createPageUrl(pageName, params = {}) {
  // Implementacja z Base44
  let url = `/${pageName}`

  const queryParams = new URLSearchParams(params).toString()
  if (queryParams) {
    url += `?${queryParams}`
  }

  return url
}

export default createPageUrl
