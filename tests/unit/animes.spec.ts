import { test } from '@japa/runner'
import { AnimeService } from '#services/Animes/animes_service'
import Anime from '#services/Animes/anime.type'

test.group('Anime', () => {
  test('get all anime', async ({ assert }) => {
    const service = new AnimeService()
    const data: Anime[] = await service.getAll()
    assert.notEmpty(data)
  })

  test('get by id', async ({ assert }) => {
    const service = new AnimeService()
    const data: Anime | null = await service.getById(5)
    assert.notEqual(data, null)
  })

  test('get by stream', async ({ assert }) => {
    const service = new AnimeService()
    const animes: Anime[] = []
    for (let i = 1; i <= 5; i++) {
      const anime: Anime[] | null = await service.getStream(20, i)
      if (anime) {
        animes.push(...anime)
      }
    }
    console.log(animes.length)
    assert.equal(100, animes.length)
  })
})
