<example>
不同尺寸
</example>
<template>
  <span>小号</span>
  <jeremy-switch v-model:value="isActive[0]" size="small" />
  <br />
  <br />
  <span>中号</span>
  <jeremy-switch v-model:value="isActive[1]" />
  <br />
  <br />
  <span>大号</span>
  <jeremy-switch v-model:value="isActive[2]" size="large" />
</template>
<script lang="ts">
import JeremySwitch from "../../../lib/Switch.vue";

import { ref } from "vue";
export default {
  components: {
    JeremySwitch,
  },
  setup() {
    const isActive = ref([false, false, false]);
    return { isActive };
  },
};
</script>
