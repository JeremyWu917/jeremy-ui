<example>
禁用状态
</example>
<template>
  <jeremy-button class="btn" disabled>通常按钮</jeremy-button>
  <jeremy-button class="btn" level="plain" disabled>朴素按钮</jeremy-button>
  <jeremy-button class="btn" level="primary" disabled>主要按钮</jeremy-button>
  <jeremy-button class="btn" level="success" disabled>成功按钮</jeremy-button>
  <jeremy-button class="btn" level="info" disabled>信息按钮</jeremy-button>
  <jeremy-button class="btn" level="warning" disabled>警告按钮</jeremy-button>
  <jeremy-button class="btn" level="danger" disabled>危险按钮</jeremy-button>
</template>
<script lang="ts">
import {JeremyButton} from "jeremy-ui";
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
