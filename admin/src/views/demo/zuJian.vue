<template>
    <div class="zuJian">
        <div class="panel">
            <div class="panell">
                <h1>我是Z</h1>
                <button @click="add">大儿子</button>
                <p>{{count}}</p>
                <!-- <p>{{name}}</p> -->
                <p>{{thirdName}}</p>
                <p>{{fruits}}</p>
                <p>获取大儿子的数据：{{erziA}}</p>
                <button @click="reduce">小儿子</button>
                <p>获取小儿子的数据：{{erziB}}</p>
                <button>孙子</button>
                <p>获取孙子的数据：{{sunziC}}</p>
            </div>
            <div class="panell">
                <childA ref="a" :data="zujianZ" @methodA="aEvent">
                    <!-- <template>插槽</template>
                    <template #A>插槽A</template>
                    <template slot="B">插槽B</template> -->
                    <template #C="{ren}">{{ren}}</template>
                </childA>
            </div>
            <div class="panell">
                <childB ref="b" :data="zujianZ" :dataA="erziA" :dataB="erziB" @methodB="bEventt"></childB>
            </div>
        </div>
    </div>
</template>
<script>
    import childA from "@/components/childA.vue";
    import childB from "@/components/childB.vue";
    import eventBus from "@/utils/eventBus.js";
    import {
        mapState, mapMutations
    } from 'vuex';
    export default {
        name: 'zuJian',
        components: {
            childA,
            childB
        },
        data() {
            return {
                zujianZ: '我是Z的数据',
                aa: '123',
                bb: 1,
                erziA: '',
                erziB: '',
                sunziC: '',
            }
        },
        mounted() {
            console.log(this)
            console.log(mapState)
        },
        created() {
            eventBus.$on('methodC', (data) => {
                console.log(data)
                this.sunziC = data;
            });
        },
        // computed: mapState({
        //     count: 'count',
        //     name: state => state.firstName + ' ' + state.secondName,
        //     fruits(state){
        //         return state.fruits[0]
        //     }
        // }),
        computed:{
            // 如果所有计算属性的名称都与 state 一致，可以在 mapState 中以数组的方式进行映射。
            // 如果 Vue 中已经存在计算属性，可以通过 ES6 的对象展开运算符 (…) 进行组合
            ...mapState(['thirdName','count']),
            fruits(){
                return this.$store.state.fruits
            }
        },
        methods: {
            add(){
                console.log(this.$store.state)
                this.$store.commit('add','梨子')
                console.log(this.$store.state)
            },
            // reduce(){
            //     this.$store.commit('reduce')
            // },
            ...mapMutations(['reduce']),
            aEvent(data) {
                this.$nextTick(() => {
                    this.erziA = data;
                })
                console.log(this.erziA)
            },
            bEventt(data) {
                this.erziB = data;
            },
            // 获取A
            getAdata() {
                console.log(this.zujianZ)
                // this.$refs.a.passZ();
                this.zujianZ = '更新父级';
                console.log(this.zujianZ)
            },
            // 获取B
            getBdata() {},
            // 获取C
            getCdata() {},
        }
    }
</script>
<style lang="scss" scoped>
    .panel {
        display: flex;
        padding-top: 30px;
        min-height: calc(100vh - 60px);
        background-color: #f5f5f5;

        .panell {
            margin-left: 100px;
        }

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
    }
</style>