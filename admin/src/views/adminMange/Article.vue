<template>
    <div>
        <div class="Article">
            <header>
                <div class="container">
                    <div>
                        <span class="words">发布时间</span>
                        <el-date-picker v-model="params.startAt" value-format="timestamp"
                            :picker-options="pickerOptionsStart" placeholder="选择日期"></el-date-picker>
                        <i class="words">一</i>
                        <el-date-picker type="date" v-model="params.endAt" value-format="timestamp"
                            :picker-options="pickerOptionsEnd" placeholder="选择日期"></el-date-picker>
                    </div>
                    <div>
                        <span class="words">类&emsp;&emsp;型</span>
                        <el-select v-model="params.type" placeholder="请选择">
                            <el-option v-for="item in typeArray" :key="item.value" :value="item.value"
                                :label="item.label" style="padding-left: 15px;"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="c">
                    <span class="words">状&emsp;&emsp;态</span>
                    <el-select v-model="params.status" placeholder="请选择">
                        <el-option v-for="item in status" :key="item.value" :value="item.value" :label="item.label"
                            style="padding-left: 15px;"></el-option>
                    </el-select>
                </div>
                <div class="btn">
                    <div>
                        <el-button icon="el-icon-search" type="success" @click="search">搜索</el-button>
                        <el-button icon="el-icon-delete" type="danger" @click="reset">清空</el-button>
                    </div>
                </div>
            </header>
            <main>
                <div class="main-top">
                    <strong>Article列表</strong>
                    <el-button class="addBtn" icon="el-icon-plus" type="success" @click="add">新增</el-button>
                </div>
                <div class="main-in">
                    <div class="no" v-if="articleList.length === 0">暂无数据</div>
                    <table v-else>
                        <thead>
                            <tr>
                                <th class="width1">序号</th>
                                <th class="width1">图片</th>
                                <th class="width1">标题</th>
                                <th class="width1">类型</th>
                                <th class="width1">创建者</th>
                                <th class="width1">创建时间</th>
                                <th class="width1">修改时间</th>
                                <th class="width1">状态</th>
                                <th class="width2">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in articleList" :key="index" :class="{'active': index%2 != 1}"
                                style="border: 1px solid #ddd;">
                                <td align="center">{{index+1}}</td>
                                <td>
                                    <img :src="item.img" alt="">
                                </td>
                                <td>{{item.title}}</td>
                                <td>{{item.type | typeFilter}}</td>
                                <td>{{item.author}}</td>
                                <td>{{item.createAt | timeFilter}}</td>
                                <td>{{item.updateAt | timeFilter}}</td>
                                <td>{{item.status | statusFilter}}</td>
                                <td>
                                    <el-button class="addBtn" icon="el-icon-refresh" type="primary"
                                        @click="update(item)">{{item.status | updFilter}}</el-button>
                                    <el-button class="addBtn" icon="el-icon-edit" type="success" @click="edit(item.id)">
                                        编辑</el-button>
                                    <el-button class="addBtn" icon="el-icon-delete" type="danger" @click="del(item.id)">
                                        删除</el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>
                <span class="yss">每页显示
                    <input type="text" class="ys" v-model="params.size">
                    条
                </span>
                <el-pagination background layout="prev,pager,next,jumper" :current-page.sync="params.page"
                    :total="allPage*10" @current-change="handleCurrentChange"></el-pagination>
                <button @click.capture="handleSizeChange">确定</button>
            </footer>
        </div>
    </div>
</template>
<script>
    import article from "@/api/article/article.js";
    // import {
    //     typeArray
    // } from "@/utils/share.js";
    export default {
        data() {
            return {
                typeArray: [{
                        value: 0,
                        label: '首页banner',
                    },
                    {
                        value: 1,
                        label: '找职位banner'
                    },
                    {
                        value: 2,
                        label: '找精英banner',
                    },
                    {
                        value: 3,
                        label: '行业大图',
                    }
                ],
                status: [{
                        value: null,
                        label: '全部',
                    },
                    {
                        value: 2,
                        label: '上线',
                    },
                    {
                        value: 1,
                        label: '草稿',
                    }
                ],
                articleList: '',
                total: '', // 总个数
                allPage: '', //总页数
                params: {
                    page: 1, //当前页
                    size: 10,
                    type: '',
                    status: null,
                    startAt: null, // 从…… 
                    endAt: null, // 到……
                },
                pickerOptionsStart: this.changeStart(),
                pickerOptionsEnd: this.changeEnd(),
            }
        },
        created() {
            this.typeArray.unshift({
                value: '',
                label: '全部'
            });
            let params = JSON.parse(sessionStorage.getItem('p'));
            console.log(params !== null)
            if (params !== null) {
                this.params = params;
            }
            console.log(this.params)
            this.getArticle();
        },
        methods: {
            // 获取列表数据
            getArticle() {
                sessionStorage.setItem('p', JSON.stringify(this.params));
                console.log(this.params)
                article.articleList(this.params)
                    .then(res => {
                        console.log(res);
                        this.total = res.data.data.total;
                        this.params.size = res.data.data.size;
                        this.articleList = res.data.data.articleList;
                        this.allPage = Math.ceil(this.total / this.params.size);
                    })
            },
            // 开始时间
            changeStart() {
                return {
                    disabledDate: time => { //time为当前的时间
                        if (this.params.endAt) {
                            return time.getTime() > this.params.endAt; // 将大于结束时间的按钮禁用
                        } else {
                            return time.getTime() > Date.now(); // 将大于当天时间的按钮禁用
                        }
                    }
                }
            },
            // 结束时间
            changeEnd() {
                return {
                    disabledDate: time => {
                        if (this.params.startAt) {
                            return time.getTime() < this.params.startAt || time.getTime() > Date
                        .now(); // 将小于开始时间和大于当天时间的按钮禁用
                        } else {
                            return time.getTime() > Date.now(); // 将大于当天时间的按钮禁用 
                        }
                    }
                }
            },
            // 搜索
            search() {
                this.getArticle();
            },
            // 清空
            reset() {
                // sessionStorage.clear('p');
                this.params = {
                        page: 1, //当前页
                        size: 10,
                        type: '',
                        status: null,
                        startAt: null, // 从…… 
                        endAt: null, // 到……
                },
                    this.getArticle();
            },
            // 新增
            add() {
                this.$router.push({
                    path: "ArticleDetail",
                    query: {
                        status: 'add',
                    }
                })
            },
            // 上下线
            update(item) {
                console.log(item)
                let params = {
                    id: item.id,
                    status: item.status === 2 ? 1 : 2
                }
                let a = params.status === 2 ? '上' : '下';
                this.$confirm(`此操作将${a}线, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    article.putStatus(params)
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$messageBox(`${a}线成功`, 'success');
                                this.getArticle();
                            } else {
                                this.$messageBox(`${a}线失败`, 'error');
                            }
                        }).catch(err => {
                            this.$messageBox('系统错误', 'error');
                        })
                }).catch(() => {
                    this.$messageBox('已取消', 'info');
                })
            },
            // 编辑
            edit(val) {
                console.log(val)
                this.$router.push({
                    path: "ArticleDetail",
                    query: {
                        id: val,
                        status: "edit",
                    }
                })
            },
            // 删除
            del(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    article.deleteArticle(id)
                        .then(res => {
                            console.log(res)
                            this.$messageBox('删除成功', 'success');
                            this.getArticle();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$messageBox('删除失败，服务器出错', 'error');
                        })
                }).catch(() => {
                    this.$messageBox('已取消删除', 'info');
                });
            },
            // 当前页数
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.params.page = +val;
                this.getArticle(this.params);

            },
            // 显示条数
            handleSizeChange() {
                console.log(`当前显示个数: ${this.params.size}`);
                this.getArticle(this.params);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .Article {
        padding: 30px 30px 20px 30px;
        background-color: #f5f5f5;
        min-height: calc(100vh - 60px);
    }

    header {
        padding: 15px 30px 15px 15px;
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }

    .container {
        margin-bottom: 15px;
        @include flex(space-between, flex-start);
    }

    .c {
        margin-bottom: 15px;
    }

    .words {
        padding: 0 15px;
        color: #333;
        font-weight: 700;
    }

    .btn {
        @include flex(flex-end, flex-start);
    }

    button {
        padding: 10px 8px;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border-color: orange !important;
    }

    main {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }

    .main-top {
        @include flex(space-between, center);
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
        // background-color: #f5f5f5;
    }

    .addBtn {
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
    }

    .main-in {
        padding: 15px;
    }

    .no {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid #ddd;
    }

    .width1 {
        width: 10%;
        padding: 8px;
    }

    .width2 {
        width: 20%;
    }

    td {
        text-align: center;
        height: 120px;
    }

    .active {
        background-color: #f5f5f5;
    }

    img {
        display: block;
        @include w-h(100%, 100%);
    }

    footer {
        text-align: right;
        @include flex(flex-end, center);

        button {
            padding: 0;
            margin-left: 24px;
            height: 28px;
            width: 36px;
            font-size: 13px;
            font-weight: 400;
            color: #606266;
            border-radius: 4px;
            background-color: #FFF;
            outline: none;
            border: none;

            &:focus {
                background-color: #409EFF;
                color: #FFF;
            }
        }
    }

    .yss {
        margin-right: 24px;
        font-weight: 400;
        color: #606266;
    }

    .ys {
        @include w-h(36px, 28px);
        padding: 0 3px;
        text-align: center;
        line-height: normal;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        outline: none;

        &:focus {
            border-color: orange;
        }
    }

    .el-pagination.is-background .el-pager li {
        background-color: red !important;
    }
</style>