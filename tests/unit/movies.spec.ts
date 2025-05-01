import { test } from '@japa/runner'
import { MoviesService } from '#services/Movies/movies_service'

test.group('Movies', () => {
  test('fetching test', async ({ assert }) => {
    const service = new MoviesService()
    const response = await service.fetchMovies(1, 2)
    assert.equal(response.movies.length, 2)
  })
})
