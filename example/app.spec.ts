import main from './app'
// @ts-ignore
import { seedBanana, seedUser } from './fixture.json'

describe('main', () => {
  it('should construct an object with key:value as first and second function arguments AND fetch stuff from resources', async () => {
    const key = 'thisIsAKey'
    const value = 'thisIsAValue'

    const result = await main(key, value)

    expect(result).toEqual(
      expect.objectContaining({
        [key]: value,
        firstPostgres1Entry: expect.objectContaining(seedUser),
        firstPostgres2Entry: expect.objectContaining(seedBanana),
      })
    )
  })
})