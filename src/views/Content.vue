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
import JeremyIcons from "../components/contents/Icon"

import { ref } from "vue";
import JeremyCard from "../lib/Card.vue";
import JeremyTable from "../lib/Table.vue";
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
  Icon: JeremyIcons,
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