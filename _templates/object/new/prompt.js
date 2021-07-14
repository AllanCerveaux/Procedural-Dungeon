// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = []
    if (!args.name) {
      questions.push({
        type: 'input',
        name: 'name',
        message: 'Enter the name of Object :',
      })
    }
    questions.push({
      type: 'select',
      name: 'type',
      message: 'Specify type of object :',
      choices: ['characters', 'gui', 'items', 'debug', 'custom'],
    })
    return inquirer.prompt(questions).then((answer) => {
      console.log(answer)
      const { type, name } = answer
      const questions = []
      if (type === 'characters') {
        questions.push({
          type: 'select',
          name: 'folder',
          message: 'Type of Character :',
          choices: ['heroes', 'enemies', 'pnj'],
        })
      } else if (type === 'gui') {
        questions.push({
          type: 'select',
          name: 'folder',
          message: 'Type of GUI :',
          choices: ['game-ui', 'player-ui'],
        })
      } else if (type === 'items') {
        questions.push({
          type: 'select',
          name: 'folder',
          message: 'Type of Item ?',
          choices: ['weapon', 'consumable'],
        })
      }
      if (type !== "debug" && type !== "custom") {
        questions.push({
          type: 'select',
          name: 'gameobject',
          message: 'From which "GameObject" class to extend from?',
          choices: ['Sprite', 'Image', 'TileSprite', 'Blitter', 'Group', 'Zone', 'DynamicBitmapText', 'Graphics', 'None'],
        })
      }

      return inquirer.prompt(questions).then((nextAnswers) => {
        let path = {};
        const { folder, gameobject } = nextAnswers

        if (folder && gameobject) {
          path = {
            objectPath: `src/scripts/objects/${type}/${folder}/${name || args.name}/${name || args.name}.ts`,
            indexPath: `src/scripts/objects/${type}/${folder}/index.ts`
          }
        } else {
          path = {
            objectPath: `src/scripts/objects/${type}/${name || args.name}/${name || args.name}.ts`,
            indexPath: `src/scripts/objects/${type}/index.ts`
          }
        }

        return Object.assign({}, answer, nextAnswers, path)
      })
    })
  },
}
