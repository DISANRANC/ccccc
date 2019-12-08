<template>
<div>
    <form class="login">
        <div class="logo"></div>
            <div class="container">
                <font-awesome-icon icon="user" class="icon"></font-awesome-icon>
                <input type="text" placeholder="用户名" v-model="user.name"/>
            </div>
            <div class="container">
                <font-awesome-icon icon="lock" class="icon"></font-awesome-icon>
                <input type="password" placeholder="密码" v-model="user.pwd"/>
            </div>
            <button @click.prevent="login">登&emsp;录</button>
    </form>
</div>
</template>
<script>
import http from '@/api/login/login.js';
import Cookies from 'js-cookie';
export default {
    data(){
        return{
            user:{
                name: '',
                pwd: '',
            }
        }
    },
    created(){
    },
    methods:{
        login(){
            if(this.user.name === '' && this.user.pwd === ''){
                this.$messageBox('账密不能为空','error');
                return;
            }else if(this.user.name === ''){
                this.$messageBox('账号不能为空','error');
                return;
            }else if(this.user.pwd === ''){
                this.$messageBox('密码不能为空','error');
                return;
            }
            http.httpLogin(this.user)
            .then(
                res=>{
                    let news = res.data.message;
                    let code = res.data.code;
                    let data = {
                        manager: res.data.data.manager.name,
                        role: res.data.data.role.name
                    }
                    if(code === -5003){
                        this.user.name = '';
                        this.user.pwd = '';
                        this.$messageBox(news,'error');
                    }else if(code === -5004){
                        this.user.pwd = '';
                        this.$messageBox(news,'error');
                    }else if(code === 0){
                        console.log(data)
                        this.$store.commit('loginIn',data);
                        this.$messageBox(news,'success');
                        this.$router.push({
                            path: "/Home"
                        });
                    }
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
:focus{
    box-shadow: none !important;
}
.login {
        position: absolute;
        top: 50%;
        left: 50%;
        // margin-top: 0;
        // margin-left: 0;
        transform: translate(-50%, -50%);
        padding: 45px 26px 16px 26px;
        border-radius: 5px;
        color: #ccc;
        background: #fff;

        .logo{
            position: absolute;
            top: -38px;
            left: 97px;
            @include w-h(76px,76px);
            border-radius: 50%;
            background: url(../../assets/login-logo.png);
            box-shadow: 0 -3px 7px rgba(160, 160, 160, 0.5);
        }

        .container {
            margin: 10px 0;
            border: 1px solid;
            @include w-h(218px, 30px);
            @include flex(flex-start,center);
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #e8f0fe;
            input{
            padding-left: 10px;
            border: none;
            border-left: 1px solid #ccc;
            color: #fd9f2a;
            outline: none;
            box-shadow: 0 0 0px 1000px #e8f0fe inset;
            background-color: #e8f0fe;
            &::placeholder{
                color: #ccc;
            }
            &:focus {
                border-color: #fd9f2a;
            }
        }
            
        }

        .icon{
            margin: 0 8px;
        }

        button{
            margin-top: 20px;
            padding: 11px 0;
            border-radius: 5px;
            width: 100%;
            color: #fff;
            background-color: #fd9f2a;
            border-color: #fd9f2a;
            border: none;
            outline: none;
        }
    }
</style>
