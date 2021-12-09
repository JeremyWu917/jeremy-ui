<template>
  <template v-if="visible">
    <teleport to="body">
      <div class="jeremy-dialog-overlay" @click="close"></div>
      <div class="jeremy-dialog">
        <header class="jeremy-dialog-header">
          {{ title }}
          <span class="jeremy-dialog-close" @click="close"></span>
        </header>
        <div class="jeremy-dialog-divider" />
        <main class="jeremy-dialog-main">
          <slot></slot>
        </main>
        <div class="jeremy-dialog-divider" />
        <footer class="jeremy-dialog-footer">
          <jeremy-button level="plain" @click="close">取消</jeremy-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <jeremy-button @click="task" :loading="loading">确定</jeremy-button>
        </footer>
      </div>
    </teleport>
  </template>
</template>

<script lang="ts">
import { ref, SetupContext } from "vue";
import JeremyButton from "./Button.vue";

declare const props: {
  visible: boolean;
  title: string;
  ok: () => boolean;
  cancel: () => boolean;
};
declare const context: SetupContext;

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    ok: {
      type: Function,
      default: () => {
        return true;
      },
    },
    cancel: {
      type: Function,
      default: () => {
        return true;
      },
    },
  },
  components: {
    JeremyButton,
  },
  setup(props, context) {
    const loading = ref(false);
    const close = () => {
      if (loading.value) {
        return;
      }
      new Promise((resolve, reject) => {
        resolve(props.cancel());
      }).then((result) => {
        if (result !== false) {
          context.emit("update:visible", false);
        }
      });
    };
    const task = () => {
      new Promise((resolve, reject) => {
        loading.value = true;
        resolve(props.ok());
      }).then((result) => {
        if (result === true) {
          loading.value = false;
          context.emit("update:visible", false);
        }
      });
    };
    return { loading, close, task };
  },
};
</script>

<style lang="scss">
.jeremy-dialog-overlay {
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  background: fade-out($color: #000000, $amount: 0.7);
  width: 100vw;
  height: 100vh;
}
.jeremy-dialog {
  z-index: 20;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 200px;
  border-radius: 8px;
  background: white;
  display: flex;
  flex-direction: column;
  > * {
    padding: 8px;
  }
  > .jeremy-dialog-divider {
    border: 1px solid #8c6fef;
    padding: 0;
  }
  > .jeremy-dialog-header {
    display: flex;
    justify-content: space-between;
    > .jeremy-dialog-close {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        background: black;
        width: 100%;
        top: 50%;
        left: 50%;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
  > .jeremy-dialog-main {
    flex-grow: 1;
    background: white;
  }
  > .jeremy-dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
