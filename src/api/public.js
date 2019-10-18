import Axios from 'axios'

export default function createPublicAPI () {
  const httpClient = Axios.create({ baseURL: 'https://140.124.104.98' })

  return {
    async hello () {
      try {
        await httpClient.get('/api/hello')
        return true
      } catch (error) {
        return false
      }
    },
    async getCurrentLadder () {
      try {
        return (await httpClient.get('/api/games/current_ladder')).data.ladder
      } catch (error) {
        const status = error.response.status
        if (status === 404) return null
        throw error
      }
    },
    async auth ({ id, password }) {
      const { data } = await httpClient.post('/api/games/auth', {
        student_id: id,
        password
      })
      const { character_index: characterIndex, token } = data
      return {
        characterIndex,
        token
      }
    },
    async getCurrentGameStatus (characterIndex) {
      try {
        return (await httpClient.get(`/api/games/status?character_index=${characterIndex}`)).data.is_open
      } catch (error) {
        const status = error.response.status
        if (status === 404) return null
        throw error
      }
    }
  }
}
