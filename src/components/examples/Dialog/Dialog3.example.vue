<example>
一行代码打开对话框
</example>
<template>
  <jeremy-button @click="showDialog">打开对话框</jeremy-button>
</template>
<script lang="ts">
import JeremyButton from "../../../lib/Button.vue";
import createDialog from "../../../lib/createDialog";

export default {
  components: {
    JeremyButton,
  },
  setup() {
    const ok = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("ok");
          resolve(true);
        }, 1000);
      });
    };
    const cancel = () => {
      console.log("cancel");
    };
    const showDialog = () => {
      createDialog({
        title: "一行打开",
        content: "我是一行代码打开的对话框",
        ok,
        cancel,
      });
    };
    return { showDialog };
  },
};
</script>