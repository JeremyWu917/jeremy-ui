import './index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'github-markdown-css'
import "prismjs/themes/prism-solarizedlight.css"
import JeremyUI from "jeremy-ui"
import 'jeremy-ui/lib/jeremy.css';

const app = createApp(App)
app.use(JeremyUI)
app.use(router)
app.mount('#app')
