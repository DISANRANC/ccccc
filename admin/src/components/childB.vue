<template>
    <div>
        <div>
            <h1>我是B</h1>
            <button @click="getZ">爸爸</button>
            <p>获取爸爸的数据：{{baba}}</p>
            <button @click="getA">哥哥</button>
            <p>获取哥哥的数据：{{gege}}</p>
            <button>儿子</button>
            <p>获取儿子的数据：{{erzi}}</p>
        </div>
        <div>
            <childC ref="c" v-bind="$attrs" v-on="$listeners" :dataB="zujianB"></childC>
        </div>
    </div>
</template>
<script>
    import eventBus from "@/utils/eventBus.js";
    import childC from "@/components/childC.vue";
    export default {
        name: 'childB',
        components: {
            childC
        },
        data() {
            return {
                zujianB: '我是B的数据',
                // b: '',
                c: 1,
                baba: '',
                gege: '',
                erzi: ''
            };
        },
        inheritAttrs: false,
        computed: {
            b() {
                return this.params; // 也有监听效果，在父级数据还是初始值未发生变动就会生效，还有缓存效果
            }
        },
        // watch:{
        //     params(){
        //         this.b = this.params;   // 监听父级的数据，只有父级数据变动时才会生效
        //     }
        // },
        created(){
            console.log(this.$attrs)
             eventBus.$on('methodAA', (data) => {
                console.log(data)
                this.gege = data;
            });
        },
        mounted(){
            this.erzi = this.$refs['c'].zujianC;
            this.$emit('methodB',this.zujianB);
            eventBus.$emit('methodBd', this.zujianB);
            // eventBus.$on('methodA',(data)=>{
            //     console.log(data)
            //     this.gege = data;
            // });
             console.log(this.$attrs)
            this.baba = this.$attrs.data;
        },
        methods: {
            aa() {
                console.log(this.params)
                console.log(this.b)
                this.$messageBox(this.params, 'success')
                this.$emit('methodB', this.a)
            },
            // 1、 兄弟之间传递数据需要借助于事件车， 通过事件车的方式传递数据
            // 2、 创建一个Vue的实例， 让各个兄弟共用同一个事件机制。
            // 3、 传递数据方， 通过一个事件触发bus.$emit(方法名， 传递的数据)。
            bb() {
                // eventBus.$emit('methodBd', this.c++);
            },
            cc(val) {
                // val += 1;
                // this.$emit('methodB', val)
            },
             // 获取Z
            getZ(){
                // this.baba = this.$attrs.dataA;
            },
            // 获取A
            getA(){
                // this.baba = this.data.a;
            },
            // 获取C
            getC(){
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