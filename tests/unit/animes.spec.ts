import { test } from '@japa/runner'
import { AnimeService } from '#services/Animes/animes_service'

test.group('Anime', () => {
  test('fetching test', async ({ assert }) => {
    const service = new AnimeService()
    const response = await service.fetchAnimeInfo(1, 2)
    assert.equal(2, response.media.length)
  })

  test('too many request', async ({ assert }) => {
    const service = new AnimeService()
    const animes = []
    for (let i = 1; i <= 30; i++) {
      const response = await service.fetchAnimeInfo(i, 20)
      animes.push(response)
    }
    assert.equal(30, animes.length)
  }).timeout(60000)

  test('fetching test with search', async ({ assert }) => {
    const service = new AnimeService()
    const response = await service.fetchAnimeInfo(1, 2, 'titan')
    assert.equal(2, response.media.length)
  })
})
