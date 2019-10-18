const fs = require('fs')
const path = require('path')
const config = require('../../assets/game/config.json')

const basePath = path.join(__dirname, '../../../public/data')
const baseAssetsPath = path.join(__dirname, '../../assets/game')
const defaultLanguage = config.languages.default

function getImageBase64Src (filename) {
  const data = fs.readFileSync(filename)
  const extensionName = path.extname(filename)
  const base64Image = Buffer.from(data, 'binary').toString('base64')
  const imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`
  return imgSrcString
}

function buildCommonData (language) {
  const datasFilename = []

  // create items
  const itemsDataDir = path.join(basePath, language, 'common', 'items')
  fs.mkdirSync(itemsDataDir, { recursive: true })
  for (let item of config.common.items) {
    const itemAssetsDir = path.join(baseAssetsPath, language, 'common', 'items', `${item.id}`)
    const itemAssetsDirDefault = path.join(baseAssetsPath, defaultLanguage, 'common', 'items', `${item.id}`)
    const info = JSON.parse(fs.readFileSync(path.join(itemAssetsDir, 'info.json')))
    const imageFilename = fs.readdirSync(itemAssetsDir).filter(n => n.endsWith('.jpg')).pop() ? path.join(itemAssetsDir, fs.readdirSync(itemAssetsDir).filter(n => n.endsWith('.jpg')).pop()) : path.join(itemAssetsDirDefault, fs.readdirSync(itemAssetsDirDefault).filter(n => n.endsWith('.jpg')).pop())
    const base64Src = getImageBase64Src(imageFilename)
    info.base64Src = base64Src
    const dataFilename = path.join(itemsDataDir, `${item.id}.json`)
    fs.writeFileSync(dataFilename, JSON.stringify(info, null, 4))
    datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
  }

  // create character cards
  const characterCardsDataDir = path.join(basePath, language, 'common', 'characterCards')
  fs.mkdirSync(characterCardsDataDir, { recursive: true })
  for (let characterCard of config.common.ui.characterCards) {
    const characterCardAssetsDir = path.join(baseAssetsPath, language, 'common', 'ui', 'characterCards', `${characterCard.character}`)
    const characterCardAssetsDirDefault = path.join(baseAssetsPath, defaultLanguage, 'common', 'ui', 'characterCards', `${characterCard.character}`)
    const info = JSON.parse(fs.readFileSync(path.join(characterCardAssetsDir, 'info.json')))
    const imageFilename = fs.readdirSync(characterCardAssetsDir).filter(n => n.endsWith('.jpg')).pop() ? path.join(characterCardAssetsDir, fs.readdirSync(characterCardAssetsDir).filter(n => n.endsWith('.jpg')).pop()) : path.join(characterCardAssetsDirDefault, fs.readdirSync(characterCardAssetsDirDefault).filter(n => n.endsWith('.jpg')).pop())
    const base64Src = getImageBase64Src(imageFilename)
    info.base64Src = base64Src
    const dataFilename = path.join(characterCardsDataDir, `${characterCard.character}.json`)
    fs.writeFileSync(dataFilename, JSON.stringify(info, null, 4))
    datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
  }

  // create suspect cards
  const suspectCardsDataDir = path.join(basePath, language, 'common', 'suspectCards')
  fs.mkdirSync(suspectCardsDataDir, { recursive: true })
  for (let suspectCard of config.common.ui.suspectCards) {
    const suspectCardAssetsDir = path.join(baseAssetsPath, language, 'common', 'ui', 'suspectCards', `${suspectCard.suspect}`)
    const suspectCardAssetsDirDefault = path.join(baseAssetsPath, defaultLanguage, 'common', 'ui', 'suspectCards', `${suspectCard.suspect}`)
    const info = JSON.parse(fs.readFileSync(path.join(suspectCardAssetsDir, 'info.json')))
    const imageFilename = fs.readdirSync(suspectCardAssetsDir).filter(n => n.endsWith('.png')).pop() ? path.join(suspectCardAssetsDir, fs.readdirSync(suspectCardAssetsDir).filter(n => n.endsWith('.png')).pop()) : path.join(suspectCardAssetsDirDefault, fs.readdirSync(suspectCardAssetsDirDefault).filter(n => n.endsWith('.png')).pop())
    const base64Src = getImageBase64Src(imageFilename)
    info.base64Src = base64Src
    const dataFilename = path.join(suspectCardsDataDir, `${suspectCard.suspect}.json`)
    fs.writeFileSync(dataFilename, JSON.stringify(info, null, 4))
    datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
  }

  // create bottomNav icons
  const iconsDataDir = path.join(basePath, language, 'common', 'icons')
  fs.mkdirSync(iconsDataDir, { recursive: true })
  for (let icon of config.common.ui.bottomNav.icons) {
    const iconAssetsDir = path.join(baseAssetsPath, language, 'common', 'ui', 'bottomNav', 'icons', `${icon.name}`)
    const iconAssetsDirDefault = path.join(baseAssetsPath, defaultLanguage, 'common', 'ui', 'bottomNav', 'icons', `${icon.name}`)
    const info = JSON.parse(fs.readFileSync(path.join(iconAssetsDir, 'info.json')))
    const imageFilename = fs.readdirSync(iconAssetsDir).filter(n => n.endsWith('.png')).pop() ? path.join(iconAssetsDir, fs.readdirSync(iconAssetsDir).filter(n => n.endsWith('.png')).pop()) : path.join(iconAssetsDirDefault, fs.readdirSync(iconAssetsDirDefault).filter(n => n.endsWith('.png')).pop())
    const base64Src = getImageBase64Src(imageFilename)
    info.base64Src = base64Src
    const dataFilename = path.join(iconsDataDir, `${icon.name}.json`)
    fs.writeFileSync(dataFilename, JSON.stringify(info, null, 4))
    datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
  }

  // create others
  const othersDataDir = path.join(basePath, language, 'common', 'others')
  const othersAssetsDir = path.join(baseAssetsPath, language, 'common', 'ui', 'others')
  const othersAssetsDirDefault = path.join(baseAssetsPath, defaultLanguage, 'common', 'ui', 'others')
  fs.mkdirSync(othersDataDir, { recursive: true })
  for (const n of fs.readdirSync(othersAssetsDirDefault).filter(n => /((.jpg)|(.png))$/.test(n))) {
    let imageFilename = path.join(othersAssetsDirDefault, n)
    if (fs.existsSync(path.join(othersAssetsDir, n))) {
      imageFilename = path.join(othersAssetsDir, n)
    }

    const base64Src = getImageBase64Src(imageFilename)
    const info = { base64Src }
    const dataFilename = path.join(othersDataDir, `${n.split('.').shift()}.json`)
    fs.writeFileSync(dataFilename, JSON.stringify(info, null, 4))
    datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
  }

  fs.writeFileSync(path.join(basePath, language, 'common.json'), JSON.stringify(datasFilename, null, 4))
}

function generateStageData (stage, stageIndex, currentPath) {
  const stageAssetsDir = path.join(currentPath, `Stage${stageIndex}-${stage.type}`)
  const stageAssetsDirDefault = (() => {
    const a = path.relative(baseAssetsPath, stageAssetsDir).split('/')
    a.splice(0, 1, defaultLanguage)
    return path.join(baseAssetsPath, a.join('/'))
  })()
  if (stage.type === 'Section') {
    const datas = []
    stage.stages.forEach((stage, index) => {
      datas.push(...generateStageData(stage, index, stageAssetsDir))
    })
    return datas
  } else if (stage.type === 'Session') {
    const stageCopy = JSON.parse(JSON.stringify(stage))
    let imageFilename = path.join(stageAssetsDir, `${fs.readdirSync(stageAssetsDir).filter(n => n.endsWith('.jpg')).pop()}`)
    if (!fs.existsSync(imageFilename)) {
      imageFilename = path.join(stageAssetsDirDefault, fs.readdirSync(stageAssetsDirDefault).filter(n => n.endsWith('.jpg')).pop())
    }
    const base64Src = getImageBase64Src(imageFilename)
    stageCopy.base64Src = base64Src
    return [stageCopy]
  } else if (stage.type === 'Mission') {
    const stageCopy = JSON.parse(JSON.stringify(stage))
    if (stageCopy.pass) {
      let imageFilename = path.join(stageAssetsDir, 'pass.jpg')
      if (!fs.existsSync(imageFilename)) {
        imageFilename = path.join(stageAssetsDirDefault, 'pass.jpg')
      }
      const base64Src = getImageBase64Src(imageFilename)
      stageCopy.base64Src = base64Src
    }
    return [stageCopy]
  }
}

function buildIndividualData (language) {
  const charactersDataDir = path.join(basePath, language)
  for (let entry of Object.entries(config.characters)) {
    const datasFilename = []
    const [characterName, characterData] = entry
    const characterDataDir = path.join(charactersDataDir, characterName)
    const characterAssetsDir = path.join(baseAssetsPath, language, characterName)
    fs.mkdirSync(characterDataDir, { recursive: true })

    // create stages datas
    const stages = []
    characterData.roadmap.chapters.forEach((chapter, chapterIndex) => {
      const chapterAssetsDir = path.join(characterAssetsDir, 'Chapters', `${chapterIndex}`)
      chapter.stages.forEach((stage, stageIndex) => {
        stages.push(...generateStageData(stage, stageIndex, chapterAssetsDir))
      })
    })
    stages.forEach((stage, stageIndex) => {
      const dataFilename = path.join(characterDataDir, `stage-${stageIndex}.json`)
      fs.writeFileSync(dataFilename, JSON.stringify(stage, null, 4))
      datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
    })

    characterData.review.forEach((review) => {
      const reviewDir = path.join(characterDataDir, 'review')
      fs.mkdirSync(reviewDir, { recursive: true })
      const dataFilename = path.join(reviewDir, `${review.id}.json`)
      const obj = {
        id: review.id,
        title: review.title[language],
        dialogue: review.dialogue.map(a => a[language])
      }
      fs.writeFileSync(dataFilename, JSON.stringify(obj, null, 4))
      datasFilename.push(path.relative(path.join(basePath, language), dataFilename))
    })

    fs.writeFileSync(path.join(basePath, language, `${characterName}.json`), JSON.stringify(datasFilename, null, 4))
  }
}

for (let language of config.languages.list) {
  buildCommonData(language)
  buildIndividualData(language)
}
