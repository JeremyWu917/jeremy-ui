import JeremyComponent1 from "../examples/Icon/Icon1.example.vue";

export default {
  components: [
    JeremyComponent1,
  ],
  attributes: [
    { attr: 'color', desp: '外边框颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' }
  ]
};