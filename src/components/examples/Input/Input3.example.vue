<example>
禁用
</example>
<template>
  <jeremy-input v-model:value="value" placeholder="请输入" disabled />
</template>
<script lang="ts">
import { ref } from "vue";
import JeremyInput from "../../../lib/Input.vue";
export default {
  components: {
    JeremyInput,
  },
  setup() {
    const value = ref("");
    return { value };
  },
};
</script>