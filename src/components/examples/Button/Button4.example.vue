<example>
加载中
</example>
<template>
  <jeremy-button class="btn" :loading="loading">加载中</jeremy-button>
  <jeremy-button class="btn">加载完成</jeremy-button>
</template>
<script lang="ts">
import { ref } from "vue";
import JeremyButton from "../../../lib/Button.vue";
export default {
  components: {
    JeremyButton,
  },
  setup() {
    const loading = ref(true);
    return { loading };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin: 1px;
}
</style>
