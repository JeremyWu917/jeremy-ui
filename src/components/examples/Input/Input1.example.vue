<example>
基础用法
</example>
<template>
  <jeremy-input v-model:value="value" placeholder="请输入" />
  <br />
  <br />
  <div>同步值：{{ value }}</div>
</template>
<script lang="ts">
import { ref } from "vue";
import { JeremyInput } from "jeremy-ui";
export default {
  components: {
    JeremyInput,
  },
  setup() {
    const value = ref("something");
    return { value };
  },
};
</script>