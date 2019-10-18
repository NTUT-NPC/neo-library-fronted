const Axios = require('axios')

function getPublicAPI () {
  const baseURL = 'http://140.124.104.98:5000'
  const axios = Axios.create({ baseURL })

  return {
    async setCurrentLadder (ladder) {
      await axios.put('/api/manage/games/current_ladder', {
        ladder
      })
    },

    async generatePresentPool () {
      await axios.post('/api/manage/games/present_pool')
    },

    async getCurrentLadder () {
      try {
        let { data } = await axios.get('/api/games/current_ladder')
        return data.ladder
      } catch (error) {
        if (error.response.status === 404) { console.log('未設定梯次') } else { throw error }
      }
    },

    async auth ({ studentId, password, ladder }) {
      try {
        let { data } = await axios.post('/api/games/auth', {
          'student_id': studentId, password, ladder
        })
        return data
      } catch (error) {
        const status = error.response.status
        if (status === 401) {
          console.console.log('登入失敗')
        } else if (status === 404) {
          console.log('梯次錯誤')
        }
      }
    }
  }
}

function getPrivateAPI (token) {
  const baseURL = 'http://140.124.104.98:5000'
  const axios = Axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` }
  })
  return {
    async postPresent () {
      try {
        const { data } = await axios.post('/api/games/present')
        return data.type
      } catch (error) {
        const status = error.response.status
        if (status === 403) {
          console.log('重複抽獎')
        } else if (status === 404) { console.log('未產生抽獎池') }
      }
    },

    async getPresent () {
      const { data } = await axios.get('/api/games/present')
      return data.type
    }
  }
}

async function test () {
  const publicAPI = getPublicAPI()
  await publicAPI.setCurrentLadder('test')
  const ladder = await publicAPI.getCurrentLadder()

  let a = []
  let b = []
  for (let i = 105590001; i < 105590025; i++) {
    a.push(publicAPI.auth({
      studentId: `${i}`,
      password: `${i}`,
      ladder
    }))
  }
  b = await Promise.all(a)

  // await publicAPI.generatePresentPool()

  for (const { token } of b) {
    const privateAPI = getPrivateAPI(token)
    a.push(privateAPI.postPresent())
  }

  b = await Promise.all(a)

  // const { token, character_index: characterIndex } = await publicAPI.auth({
  //   studentId: '105590010',
  //   password: '105590010',
  //   ladder
  // })
}

test().then(() => { console.log('done') }).catch(err => { console.log(err) })
