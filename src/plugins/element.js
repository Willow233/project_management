import Vue from 'vue'
import { Button,
    Input,
    Menu,MenuItem,MenuItemGroup,Submenu,
    Breadcrumb,BreadcrumbItem,
    Card,
    Form,FormItem,
    Message,
    Container,Header,Aside,Main,Row,Col,
    Table,TableColumn,Switch,Tooltip,Pagination,Dialog,Tag,
    MessageBox,Tree,Select,Option,Cascader,Avatar

} from 'element-ui'



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
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Avatar)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
