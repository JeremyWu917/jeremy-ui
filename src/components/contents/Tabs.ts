import JeremyComponent1 from "../examples/Tabs/Tabs1.example.vue";
import JeremyComponent2 from "../examples/Tabs/Tabs2.example.vue";
import JeremyComponent3 from "../examples/Tabs/Tabs3.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    JeremyComponent3,
  ],
  attributes: [
    { attr: 'direction', desp: '方向', type: 'string', values: 'row / column', default: 'row' },
    { attr: 'selected', desp: '默认选中', type: 'string', values: '子项的 name', default: '必填' },
    { attr: 'color', desp: '颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' },
  ]
};