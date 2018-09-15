// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/pages/Main'
import store from './store'
import router from './router'
import fastclick from 'fastclick'
import {NoticeBar, Search, SubmitBar, Card, Icon, Cell, CellGroup, Dialog, Tabbar, TabbarItem, Stepper, PullRefresh, Tab, Tabs, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar} from 'vant'

Vue.use(NoticeBar).use(Search).use(SubmitBar).use(Card).use(Icon).use(Cell).use(CellGroup).use(Dialog)
.use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs)
.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
