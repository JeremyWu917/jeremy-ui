import { createApp, h } from 'vue'
import JeremyDialog from './Dialog.vue'
export const createDialog = options => {
  const { title, content, ok, cancel } = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const close = () => {
    app.unmount(div)
    div.remove()
  }
  const app = createApp({
    render() {
      return h(JeremyDialog, {
        visible: true,
        'onUpdate:visible': newVisible => {
          if (newVisible === false) {
            close();
          }
        },
        title,
        ok, cancel
      }, { default() { return content } })
    }
  })
  app.mount(div)
}
