<template>
  <div id="app" class="bg-img">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<style>
    /* :focus {
        outline-color: orange !important;
    } */
    .el-input__inner:hover {
    border-color: orange !important;
    }
    .el-select .el-input__inner:focus {
        border-color: orange !important;
    }
    .el-select .el-input.is-focus .el-input__inner {
        border-color: orange !important;
    }

    .el-input__inner:focus {
        border-color: orange !important;
        outline: 0 !important;
    }

    .el-pagination.is-background .el-pager li {
        background-color: #fff;
    }
     .el-form-item__label {
        color: #333 !important;
        font-weight: 700 !important;
    }

    :focus {
        border-color: #fd9f2a !important;
        outline: 0 !important;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(253, 159, 42, 0.6) !important;
    }

    .el-select:hover .el-input__inner {
        border-color: orange !important;
    }
</style>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
//   text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bg-img{
    width: 100%;
    min-height: 100vh;
    background: url(./assets/bg.jpg) no-repeat 100%/cover;
    overflow: hidden;
}
</style>
