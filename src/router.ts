import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Document from './views/Document.vue'
import { guidances, components } from './Global'
import Guidance from './views/Guidance.vue'
import Content from './views/Content.vue'

function Route(path, component, props) {
  this.path = path
  this.component = component
  this.props = props
}

const guidancesRoutes = Object.keys(guidances).map(item => {
  return new Route(item, Guidance, guidances[item])
})
const componentsRoutes = Object.keys(components).map(item => {
  return new Route(item.toLowerCase(), Content, components[item])
})

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/document', component: Document, children: [
        { path: '', redirect: '/document/introduction' },
        ...guidancesRoutes,
        ...componentsRoutes
      ]
    }
  ]
})
export default router
