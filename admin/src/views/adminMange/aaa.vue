<template>
    <div class="con">
        <h1>努力</h1>
        <div style="text-align: center;">
            <input v-model="a" v-focus="true" style="border: 1px solid;">
            <input v-model="b" style="border: 1px solid;margin-bottom: 30px;">
            <input v-model="c" style="border: 1px solid;">
            <div @click="an">{{c}}</div>
            <div>
                <i class="iconfont icon-yonghu" style="font-size: 80px"></i>
            </div>
            <div>
                <i class="iconfont icon-xitongyewuguanli" style="font-size: 80px"></i>
            </div>
            
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                a: '艾',
                b: '克',
            }
        },
        watch: {
            // a: function(val){
            //     this.c = val + ' ' + this.b;
            // },
            // b: function(val){
            //     this.c = this.a + ' ' + val;
            // }
        },
        computed: {
            c: {
                get() {
                    return this.a + ' ' + this.b;
                },
                set(val) {
                    console.log(val)
                    let name = val.split(' ');
                    this.a = name[0];
                    this.b = name[name.length - 1];
                }
            }
        },
        methods: {
            an(){
                console.log(this.a)
                console.log(this.b)
                console.log(this.c)
            }
        },
        directives: {
            focus: {
                inserted: (el) => {
                    el.focus()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .con {
        padding-top: 30px;
        height: calc(100vh - 50px);
        background-color: #f5f5f5;
    }

    h1 {
        text-align: center;
    }
</style>