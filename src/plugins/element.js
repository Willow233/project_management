import Vue from 'vue'
import { Button,Input,Menu,MenuItem,MenuItemGroup,Submenu} from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Message } from 'element-ui'
import { Container,Header,Aside,Main } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message = Message
