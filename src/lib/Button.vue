<template>
  <button
    class="jeremy-button"
    :theme="theme"
    :level="level"
    :size="size"
    :style="{ '--color': color }"
    :disabled="disabled"
    :loading="loading"
  >
    <div class="jeremy-button-mask"></div>
    <span class="jeremy-button-loadingIndicator" v-if="loading"></span>
    <slot></slot>
  </button>
</template>

<script lang="ts">
declare const props: {
  theme?: "button" | "link" | "text";
  level?:
    | "default"
    | "plain"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger";
  size?: "middle" | "small" | "large";
  color: string;
  disabled: boolean;
  loading: boolean;
};

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyButton",
  props: {
    theme: {
      type: String,
      default: "button",
    },
    level: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "middle",
    },
    color: {
      type: String,
      default: "#8c6fef",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
$theme-color: var(--color);
$base-mask: fade-out(#fff, 0.7);
$active-mask: fade-out(#fff, 0.5);
$h: 32px;
$radius: 4px;

@keyframes jeremy-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.jeremy-button {
  position: relative;
  display: inline-block;
  padding: 10px 16px;
  color: white;
  border-radius: $radius;
  border: none;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 250ms;
  outline: none;
  :focus {
    outline: none;
  }
  > .jeremy-button-mask {
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: $radius;
    &:hover {
      background: $base-mask;
    }
  }
  &[loading="true"],
  &[disabled] {
    cursor: not-allowed;
    > .jeremy-button-mask {
      pointer-events: none;
    }
  }
  > .jeremy-button-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-style: solid;
    border-width: 2px;
    animation: jeremy-spin 1s infinite linear;
  }
}

@mixin layout($color) {
  $loading-color: fade-out(black, 0.7);

  background: $color;

  &:active {
    > .jeremy-button-mask {
      background: $active-mask;
    }
  }
  > .jeremy-button-loadingIndicator {
    border-color: $loading-color $loading-color $loading-color transparent;
  }
  &[loading="true"],
  &[disabled] {
    > .jeremy-button-mask {
      background: $base-mask;
    }
  }
}
.jeremy-button[theme="button"] {
  $color: $theme-color;

  @include layout($color);
}
.jeremy-button:not([theme="button"]) {
  padding: 0;
  background: white;
  color: black;
  &:hover {
    color: $theme-color;
  }
}
.jeremy-button[theme="link"] {
  text-decoration: underline;
}
.jeremy-button[level="plain"] {
  $base-color: $theme-color;
  @include layout(white);
  color: black;
  > .jeremy-button-mask {
    border: 1px solid rgb(187, 187, 187);
  }

  &:not([loading="true"]):not([disabled]) {
    &:hover {
      > .jeremy-button-mask {
        border: 1px solid $base-color;
      }
      color: $base-color;
    }
  }
}
.jeremy-button[level="primary"] {
  $color: #29adfa;

  @include layout($color);
}
.jeremy-button[level="success"] {
  $color: rgb(103, 194, 58);

  @include layout($color);
}
.jeremy-button[level="info"] {
  $color: #808080;

  @include layout($color);
}
.jeremy-button[level="warning"] {
  $color: rgb(230, 162, 60);

  @include layout($color);
}
.jeremy-button[level="danger"] {
  $color: rgb(245, 108, 108);

  @include layout($color);
}
.jeremy-button[size="large"] {
  padding: 14px 24px;
}
.jeremy-button[size="small"] {
  padding: 6px 10px;
}
</style>
