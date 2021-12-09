<template>
  <div>
    <Topnav />
    <div class="banner">
      <h1>Jeremy UI</h1>
      <h2>JeremyWU 创建的 UI 组件库</h2>
      <p class="actions">
        <a href="https://github.com/JeremyWu917/jeremy-ui">
          <img
            src="../assets/github.png"
            alt="Github"
            style="transform: rotateY(180deg)"
          />
          Github
        </a>
        <router-link to="/document">
          <img src="../assets/goto.png" alt="开始" />
          开始
        </router-link>
      </p>
    </div>
    <div class="features">
      <ul>
        <li>
          <svg>
            <use xlink:href="#icon-Vue"></use>
          </svg>
          <h3>基于 Vue 3</h3>
          <p>使用了 Vue 3 全新特性</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-typescript"></use>
          </svg>
          <h3>基于 TypeScript</h3>
          <p>源代码采用 TypeScript 书写</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-fork"></use>
          </svg>
          <h3>具有亲和力的代码</h3>
          <p>新手也能轻松阅读的源代码</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Topnav from "../components/Topnav.vue";
export default {
  components: {
    Topnav,
  },
};
</script>

<style lang="scss" scoped>
$theme-color: #8c6fef;
$border-radius: 4px;
$color: white;
.banner {
  background: linear-gradient(
    145deg,
    rgb(232, 232, 235) 0%,
    rgb(193, 181, 235) 30%,
    rgb(136, 106, 235) 70%,
    rgb(108, 68, 240) 100%
  );
  clip-path: ellipse(80% 60% at 50% 40%);
}
.features {
  margin: 64px auto;
  padding: 0 16px;
  @media (min-width: 800px) {
    width: 800px;
    > ul {
      > li {
        width: 50%;
      }
    }
  }
  @media (min-width: 1200px) {
    width: 1200px;
    > ul {
      > li {
        width: 33.3333%;
      }
    }
  }
  @media (max-width: 800px) {
    > ul {
      flex-direction: column;
      align-items: center;
    }
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin: 16px 0;
      display: grid;
      justify-content: center;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;
      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }
      > h3 {
        grid-area: title;
        font-size: 28px;
      }
      > p {
        grid-area: text;
      }
    }
  }
}
.banner {
  color: $color;
  padding-top: 120px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > * {
    margin: 12px 0;
  }
  > .actions {
    padding: 8px 0;
    a {
      margin: 0 8px;
      display: inline-block;
      padding: 8px 24px;
      &:hover {
        text-decoration: none;
      }
      > img {
        display: block;
        width: 80px;
      }
      text-align: center;
    }
  }
}
</style>