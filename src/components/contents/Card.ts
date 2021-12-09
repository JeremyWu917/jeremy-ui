import JeremyComponent1 from "../examples/Card/Card1.example.vue";
import JeremyComponent2 from "../examples/Card/Card2.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
  ],
  attributes: [
    { attr: 'color', desp: '外边框颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' }
  ]
};