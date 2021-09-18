<!--
 * @Description: 
 * @Autor: zhenghui
 * @Date: 2021-04-16 17:01:18
-->

# webpack-git-revision-plugin
> 简单的webpack插件，基于本地的git仓库构建过程中产生VERSION和COMMITHASH文件

# Usage
给定一个 webpack 5 项目（检查下面的旧 webpack 版本），将其安装为本地开发依赖项：
```javascript
    npm install --save-dev git-revision-webpack-plugin
```
然后，只需在 webpack 配置中将其配置为插件：
```javascript
const { VersionPlugin } = require('@zhfejs/webpack-git-revision-plugin')

module.exports = {
  plugins: [new VersionPlugin()],
}
```
配置版本文件生成地址,默认目录为运行进程的当前工作目录
```javascript
const { VersionPlugin } = require('@zhfejs/webpack-git-revision-plugin')

module.exports = {
  plugins: [new VersionPlugin(
      {
        savePath: './dist/resources/JtassessWeb/static'
      }
  )],
}
```
