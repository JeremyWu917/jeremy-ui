# jeremy-ui
A sample ui-framework base on Vue3 :rocket:

<img alt="ide" src="https://img.shields.io/badge/ide-vscode-blue">
<img alt="build-passing" src="https://img.shields.io/badge/build-passing-blue">
<img alt="vue-version" src="https://img.shields.io/badge/vue-3.0-blue">
<img alt="jeremy-ui" src="https://img.shields.io/badge/jeremy--ui-0.0.3-blue">
<img alt="license-mit" src="https://img.shields.io/badge/license-MIT-green">
<img alt="stars" src="https://img.shields.io/github/stars/jeremywu917/jeremy-ui?style=social">
<img alt="forks" src="https://img.shields.io/github/forks/jeremywu917/jeremy-ui?style=social">
<img alt="issues" src="https://img.shields.io/github/issues/jeremywu917/jeremy-ui">
<img alt="pr" src="https://img.shields.io/github/issues-pr/jeremywu917/jeremy-ui">

Work In Process 🚧

# 进度

目前已经完成了

- Button
- Card
- Dialog
- Input
- Switch
- Table
- Tabs

# 安装

推荐使用 npm 安装

```bash
npm install jeremy-ui --save
```

或使用 yarn

```bash
yarn add jeremy-ui --save
```

# 技术栈

- Vue3
- TypeScript
- Vite
- Scss

# 部署

根据部署到 Github Pages 和自己服务器（以 nginx 为例），有不同的配置

## Github Pages

修改 `vite.config.ts` 中的 `base` 字段为 `'./'`

修改 `src/router.ts` 中的 `history` 为 hash 模式

## nginx

修改 `vite.config.ts` 中的 `base` 字段为 `'/'`

修改 `src/router.ts` 中的 `history` 为 history 模式

## 修改建议

重点调整 `Global.ts` 里的定义
