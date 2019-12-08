<template>
    <div class="hook">
        <div class="panel">
            <h1>生命周期</h1>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hook',
        data() {
            return {
                todos: [],
                allCounts: 0,
                filter: 'all',
                id: 0,
                states: ['all', 'active', 'completed']
            }
        },
        //     生命周期钩子  钩子即函数 
        // beforeCreate  是方法     组件创建之前
        // created              是方法       组件创建之后
        // beforeMount         挂载数据到DOM之前会调用 
        // mounted             挂载数据到DOM之后会调用 
        // beforeUpdate        在更新DOM之前 调用该函数 ，应用：可以获取原始的DOM
        // updated             在更新DOM之后 调用该函数 ，应用：可以获取最新的DOM
        // activated             组件被激活了
        // deactivated            组件被停用了
        // beforeDestroy            销毁之前
        // destroyed                销毁之后
        beforeCreate() {
            console.log('==============' + 'beforeCreated' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        created() {
            // 在created这个方法中可以操作后端的数据  数据驱动视图
            // 应用：发送ajax请求
            console.log('==============' + 'created' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        beforeMount() {
            // 挂载数据到DOM之前会调用 
            console.log('==============' + 'beforeMount' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        mounted() {
            // 挂载数据到DOM之后会调用  即Vue实例之后的DOM
            // 应用：操作DOM
            console.log('==============' + 'mounted' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        beforeUpdate() {
            // 在更新DOM之前 调用该函数 ，应用：可以获取原始的DOM
            console.log('==============' + 'beforeUpdate' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        updated() {
            // 在更新DOM之后 调用该函数 ，应用：可以获取最新的DOM
            console.log('==============' + 'updated' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        beforeDestroy() {
            // 销毁之前
            console.log('==============' + 'beforeDestroy' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        destroyed() {
            // 销毁之后
            // 应用：销毁定时器
            console.log('==============' + 'destroyed' + '===================')
            console.log(this)
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.filter)
        },
        activated() {
            // 组件被激活了
        },
        deactivated() {
            // 组件被停用了
            // 例如点击上面的“改变生死”按钮  就会导致<keep-alive>组件停用
        }
    }
</script>
<style lang="scss" scoped>
    .panel {
        padding-top: 30px;
        min-height: calc(100vh - 60px);
        background-color: #f5f5f5;
    }
</style>