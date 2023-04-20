import path from 'path'
import childProcess from 'child_process'
import chalk from 'chalk'
import ejs from 'ejs'
import fs from 'fs'
import latestVersion from 'latest-version'
import { classify, underscored } from 'underscore.string'
import Questionnaire from './questionnaire'

const $ = path.join

export default class Generator {
  name: any
  options: any
  defaults: any
  questionnaire: Questionnaire
  constructor(name, options) {
    this.name = underscored(name)
    this.options = options
    this.defaults = {
      id: 'bozonapp',
      name: classify(name),
      author: null,
      year: new Date().getFullYear()
    }
    this.questionnaire = new Questionnaire({ name: this.defaults.name })
  }

  async generate() {
    await this.getVersions()
    return this.questionnaire.prompt(async (answers) => {
      this.defaults.id = answers.name.toLowerCase()
      this.defaults.name = classify(answers.name)
      this.defaults.packageManager = answers.packageManager
      this.defaults.author = answers.author
      this.setup()
    })
  }

  setup() {
    this.createDirectories()
    this.copyTemplates()
    this.installPackages()
    this.printInstructions()
  }

  createDirectories() {
    const dirs: (string | string[])[] = [
      this.name,
      [this.name, 'src'],
      [this.name, 'src', 'main'],
      [this.name, 'src', 'renderer'],
      [this.name, 'src', 'preload'],
      [this.name, 'src', 'renderer', 'images'],
      [this.name, 'src', 'renderer', 'stylesheets'],
      [this.name, 'src', 'renderer', 'javascripts'],
      [this.name, 'config'],
      [this.name, 'config', 'environments'],
      [this.name, 'config', 'platforms'],
      [this.name, 'resources'],
      [this.name, 'test'],
      [this.name, 'test', 'units'],
      [this.name, 'test', 'features']
    ]

    dirs.forEach((dir) => {
      if (typeof dir === 'string') {
        this.mkdir(dir)
      } else {
        this.mkdir(...dir)
      }
    })
  }

  async getVersions() {
    this.defaults.bozonVersion = await latestVersion('bozon')
    this.defaults.jestVersion = await latestVersion('jest')
    this.defaults.spectronVersion = await latestVersion('spectron')
  }

  copyTemplates() {
    this.copyTpl('gitignore', '.gitignore')
    this.copyTpl(
      $('json', 'development_package.json'),
      'package.json',
      this.defaults
    )
    this.copyTpl('jest.config.js', 'jest.config.js')
    this.copyTpl('webpack.config.js', 'webpack.config.js')
    this.copyTpl('license', 'LICENSE', this.defaults)
    this.copyTpl('readme.md', 'README.md', this.defaults)
    this.copyTpl($('javascripts', 'main.js'), $('src', 'main', 'index.js'))
    this.copyTpl(
      $('javascripts', 'preload.js'),
      $('src', 'preload', 'index.js')
    )
    this.copyTpl('index.html', $('src', 'renderer', 'index.html'))
    this.copyTpl(
      $('stylesheets', 'application.css'),
      $('src', 'renderer', 'stylesheets', 'application.css')
    )
    this.copyTpl(
      $('javascripts', 'renderer.js'),
      $('src', 'renderer', 'javascripts', 'index.js')
    )
    this.copy($('images', 'electron.icns'), $('resources', 'icon.icns'))
    this.copy($('images', 'electron.ico'), $('resources', 'icon.ico'))
    this.copyTpl($('json', 'settings.json'), $('config', 'settings.json'))
    this.copyTpl(
      $('json', 'development.json'),
      $('config', 'environments', 'development.json')
    )
    this.copyTpl(
      $('json', 'production.json'),
      $('config', 'environments', 'production.json')
    )
    this.copyTpl(
      $('json', 'test.json'),
      $('config', 'environments', 'test.json')
    )
    this.copyTpl(
      $('json', 'windows.json'),
      $('config', 'platforms', 'windows.json')
    )
    this.copyTpl(
      $('json', 'linux.json'),
      $('config', 'platforms', 'linux.json')
    )
    this.copyTpl($('json', 'mac.json'), $('config', 'platforms', 'mac.json'))
    this.copyTpl(
      $('test', 'main_test.js'),
      $('test', 'features', 'main.test.js')
    )
    this.copyTpl($('test', 'setup.js'), $('test', 'setup.js'), this.defaults)
  }

  installPackages() {
    if (!this.options.skipInstall) {
      console.log(
        `  Running ${chalk.cyan(this.defaults.packageManager + ' install')}..`
      )
      childProcess.spawnSync(this.defaults.packageManager, ['install'], {
        cwd: './' + this.name,
        shell: true,
        stdio: 'inherit'
      })
    } else {
      console.log(`  Skipping ${chalk.cyan('installing dependencies')} ..`)
    }
  }

  mkdir(...dirs: string[]) {
    try {
      return fs.mkdirSync($.apply(this, dirs))
    } catch (err: any) {
      console.log(`\n ${chalk.red(err.message)} \n`)
      process.exit(0)
    }
  }

  copy(src, dest) {
    const template = $(__dirname, '..', 'templates', src)
    const destination = $(process.cwd(), this.name, dest)
    fs.writeFileSync(destination, fs.readFileSync(template))
    console.log('  ' + chalk.green('create') + ' ' + dest)
  }

  copyTpl(src: string, dest: string, data?: object) {
    if (typeof data === 'undefined') {
      data = {}
    }
    const template = $(__dirname, '..', 'templates', src)
    const destination = $(process.cwd(), this.name, dest)
    const str = fs.readFileSync(template, 'utf8')

    fs.writeFileSync(destination, ejs.render(str, data))
    console.log('  ' + chalk.green('create') + ' ' + dest)
  }

  printInstructions() {
    console.log('')
    console.log(
      `Success! Created ${this.name} at ${$(process.cwd(), this.name)}`
    )
    console.log('Inside that directory, you can run several commands:')
    console.log('')
    console.log(chalk.cyan('  bozon start'.padStart(5)))
    console.log('    Starts the Electron app in development mode.')
    console.log('')
    console.log(chalk.cyan('  bozon test'.padStart(5)))
    console.log('    Starts the test runner.')
    console.log('')
    console.log(chalk.cyan('  bozon package <platform>'.padStart(5)))
    console.log('    Packages Electron application for specified platform.')
    console.log('')
    console.log('')
    console.log('We suggest you to start with typing:')
    console.log(chalk.cyan(`  cd ${this.name}`))
    console.log(chalk.cyan('  bozon start'))
    console.log('')
  }
}
