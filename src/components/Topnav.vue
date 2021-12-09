<template>
  <div class="topnav">
    <router-link to="/" class="logo">
      <img src="../assets/logo.png" alt="首页" />
    </router-link>
    <ul class="menu">
      <li>
        <router-link to="/document">
          <img src="../assets/document.png" alt="文档" />
        </router-link>
      </li>
    </ul>
    <svg v-if="toggleMenuButtonVisible" class="toggleAside" @click="toggleMenu">
      <use xlink:href="#icon-menu"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
export default {
  props: {
    toggleMenuButtonVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const menuVisible = inject<Ref<boolean>>("menuVisible");
    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };
    return {
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
$color: #8c6fef;
.topnav {
  color: $color;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 97%,
    #8c6fef 97%,
    #8c6fef 100%
  );
  padding: 0 32px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  justify-content: center;
  align-items: center;
  > .logo {
    max-width: 6em;
    margin-right: auto;
    > svg {
      width: 80px;
      height: 80px;
    }
    > img {
      height: 80px;
    }
  }
  > .menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    > li {
      margin: 0 1em;
      > a {
        > svg {
          width: 32px;
          height: 32px;
        }
        > img {
          height: 80px;
        }
      }
    }
  }
  > .toggleAside {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    > .menu {
      display: none;
    }
    > .logo {
      margin: 0 auto;
    }
    > .toggleAside {
      display: inline-block;
    }
  }
}
img {
  padding: 6px 0;
}
</style>
