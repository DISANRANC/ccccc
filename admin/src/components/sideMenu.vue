<template>
    <div>
        <!-- :route="{name: item.path}" -->
        <!-- <div>侧边菜单</div> -->
        <!-- default-active	当前激活菜单的 index -->
        <!-- unique-opened	是否只保持一个子菜单的展开 -->
        <!-- select	菜单激活回调	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path -->
        <!-- index	唯一标志	string   必须的 -->
         <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu :default-active="select" class="el-menu-vertical-demo" :router="true" :unique-opened="true" @select="handleSelect">
            <el-menu-item>
                <span slot="title" class="luobo">萝卜多后台管理系统</span>
                <!-- <div>{{$route.path}}</div> -->
            </el-menu-item>
            <el-submenu :index="item.index" v-for="(item,index) in menus" :key="index">
                <template slot="title">
                    <font-awesome-icon icon="pencil-alt" style="margin-right: 10px;"></font-awesome-icon>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(item,index) in item.items" :key="index" :index="item.name" :route="{name: item.path}"
                :class="{select: select===item.name}"> 
                    {{item.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{
            menus: [
                {
                    name: '后台管理',
                    index: '1',
                    items: [
                        {
                            name: '模块管理',
                            path: 'daa'
                        },
                        {
                            name: '角色管理',
                            path: 'mock'
                        },
                        {
                            name: '密码修改',
                        },
                        {
                            name: '账户管理',
                        }
                    ]
                },
                {
                    name: '信息管理',
                    index: '2',
                    items: [
                        {
                            name: '公司列表',
                            path: 'zuJian'
                        },
                        {
                            name: '职位列表',
                            path: 'hook'
                        }
                    ]    
                },
                {
                    name: '内容管理',
                    index: '3',
                    items:[
                        { name: 'Article列表',
                          path: 'Article'
                        }
                    ]
                }
            ],
            select: '', // 当前选择的菜单
        }
    },
    created(){
        this.select = sessionStorage.select?JSON.parse(sessionStorage.select):'';
        console.log(this.select)
        console.log(this.$route.path)
        // sessionStorage.clear()
    },
    methods:{
        handleSelect(index,indexPath){
            console.log(index)
            console.log(this.$route.path)
            console.log(indexPath)
            this.select = index;
            sessionStorage.setItem("select",JSON.stringify(this.select));
        }
    }
}
</script>
<style>
    .el-menu {
        border: none;
        background: none;
    }

    .el-submenu__title,
    .el-menu-item,.el-submenu__icon-arrow,.el-icon-arrow-down {
        color: #fff !important;
    }

    .el-menu-item:hover,
    .el-submenu__title:hover {
        background: #feae45;
    }
    .el-menu-item:focus{
        background: transparent;
    }
</style>
<style lang="scss" scoped>
    .select {
        color: #fff;
        background-color: #feae45;
    }

    .el-menu-vertical-demo {
        @include w-h(250px, 100vh);
        background-color: transparent;
    }
    // .is-active{
    //     border-bottom: solid #fdbb6b 1px;
    // }
    .luobo {
        height: 50px;
        font-size: 18px;
        color: white;
        font-weight: 700;
    }
</style>