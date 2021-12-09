<example>
禁用状态
</example>
<template>
  <jeremy-switch v-model:value="isActive" :disabled="disabled" />
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
    const disabled = ref(true);
    return { isActive, disabled };
  },
};
</script>