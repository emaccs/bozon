import { readFileSync, writeFile } from 'fs'

export const buildManifest = (source: string, destination: string) => {
  return new Promise((resolve, reject) => {
    const json = JSON.parse(readFileSync(source, 'utf8'))
    const settings = {
      name: json.name,
      version: json.version,
      description: json.description,
      author: json.author || 'Anonymous',
      main: 'main/index.js',
      repository: json.repository
    }
    writeFile(destination, JSON.stringify(settings), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  })
}
