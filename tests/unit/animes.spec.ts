import { test } from '@japa/runner'
import { AnimeService } from '#services/Animes/animes_service'

test.group('Anime', () => {
  test('fetching test', async ({ assert }) => {
    const service = new AnimeService()
    const response = await service.fetchAnimeInfo(1, 2)
    assert.equal(2, response.media.length)
  })
})
