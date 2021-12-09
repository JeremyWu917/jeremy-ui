<example>
基础用法
</example>
<template>
  <jeremy-button class="btn">通常按钮</jeremy-button>
  <jeremy-button class="btn" level="plain">朴素按钮</jeremy-button>
  <jeremy-button class="btn" level="primary">主要按钮</jeremy-button>
  <jeremy-button class="btn" level="success">成功按钮</jeremy-button>
  <jeremy-button class="btn" level="info">信息按钮</jeremy-button>
  <jeremy-button class="btn" level="warning">警告按钮</jeremy-button>
  <jeremy-button class="btn" level="danger">危险按钮</jeremy-button>
</template>
<script lang="ts">
import JeremyButton from "../../../lib/Button.vue";
export default {
  components: {
    JeremyButton,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin: 1px;
}
</style>
