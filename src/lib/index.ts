import JeremyButton from './Button.vue'
import JeremyCard from './Card.vue'
import JeremyDialog from './Dialog.vue'
import JeremyInput from './Input.vue'
import JeremySwitch from './Switch.vue'
import JeremyTable from './Table.vue'
import JeremyTab from './Tab.vue'
import JeremyTabs from './Tabs.vue'

export { JeremyButton, JeremyCard, JeremyDialog, JeremyInput, JeremySwitch, JeremyTable, JeremyTab, JeremyTabs, }
export { createDialog as createDialog } from './createDialog'

export default {
  install: Vue => {
    const components = [JeremyButton, JeremyCard, JeremyDialog, JeremyInput, JeremySwitch, JeremyTable, JeremyTab, JeremyTabs]
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
