

## Vue3 UI  Framework - 完工部署

> 项目官网也基本完成了，接下来我们再讲一下如何将项目官网部署到 `GitHub Pages` 上
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 项目配置

常见的模式有三种,即

- `History` 模式
- `Hash` 模式
- `Memory` 模式

在我们的项目中采用的是 `vue-router`， `vue-router` 有两种模式， 即 `History` 和 `Hash` 模式。

三者的区别与联系这里不再赘述，感兴趣的小伙伴可以自行查询。

为了简单快捷的部署，这里我们采用 `Hash` 模式将项目官网部署到 `GitHub Pages` 

#### 注意

> 不同的模式下，默认引用路径和 `vue-router` 的配置不同

- `History` 模式
  - `vite.config.ts` 中的 `base` 字段为 `'/'`
  - `src/router.ts` 中的 `history` 为 `createWebHistory`
- `Hash` 模式
  - `vite.config.ts` 中的 `base` 字段为 `'./'`
  - `src/router.ts` 中的 `history` 为 `createWebHashHistory`

### 打包构建

配置好以后打包构建即可，在此之前我们需要先配置一下 `build` 之后文件的默认引用路径。

打开 `vite.config.ts` ，更新 `export default` 对象属性如下:

```typescript
export default {
    base: './',  //默认引用路径
    assetsDir: 'assets',
}
```

> **注意**
>
> 我们要将项目部署到 `GitHub Pages` , 所以我们需要使用 `hash` 模式
>
> > 更新 `vite.config.ts` 中的 `base` 字段为 `'./'`
> >
> > 更新 `src/router.ts` 中的 `history` 为 `createWebHashHistory`

在执行完 `npm run build` 之后，`dist` 目录生成如下文件：

![image-20211227092019748](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211227092019748.png)

这些文件就可以部署了。

### 部署

我们可以根据自己的实际情况进行选择部署，通常有如下几种选择：

1. `GitHub Pages`
2. `Gitee Pages`
3. 自己的服务器

`GitHub Pages` 服务器在国外，国内访问比较慢，有时候会打不开。重新提交代码部署后会自动更新部署页。

`Gitee Pages` 服务器在国内，国内访问比较快。重新提交代码部署后不会自动更新部署页，需要手工更新。

自己的服务器，随意 :laughing:

#### 自动化部署脚本

为了后续的方便部署，我们这里创建一个自动化部署脚本，实现一键部署：

在项目的根目录下创建 `publish-github-pages.sh` 文件，内容如下：

```bash
rm -rf dist &&
npm run build &&
cd dist &&
git init &&
git add . &&
git commit -m "update and publish jeremy-ui" &&
git branch -M publish &&
git remote add origin git@github.com:JeremyWu917/jeremy-ui.git &&
git push -f -u origin publish &&
cd -
echo https://jeremywu917.github.io/jeremy-ui/index.html
```

> **注意**
>
> 如果你的部署完成后无法打开界面，那么要先确认下 `build` 后生成的文件是否加密了，先解密后再上传试试 :laughing:

部署完成后就可以在 `GitHub` 对应的 `repo` 里 `Pages`上看到了。

现在我们就可以通过 https://jeremywu917.github.io/jeremy-ui/ 进行官网的访问了 :rocket:

![image-20211227102944282](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211227102944282.png)

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee: