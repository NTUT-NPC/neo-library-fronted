const fs = require('fs')
const path = require('path')
const config = require('../../assets/game/config.json')

const basePath = path.join(__dirname, '../../assets/game')
const defaultLanguage = config.languages.default

function createCommonAssets (language) {
  // create items
  for (let item of config.common.items) {
    const itemDir = path.join(basePath, language, 'common', 'items', `${item.id}`)
    fs.mkdirSync(itemDir, { recursive: true })
    const itemCopy = {
      id: item.id,
      text: item.text[language] || item.text[defaultLanguage]
    }
    fs.writeFileSync(path.join(itemDir, 'info.json'), JSON.stringify(itemCopy, null, 4))
  }

  // create character cards
  for (let characterCard of config.common.ui.characterCards) {
    const characterCardsDir = path.join(basePath, language, 'common', 'ui', 'characterCards', `${characterCard.character}`)
    fs.mkdirSync(characterCardsDir, { recursive: true })
    fs.writeFileSync(path.join(characterCardsDir, 'info.json'), JSON.stringify(characterCard, null, 4))
  }

  // create suspect cards
  for (let suspectCard of config.common.ui.suspectCards) {
    const suspectCardsDir = path.join(basePath, language, 'common', 'ui', 'suspectCards', `${suspectCard.suspect}`)
    fs.mkdirSync(suspectCardsDir, { recursive: true })
    const suspectCardCopy = {
      suspect: suspectCard.suspect,
      text: suspectCard.text[language] || suspectCard.text[defaultLanguage]
    }
    fs.writeFileSync(path.join(suspectCardsDir, 'info.json'), JSON.stringify(suspectCardCopy, null, 4))
  }

  // create bottomNav icons
  for (let icon of config.common.ui.bottomNav.icons) {
    const iconDir = path.join(basePath, language, 'common', 'ui', 'bottomNav', 'icons', `${icon.name}`)
    fs.mkdirSync(iconDir, { recursive: true })
    const iconCopy = {
      name: icon.name,
      text: icon.text[language] || icon.text[defaultLanguage]
    }
    fs.writeFileSync(path.join(iconDir, 'info.json'), JSON.stringify(iconCopy, null, 4))
  }

  // create other ui assets
  const othersDir = path.join(basePath, language, 'common', 'ui', 'others')
  fs.mkdirSync(othersDir, { recursive: true })
}

function createStageAssets (stage, stageIndex, currentPath) {
  const stageDir = path.join(currentPath, `Stage${stageIndex}-${stage.type}`)
  fs.mkdirSync(stageDir, { recursive: true })
  if (stage.type === 'Section') {
    stage.stages.forEach((stage, index) => {
      createStageAssets(stage, index, stageDir)
    })
  } else {
    fs.writeFileSync(path.join(stageDir, 'info.json'), JSON.stringify(stage, null, 4))
  }
}

function createIndividualAssets (language) {
  for (let entry of Object.entries(config.characters)) {
    const [characterName, characterData] = entry
    const characterDir = path.join(basePath, language, characterName)

    // create chapters assets
    characterData.roadmap.chapters.forEach((chapter, chapterIndex) => {
      const chapterDir = path.join(characterDir, 'Chapters', `${chapterIndex}`)
      chapter.stages.forEach((stage, stageIndex) => {
        createStageAssets(stage, stageIndex, chapterDir)
      })
    })
  }
}

for (let language of config.languages.list) {
  createCommonAssets(language)
  createIndividualAssets(language)
}
