import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);
// 解决重复导航报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
 
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "login",
            component: () => import("./views/login/login.vue")
        },
        {
            path: "/Home",
            redirect: "/Home/weCome",
            name: "home",
            props: true,
            component: () => import("@/views/Home.vue"),
            children: [{
                path: "weCome",
                name: "weCome",
                component: () => import("@/views/weCome.vue")
            },
                {
                    path: "Article",
                    name: "Article",
                    component: ()=> import("@/views/adminMange/Article.vue")
                },
                {
                    path: "aaa",
                    name: "daa",
                    component: ()=>import("@/views/adminMange/aaa.vue")
                },
                {
                    path: "ArticleDetail",
                    name: "ArticleDetail",
                    component: ()=> import("@/views/adminMange/ArticleDetail.vue")
                },
                {
                    path: 'zuJian',
                    name: 'zuJian',
                    component: ()=> import("@/views/demo/zuJian.vue")
                },
                {
                    path: 'hook',
                    name: 'hook',
                    component: ()=> import("@/views/demo/hook.vue")
                },
                {
                    path: 'mock',
                    name: 'mock',
                    component: ()=> import("@/views/mock/mock.vue")
                }
            ]
        },
    ]
});
export default router;