<template>
    <div>
        <h1>我是C</h1>
        <button @click="getZ">爷爷</button>{{count}}
        <p>获取爷爷的数据：{{yeye}}</p>
        <button @click="changeFirstName">爸爸</button>
        <p>获取爸爸的数据：{{baba}}</p>
        <button @click="changeSecondNameTo">叔叔</button>
        <p>获取叔叔的数据：{{shushu}}</p>
        <h1>{{secondName}}</h1>
        <h1>{{firstName}}</h1>
        <h1>{{p}}</h1>
    </div>
</template>
<script>
    import eventBus from "@/utils/eventBus.js";
    import {
        mapState, mapMutations,mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                p: "p",
                zujianC: '我是C的数据',
                // b: '',
                c: 1,
                yeye: '',
                baba: '',
                shushu: '',
            }
        },
        inheritAttrs: false,
        computed: {
            b() {
                return this.params; // 也有监听效果，在父级数据还是初始值未发生变动就会生效，还有缓存效果
            },
            count(){
                return this.$store.state.count;
            },
            // secondName(){
            //     return this.$store.state.secondName;
            // }
            ...mapState(['secondName']),
            ...mapState(['firstName'])
        },
        mounted(){
            console.log(this.$attrs)
            this.yeye = this.$attrs.data;
            this.baba = this.$attrs.dataB;
            eventBus.$emit('methodC',this.zujianC);
        },
        created(){
            eventBus.$on('methodAA',(data)=>{
                this.shushu = data;
            })
        },
        methods: {
            // 获取Z
            getZ(){
                console.log(this)
                console.log(this.$attrs)
            },
            // 获取A
            getA(){
                // this.baba = this.data.a;
                console.log(this)
                console.log(this.$attrs)
            },
            // 获取B
            getB(){
                this.baba = this.data.a;
            },
            // actions
            changeSecondNameTo(){
                this.changeSecondName({ns:'狂人'});
            },
            ...mapActions(['changeSecondName']),
            // ...mapActions(['changeFirstName']).then(()=>{
            //     this.p = 'promise';
            // }),
            changeFirstName(){
                this.$store.dispatch('changeFirstName')
                .then(()=>{
                    this.p = 'promise';
                })
            }
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