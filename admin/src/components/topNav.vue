<template>
    <div>
        <el-header class="topNav">
            <div class="right">
                <span>{{userData.manager}}</span>
                <span>丨</span>
                <span>{{userData.role}}</span>
                <span>丨</span>
                <span @click="logout">
                    <font-awesome-icon color="#feb454" icon="power-off"></font-awesome-icon>
                </span>
            </div>
        </el-header>
    </div>
</template>
<script>
import http from '@/api/logout/logout.js';
import Cookies from 'js-cookie';
export default {
    data(){
        return{
        }
    },
    computed: {
        userData(){
            return this.$store.state.ma;
        }
    },
    created(){
        console.log(this.userData)
    },
    methods:{
        logout(){
            http.logoutHttp()
            .then(res=>{
                if(res.data.code === 0){
                    this.userData.name = '',
                    this.userData.role = '',
                    Cookies.remove('manager');
                    Cookies.remove('role');
                    this.$messageBox('登出成功','success');
                    this.$router.push({path: '/'});
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.topNav{
    @include flex(flex-end,center);
    height: 50px;
    box-shadow: 0 0 6px #e3e2e2 !important;
    background-color: #ffffff;
    border-color: #e3e2e2;
}
.right{
    margin-right: 15px;
}
span{
    padding: 0 15px;
    font-size: 14px;
    color: #337ab7;
}
</style>