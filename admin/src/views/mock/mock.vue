<template>
    <div>
        <div class="panel">
            <h1>mock</h1>
            <button type="button" @click="mock">获取mock数据</button>
            <button type="button" @click="fu">获取数组</button>
            <div style="display: flex;flex-wrap: wrap;">
                <div v-for="(item,index) in mockData" :key="index">
                <div>{{item.title}}</div>
                <div>{{item.author_name}}</div>
                <div>{{item.date}}</div>
                <div>
                    <img :src="item.imgSrc" alt="" style="width: 300px;height: 220px">
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
    import httpAxios from '../../config/axios';
    import axios from 'axios';
    import qs from 'qs';
    export default {
        data() {
            return {
                mockData: [],
                state: true
            }
        },
        methods: {
            mock() {
                this.state = !this.state;
                axios.post('/mockjs',this.state)
                    .then(res => {
                        console.log(res)
                        this.mockData = res.data._data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            fu(){
                let arr =new Array(5);
                // 2-32随机
                this.random();
                arr.push(this.random)
                console.log(arr)
            },
            random(){
                let num = Math.ceil(Math.random()*32)
                if(num >= 2){
                    return num
                }else{
                    return this.random()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .panel {
        padding-top: 30px;
        min-height: calc(100vh - 90px);
        background-color: #f5f5f5;

        h1 {
            text-align: center;
        }
    }

    button {
        margin-top: 15px;
        @include w-h(150px, 45px);
        // padding: 10px 8px;
        font-size: 18px;
        font-weight: 500;
        border: 1px solid transparent;
        border-radius: 5px;
        color: #FFFFFF;
        background-color: #fd9f2a;
        white-space: nowrap;
        line-height: 1;

        &:hover {
            box-shadow: 0px 1px 6px #888888;
        }

        &:focus {
            border-color: transparent !important;
            box-shadow: 0px 1px 6px #888888 !important;
        }
    }
</style>