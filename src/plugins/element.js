import Vue from 'vue'
import { Button,Input,Menu,MenuItem,MenuItemGroup,Submenu,Breadcrumb,BreadcrumbItem,Card} from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Message } from 'element-ui'
import { Container,Header,Aside,Main,Row,Col} from 'element-ui'

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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
