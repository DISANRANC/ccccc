import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mock";

import messageBox from '@/utils/message.js';
Vue.prototype.$messageBox = messageBox;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import {
    library
} from '@fortawesome/fontawesome-svg-core';
import {
    faUserSecret,
    faArrowLeft,
    faUser,
    faCircle,
    faUserLock,
    faLock,
    faPowerOff,
    faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
    faQq
} from '@fortawesome/free-brands-svg-icons';
import {
    faTimesCircle,
    faSquare
} from '@fortawesome/free-regular-svg-icons';
import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'; // 三个库

library.add(
    faUserSecret, faArrowLeft, faUser, faQq,
    faCircle, faUserLock, faLock, faTimesCircle,
    faSquare, faPowerOff, faPencilAlt); // 从三个库引入的图片添加到本地的图库

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
import '@/assets/iconFont/iconfont.css'//阿里云图标

import VueQuillEditor from 'vue-quill-editor'; // 富文本编辑
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);

// 过滤器
import * as filters from '@/filter/filter.js'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    console.log(to.name)
    console.log(from.name)
    if (store.state.ma.role) {
        console.log(123)
        let data = store.state.ma;
        store.commit('loginIn', data);
        next()
    } else {
        if (to.name === 'login') {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");