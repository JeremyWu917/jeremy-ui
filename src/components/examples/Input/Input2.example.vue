<example>
textarea
</example>
<template>
  <jeremy-input
    class="sample-input"
    theme="textarea"
    v-model:value="value"
    placeholder="请输入"
  />
  <br />
  <br />
  <div>同步值：{{ value }}</div>
</template>
<script lang="ts">
import { ref } from "vue";
import JeremyInput from "../../../lib/Input.vue";
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
<style lang="scss" scoped>
.sample-input {
  width: 400px;
}
</style>