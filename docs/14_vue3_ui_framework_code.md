

## Vue3 UI  Framework - 优化代码

> 回头看下整个项目，代码冗余非常严重，所以接下来我们把代码重新梳理优化一下
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 全局设定

为了后续查阅和管理的方便，我们对全局的用例进行一个简单的设定

我们在 `src` 目录下创建一个 `Global.cs` 文件，代码如下:

```typescript
export const components = {
  'Button': {
    name: 'Button', title: 'Button 按钮'
  },
  'Card': {
    name: 'Card', title: 'Card 卡片'
  },
  'Dialog': {
    name: 'Dialog', title: 'Dialog 对话框'
  },
  'Input': {
    name: 'Input', title: 'Input 输入框'
  },
  'Switch': {
    name: 'Switch', title: 'Switch 开关'
  },
  'Table': {
    name: 'Table', title: 'Table 表格'
  },
  'Tabs': {
    name: 'Tabs', title: 'Tabs 标签页'
  },
}
export const guidances = {
  'introduction': { path: "introduction", title: "介绍" },
  'install': { path: "install", title: "安装" },
  'start': { path: "start", title: "快速上手" }
}
```

> **注意**
>
> 通过这个文件, 我们能够清楚的知道本项目的主要文档页的信息

### 样式简化

每个 `src/component` 下的组件文档页都引用 `./example` 下对应的案例, 所以我们考虑将引用放在一起，然后再暴露给组件的文档页

接下来我们再新建一个 `src/component/contents` 文件夹，为每个组件新建对应的样例管理文件，并且该文件需要包含如下特性:

1. 所有样例的引入
2. 该样例专属的参数列表

下面我们以 `JeremyInput` 组件为例子说明一下:

首先我们在 `contents` 文件夹下创建 `Input.ts` 文件，内容如下:

```typescript
import JeremyComponent1 from "../examples/Input/Input1.example.vue";
import JeremyComponent2 from "../examples/Input/Input2.example.vue";
import JeremyComponent3 from "../examples/Input/Input3.example.vue";
import JeremyComponent4 from "../examples/Input/Input4.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    JeremyComponent3,
    JeremyComponent4,
  ],
  attributes: [
    { attr: 'value', desp: '绑定值', type: 'string', values: '字符串', default: '必填' },
    { attr: 'theme', desp: '类型', type: 'string', values: 'input / textarea', default: 'input' },
    { attr: 'rows ', desp: '行高，但当 theme 为 input 时值恒为1', type: 'number', values: '正整数', default: '5' },
    { attr: 'color', desp: '外边框颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' }
  ]
};
```

另外，我们需要将模板设置成遍历的方式，显然，每个组件文档页，都具有与 `Button` 组件文档页类似的结构

那么我们可以把这个结构抽取出来，然后按照需要进行引入

先抽取结构，我选择在 `src/views` 下新建 `Content.vue` 来承载这个结构

组件列表和参数表通过 `src/components/contents` 下的汇总来引入

引入后，根据字段名的不同，制作哈希表 `LabyMap`

再要求用户传入参数 `props`，通过 `name` 来指定选择要显示哪个组件文档页，通过 `title` 来指示现在的组件文档页的标题

```vue
<template>
  <h1>{{ title }}</h1>
  <br />
  <div
    class="container"
    v-for="({ ...component }, index) in components"
    :key="index"
  >
    <jeremy-card class="example">
      <h2>{{ component.__sourceCodeTitle }}</h2>
      <br />
      <component :is="component" />
      <br />
      <br />
      <code class="markdown-body">
        <pre
          v-if="visibility[index]"
          v-html="
            Prism.highlight(
              component.__sourceCode,
              Prism.languages.html,
              'html'
            )
          "
        ></pre>
      </code>

      <button class="toggle" @click="toggle(index)">
        <span class="close" v-if="visibility[index]">
          △
          <span class="desp">隐藏代码</span>
        </span>
        <span class="open" v-else>
          ▽
          <span class="desp">显示代码</span>
        </span>
      </button>
    </jeremy-card>
    <br />
  </div>
  <jeremy-table bordered>
    <thead>
      <tr>
        <th v-for="(head, index) in heads" :key="index">{{ head.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(attribute, index) in attributes" :key="index">
        <td v-for="key in keys" :key="key" v-html="attribute[key]"></td>
      </tr>
    </tbody>
  </jeremy-table>
</template>

<script lang="ts">
import JeremyButtons from "../components/contents/Button";
import JeremyCards from "../components/contents/Card";
import JeremyDialogs from "../components/contents/Dialog";
import JeremyInputs from "../components/contents/Input";
import JeremySwitchs from "../components/contents/Switch";
import JeremyTables from "../components/contents/Table";
import JeremyTabss from "../components/contents/Tabs";

import { ref } from "vue";
import { JeremyCard, JeremyTable } from "jeremy-ui"
import "prismjs";
// import "prismjs/themes/prism.css";

const Prism = (window as any).Prism;

const JeremyMap = {
  Button: JeremyButtons,
  Card: JeremyCards,
  Dialog: JeremyDialogs,
  Input: JeremyInputs,
  Switch: JeremySwitchs,
  Table: JeremyTables,
  Tabs: JeremyTabss,
};

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    JeremyCard,
    JeremyTable,
  },
  setup(props) {
    const { name, title } = props;
    const heads = [
      { name: "参数", identifier: "attr" },
      { name: "含义", identifier: "desp" },
      { name: "类型", identifier: "type" },
      { name: "可选值", identifier: "values" },
      { name: "默认值", identifier: "default" },
    ];
    const keys = heads.map((item: any) => item.identifier);

    const { components, attributes } = JeremyMap[name];
    const visibility = ref(components.map((item) => false));
    const toggle = (index) => {
      visibility.value[index] = !visibility.value[index];
    };
    return {
      title,
      Prism,
      heads,
      keys,
      components,
      attributes,
      visibility,
      toggle,
    };
  },
};
</script>
<style lang="scss" scoped>
$theme-color: #8c6fef;
.container {
  &:hover {
    > .example > .toggle > * > .desp {
      display: inline;
    }
  }
  > .example {
    > .toggle {
      display: block;
      width: 100%;
      height: 32px;
      border: none;
      transition: background-color 250ms;
      outline: none;
      &:focus {
        outline: none;
      }
      background: white;
      cursor: pointer;
      &:hover {
        background: fade-out($theme-color, 0.95);
      }
      > * > .desp {
        display: none;
      }
    }
  }
}
</style>
```

我们还可以抽取指南文档页的结构到 `src/views/Guidance.vue`

```vue
<template>
  <article class="markdown-body" v-html="md"></article>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const md = ref(null);
    import(`../markdown/${props.path}.md`).then(
      (res) => (md.value = res.default)
    );
    return { md };
  },
};
</script>
```

然后修改 `router.ts`，通过路由来传递参数

```typescript
import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Document from './views/Document.vue'
import { guidances, components } from './Global'
import Guidance from './views/Guidance.vue'
import Content from './views/Content.vue'

function Route(path, component, props) {
  this.path = path
  this.component = component
  this.props = props
}

const guidancesRoutes = Object.keys(guidances).map(item => {
  return new Route(item, Guidance, guidances[item])
})
const componentsRoutes = Object.keys(components).map(item => {
  return new Route(item.toLowerCase(), Content, components[item])
})

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/document', component: Document, children: [
        { path: '', redirect: '/document/introduction' },
        ...guidancesRoutes,
        ...componentsRoutes
      ]
    }
  ]
})
export default router
```

### 优化路由

这个 `router.ts` 看起来也还是很混乱，也需要再优化一下

注意到重复的部分出现在 `children` 字段下，而该字段的值是个数组，每个数组项都是一个包含 3 个字段的对象

那么我们可以先定义这个对象:

```typescript
function Route(path, component, props) {
    this.path = path
    this.component = component
    this.props = props
}
```

再观察指南的路由，和组件的路由，有如下规律

1. 指南的路由
   - 其 `path` 值集合，与 `Global.ts` 中的 `guidances` 对象的 `keys` 是一致的
   - 其 `props` 中传入的键集合，与 `Global.ts` 中的 `guidances` 对象的 `keys` 是一致的
2. 组件的路由
   - 其 `path` 值集合，与 `Global.ts` 中的 `components` 对象的 `keys.toLowerCase` 是一致的
   - 其 `props` 中传入的键集合，与 `Global.ts` 中的 `components` 对象的 `keys` 是一致的

那么容易得到指南路由的数组和组件路由的数组

```typescript
const guidancesRoutes = Object.keys(guidances).map(item => {
    return new Route(item, Guidance, guidances[item])
})
const componentsRoutes = Object.keys(components).map(item => {
    return new Route(item.toLowerCase(), Content, components[item])
})
```

然后在路由配置的 `children` 字段下，使用 spread 语法展开这两个数组即可

```typescript
const router = createRouter({
    history,
    routes: [
        { path: '/', component: Home },
        {
            path: '/document', component: Document, children: [
                { path: '', redirect: '/document/introduction' },
                ...guidancesRoutes,
                ...componentsRoutes
            ]
        }
    ]
})
```

OK，现在的代码，几乎没有冗余了

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee: