<template>
  <div>
    <span class="jeremyui" :class="iconTag"></span>
    <slot></slot>
  </div>
</template>
   
<script>
import "../assets/iconfont/iconfont.css";
export default {
  name: "JeremyIcon",
  props: {
     
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconTag() {
      return `${this.name}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.jeremyui {
     
  font-family: "jeremyui" !important;
  font-size: 2em;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
