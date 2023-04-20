require('application.css')

window.MessagesAPI.onLoaded((_, data) => {
  const title = document.getElementById('title')
  const details = document.getElementById('details')
  const versions = document.getElementById('versions')
  if (title && details && versions) {
    title.innerHTML = data.appName + ' App'
    details.innerHTML = 'built with Electron v' + data.electronVersion
    versions.innerHTML =
      'running on Node v' +
      data.nodeVersion +
      ' and Chromium v' +
      data.chromiumVersion
  }
})
