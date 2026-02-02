class HomeService {
  getBooks () {
    return apiClient.get('/api/v1/Books')
  }

  createBook () {
    return apiClient.post('/api/v1/Books', { description: '' })
  }

  updateBook () {
    return apiClient.put(
      '/api/v1/Books/{id}',
      { pageCount: 1, description: '123' },
      { dynamicKeys: { id: 123 } }
    )
  }
}

export const homeService = new HomeService()
