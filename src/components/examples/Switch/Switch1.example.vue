<example>
基础用法
</example>
<template>
  <jeremy-switch v-model:value="isActive" />
</template>
<script lang="ts">
import { JeremySwitch } from "jeremy-ui";

import { ref } from "vue";
export default {
  components: {
    JeremySwitch,
  },
  setup() {
    const isActive = ref(false);
    return { isActive };
  },
};
</script>