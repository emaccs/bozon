import { Command } from 'commander'
import { create, start, build, pack, test, clear } from './runner'
import * as json from '../package.json'

export const perform = () => {
    const program = new Command()
    program.version(json.version).usage('[options]')

    program
        .command('new <name>')
        .option('--skip-install')
        .description('Generate scaffold for new Electron application')
        .action(create)

    program
        .command('start')
        .alias('s')
        .option('-r, --reload')
        .option('-i, --inspect <port>')
        .option('-b, --inspect-brk <port>')
        .description('Compile and run application')
        .action(start)

    program
        .command('build [env]')
        .description('Build application to builds/ directory')
        .action(build)

    program
        .command('test [spec]')
        .description('Run tests from spec/ directory')
        .action(test)

    program
        .command('clear')
        .description('Clear builds and releases directories')
        .action(clear)

    program
        .command('package <platform>')
        .option('-p, --publish')
        .description(
            'Build and Package applications for platforms defined in package.json'
        )
        .action(pack)

    program.parse(process.argv)

    if (!process.argv.slice(2).length) {
        program.outputHelp()
    }
}
