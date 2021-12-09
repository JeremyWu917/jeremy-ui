<example>
不同颜色
</example>
<template>
  <jeremy-switch v-model:value="isActive" color="blue" />
</template>
<script lang="ts">
import JeremySwitch from "../../../lib/Switch.vue";

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