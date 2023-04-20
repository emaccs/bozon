const fs = require('fs')
const path = require('path')

function renameJsToTs(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const fileStat = fs.statSync(filePath)

    if (fileStat.isDirectory()) {
      renameJsToTs(filePath)
    } else if (path.extname(file) === '.js') {
      const newFilePath = path.join(dir, path.basename(file, '.js') + '.ts')
      fs.renameSync(filePath, newFilePath)
      console.log(`Renamed: ${filePath} -> ${newFilePath}`)
    }
  })
}

// Set the starting directory
renameJsToTs('./templates')
