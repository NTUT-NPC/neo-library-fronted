import Axios from 'axios'

const axios = Axios.create({
  baseURL: '/data/'
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // }
})

async function loadCommonData (language) {
  const { data: list } = await axios.get(`/${language}/common.json`)
  const commonDataList = await Promise.all(list.map(url => {
    async function temp () {
      const data = {}
      const { data: loaded } = await axios.get(`/${language}/${url}`)
      data[url.replace('.json', '')] = loaded
      return data
    }
    return temp()
  }))
  const commonDatas = {}
  for (const data of commonDataList) {
    Object.assign(commonDatas, data)
  }
  return commonDatas
}

async function loadCharacterData (language, characterIndex) {
  const characters = ['wukong', 'wuneng', 'wujing']
  const character = characters[characterIndex]
  const { data: list } = await axios.get(`/${language}/${character}.json`)
  const characterDataList = await Promise.all(list.map(url => {
    async function temp () {
      const data = {}
      const { data: loaded } = await axios.get(`/${language}/${url}`)
      data[url.replace('.json', '')] = loaded
      return data
    }
    return temp()
  }))
  const characterDatas = {}
  for (const data of characterDataList) {
    Object.assign(characterDatas, data)
  }
  return characterDatas
}

export default {
  loadCommonData,
  loadCharacterData
}
