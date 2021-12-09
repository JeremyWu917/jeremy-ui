<example>
纵向排列
</example>
<template>
  <jeremy-tabs v-model:selected="selected" direction="column">
    <jeremy-tab title="标签页1" name="first"> 我是第一页的内容 </jeremy-tab>
    <jeremy-tab title="标签页2" name="second"> 我是第二页的内容 </jeremy-tab>
  </jeremy-tabs>
</template>
<script lang="ts">
import { JeremyTab, JeremyTabs } from "jeremy-ui";

import { ref } from "vue";
export default {
  components: {
    JeremyTab,
    JeremyTabs,
  },
  setup() {
    const selected = ref("first");
    return { selected };
  },
};
</script>