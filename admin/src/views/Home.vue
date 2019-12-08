<template>
    <div class="Home">
        <div class="container">
            <sideMenu></sideMenu>
            <div class="item">
                <topNav></topNav>
                <div>
                    <transition name="fade">
                        <router-view> </router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sideMenu from "@/components/sideMenu.vue";
    import topNav from "@/components/topNav.vue";
    export default {
        name: "Home",
        components: {
            sideMenu,
            topNav
        },
        data() {
            return {}
        },
    }
</script>
<style lang="scss" scoped>
    .container {
        display: flex;

        .item {
            flex-grow: 1;
        }
    }
    // .fade-enter-active,.fade-leave-active{
    //     transition:opacity .1s;
    // }
    // .fade-enter,.fade-leave-to{
    //     opacity: 0;
    // }
</style>