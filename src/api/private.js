import Axios from 'axios'

export default function createPrivateAPI (token) {
  const httpClient = Axios.create({
    baseURL: 'https://140.124.104.98',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return {
    async updateMissionStatus () {
      await httpClient.post('/api/games/mission/refresh_borrow_return_status')
    },
    async getMissionStatus (mission) {
      return (await httpClient.get(`/api/games/mission/${mission}`)).data.status
    },
    async getPresentType () {
      const type = (await httpClient.get('/api/games/present')).data.type
      return type
    }
  }
}
