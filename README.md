# jeremy-ui

> A sample ui-framework base on Vue3 :rocket:
<p align="center">
  <img alt="ide" src="https://img.shields.io/badge/ide-vscode-blue">
  <img alt="build-passing" src="https://img.shields.io/badge/build-passing-blue">
  <img alt="vue-version" src="https://img.shields.io/badge/vue-3.0-blue">
  <img alt="jeremy-ui" src="https://img.shields.io/badge/jeremy--ui-0.0.3-blue">
  <img alt="license-mit" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="stars" src="https://img.shields.io/github/stars/jeremywu917/jeremy-ui?style=social">
  <img alt="forks" src="https://img.shields.io/github/forks/jeremywu917/jeremy-ui?style=social">
  <img alt="issues" src="https://img.shields.io/github/issues/jeremywu917/jeremy-ui">
  <img alt="pr" src="https://img.shields.io/github/issues-pr/jeremywu917/jeremy-ui">
</p>

## WIP

This repo still work in process 🚧



## Wiki

[Click here](https://ui.jeremywu.top/)



## Process

- [x] Button 
- [x] Dialog
- [x] Input
- [x] Switch
- [x] Table
- [x] Tabs
- [x] Card
- [ ] Steps
- [ ] Shield
- [ ] _TODO_



## Install

- npm

```bash
npm install jeremy-ui --save
```

- yarn

```bash
yarn add jeremy-ui --save
```



## Technology Stack

- Vue3
- TypeScript
- Vite
- Scss



## Deploy

### Github Pages

1. Change `base` default value from `/` to `./` in  `vite.config.ts` 
2. Change the `history` mode from `createWebHistory` to `createWebHashHistory`  in `src/router.ts`

### Nginx

1. Set `base` value to `/` in `vite.config.ts`
2. Set `history` mode to `createWebHistory` in `src/router.ts`



## Tips

Pay more attention on  `Global.ts` file



## License

<p>
<a href="LICENSE">MIT License</a>
</p>
