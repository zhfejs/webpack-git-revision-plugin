/*
 * @Description:
 * @Autor: zhenghui
 * @Date: 2021-06-30 13:00:40
 */
const { bold, blue } = require('chalk');
const dayjs = require('dayjs');
const fileSave = require('file-save');

const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const resolve = (dir) => require('path').join(process.cwd(), ...dir);

class VersionPlugin {
  constructor(opts = {}) {
    this.opts = {
      savePath: '.',
      logLevel: 'info',
      ...opts,
    };
  }
  apply(compiler) {
    const done = () => {
      const gitRevision = new GitRevisionPlugin();
      const filePath = resolve([this.opts.savePath, 'version']);
      const versionMap = {
        version: {
          label: '版本:',
          value: gitRevision.version(),
        },
        branch: {
          label: '分支:',
          value: gitRevision.branch(),
        },
        lastcommitdatetime: {
          label: '版本时间:',
          value: gitRevision.lastcommitdatetime(),
        },
        buildTime: {
          label: '编译时间:',
          value: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        },
      };
      let fileContent = '';
      for (const key in versionMap) {
        fileContent += `${versionMap[key].label}${versionMap[key].value}\n`;
      }
      fileSave(filePath).write(fileContent, 'utf8').end('\n');
      console.log(
        `${blue(
          `${bold('[Version Plugin]:')} saved version file to ${filePath}`
        )}`
      );
    };
    if (compiler.hooks) {
      compiler.hooks.done.tap('VersionPlugin', done);
    } else {
      compiler.plugin('done', done);
    }
  }
}

module.exports = VersionPlugin;
