<template>
    <div>
        <h1>我是A</h1>
        <button @click="getZ">爸爸</button>{{count}}
        <p>获取爸爸的数据：{{baba}}</p>
        <button @click="getB">弟弟</button>
        <p>获取弟弟的数据：{{didi}}</p>
        <button @click="getC">侄儿</button>
        <p>获取侄儿的数据：{{zhier}}</p>
        <slot></slot>
        <slot name="A"></slot>
        <slot name="B"></slot>
        <slot name="C" :ren="say"></slot>
    </div>
</template>
<script>
    import eventBus from "@/utils/eventBus.js";
    export default {
        props: ['data'],
        data() {
            return {
                zujianA: '我是A的数据',
                b: '',
                c: '',
                baba: '',
                didi: '',
                zhier: '',
                say:{
                    name: '艾克',
                    age: 18,
                    job: '法师'
                }
            }
        },
        computed:{
            count(){
                return this.$store.state.count;
            }
        },
        // computed:{
        //     b(){
        //         return this.params;  // 也有监听效果，在父级数据还是初始值未发生变动就会生效，还有缓存效果
        //     }
        // },
        // watch: {
        //     data(val) {
        //         console.log(val)
        //         this.baba = this.data; // 监听父级的数据，只有父级数据变动时才会生效
        //     }
        // },
        created() { 
            this.$emit('methodA', this.zujianA);
        },
        mounted() {
            eventBus.$on('methodBd', (data) => {
                console.log(data)
                this.didi = data;
            });
            eventBus.$on('methodC', (data) => {
                console.log(data)
                this.zhier = data;
            });
            // 4,接收数据方，通过mounted(){}触发bus.$on(方法名，
            //function(接收数据的参数){用该组件的数据接收传递过来的数据})，此时函数中的this已经发生了改变，可以使用箭头函数
            // eventBus.$on('methodBd', function (data) {
            //     console.log(this)
            // });
            this.baba = this.data;
            // eventBus.$emit('methodA',this.zujianA);
            eventBus.$emit('methodAA', this.zujianA)
        },
        methods: {
            // 传给父组建Z
            passZ() {
                // this.$emit('methodA', this.zujianA);
            },
            // 获取Z
            getZ() {
                // this.baba = this.data;
            },
            // 获取B
            getB() {
                // this.baba = this.data.a;
            },
            // 获取C
            getC() {
                // this.baba = this.data.a;
            },
        }
    }
</script>
<style lang="scss" scoped>
    button {
        margin-top: 15px;
        @include w-h(100px, 45px);
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