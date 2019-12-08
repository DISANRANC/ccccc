<template>
    <div class="page-wrapper">
        <div class="panel">
            <div class="panel-heading">{{pageName}}</div>
            <div class="panel-body">
                <el-row type="flex" justify="center">
                    <el-col :span="18">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="标题名称">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span slot="label">类&emsp;&emsp;型</span>
                                <el-select v-model="form.type" placeholder="请选择">
                                    <el-option v-for="(item,index) in typeArray" :key="index" :value="item.value"
                                        :label="item.label" style="padding-left: 15px;"></el-option>
                                </el-select>
                                <el-select v-model="industryVal" placeholder="请选择" v-if="industryIf"
                                    style="margin-left: 30px;">
                                    <el-option v-for="(item,index) in industryArray" :key="index" :value="item.value"
                                        :label="item.label" style="padding-left: 15px;"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <span slot="label">说&emsp;&emsp;明</span>
                                <el-input v-model="form.content"></el-input>
                            </el-form-item>
                            <el-form-item label="跳转链接">
                                <el-input v-model="form.url"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span slot="label">配&emsp;&emsp;图</span>
                                <uploadImg :img="this.form.img" @url="imgUrl"></uploadImg>
                                <!-- <div>
                                    <label v-show="!showTb" for="upfile" type="button" class="file">选择文件</label>
                                    <input id="upfile" type="file" accept="image/*" @change="upfileFile"
                                        style="display: none">
                                </div>
                                <div>
                                    <img :src="form.img" alt="图片预览" class="img-responsive">
                                </div>
                                <div>
                                    <table class="table">
                                        <thead>
                                            <th>图片名</th>
                                            <th>文件大小</th>
                                            <th>进度</th>
                                            <th>操作</th>
                                            <th>操作</th>
                                        </thead>
                                        <tbody v-show="showTb">
                                            <td>{{imgName}}</td>
                                            <td>{{fileSize}}</td>
                                            <td>
                                                <div class="box">
                                                    <div class="val" :style="{width:progressVal+'%'}">{{progressVal}}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <i class="el-icon-check" v-show="showG"></i>
                                            </td>
                                            <td>
                                                <el-button class="el-icon-upload btn" type="success"
                                                    :disabled="uploadBtn" @click="uploadFile">上传</el-button>
                                                <el-button class="el-icon-delete btn" type="danger" @click="deleteFile">
                                                    删除</el-button>
                                            </td>
                                        </tbody>
                                    </table>
                                </div> -->
                            </el-form-item>
                            <el-form-item>
                                <div>
                                    <button type="button" class="suc" @click="edit(2)" :disabled="addBtn"
                                        :class="{'jin':addBtn}">立即上线</button>
                                    <button type="button" class="suc" @click="edit(1)" :disabled="addBtn"
                                        :class="{'jin':addBtn}" style="margin-left:5px;">存为草稿</button>
                                    <button type="button" class="suc cancel" @click="cancel">取消</button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        typeArray,
        industry
    } from "@/utils/share.js";
    import article from "@/api/article/article.js";
    import uploadImg from "@/components/uploadImg.vue";
    export default {
        components:{
            uploadImg
        },
        data() {
            return {
                pageName: '',
                form: {
                    title: '',
                    type: '',
                    content: '',
                    url: '',
                    img: '',
                    createAt: ''
                },
                params: {},
                industryVal: '',
                typeArray: [],
                industryArray: [],
                query: {},
                showTb: false,
                showG: false,
                uploadBtn: false,
                imgName: null,
                fileSize: null,
                progressVal: 0,
                fileData: {}, // 转换为表格数据，接口传参
                industryIf: false
            }
        },
        created() {
            this.typeArray = typeArray;
            this.industryArray = industry;
            console.log(this.$route.query)
            this.query = this.$route.query;
            if (this.query.status === "edit") {
                this.pageName = "编辑Article";
                article.getArticle(this.query.id)
                    .then(res => {
                        console.log(res)
                        let params = res.data.data.article;
                        for (let x in params) {
                            for (let y in this.form) {
                                if (x === y) {
                                    this.form[y] = params[x];
                                }
                            }
                        }
                        this.industryVal = params.industry;
                        // this.form.title = params.title;
                        // this.form.type = params.type;
                        // this.form.content = params.content;
                        // this.form.url = params.url;
                        // this.form.img = params.img;
                    })
            } else if (this.query.status === "add") {
                this.pageName = "新增Article";
                delete this.form["createAt"];
            }
        },
        computed: {
            addBtn: function () {
                for (let i in this.form) {
                    if (this.form[i] === '' || this.industryIf && this.industryVal === '') {
                        return true;
                    }
                }
            }
        },
        watch: {
            //     'form.type'(val) {
            //     console.log(val)
            //     if (val === 3) {
            //         this.industryIf = true;
            //     }else{
            //         this.industryIf = false;
            //     }
            // }
            form:{
                handler(val,oldVal){
                    if(val.type === 3){
                        this.industryIf = true;
                    }else{
                        this.industryIf = false;
                    }
                },
                deep: true
            }

        },
        methods: {
            imgUrl(data){
                this.form.img = data;
            },
            // upfileFile(e) {
            //     console.log(e)
            //     if (e.target.files.length === 0) {
            //         return;
            //     } else {
            //         let file = e.target.files[0];
            //         console.log(file)
            //         this.showTb = true;
            //         this.imgName = file.name;
            //         this.fileSize = (Math.round((file.size * 100) / (1024 * 1024)) / 100).toString() + "MB"; //图片大小
            //         this.fileData = new FormData();
            //         this.fileData.append("file", file);
            //         console.log(this.fileData.get('file'))
            //     }
            // },
            // uploadFile() {
            //     this.uploadBtn = true;
            //     let config = {
            //         onUploadProgress: e => {
            //             console.log(e)
            //             // this.progressVal = ((e.loaded / e.total) * 100) | 0;
            //             this.progressVal = (e.loaded / e.total* 100);
            //             console.log(this.progressVal)
            //         }
            //     };
            //     console.log(this.fileData.get('file'))
            //     article.uploadImg(this.fileData, config)
            //         .then(res => {
            //             console.log(res)
            //             this.form.img = res.data.data.url;
            //             this.showG = true;
            //         })
            //         .catch(err => {
            //             console.log(err)
            //         })

            // },
            // deleteFile() {
            //     this.uploadBtn = false;
            //     this.showG = false;
            //     this.progressVal = 0;
            //     this.showTb = false;
            // },
            edit(state) {
                console.log(this.form)
                let param = {
                    status: state,
                    industry: this.industryVal
                }
                let params = Object.assign({}, param, this.form);
                if (this.pageName === "编辑Article") {
                    article.putArticle(this.query.id, params)
                        .then(res => {
                            console.log(res.data.code)
                            if (res.data.code === 0) {
                                this.$messageBox('编辑成功', 'success');
                                this.$router.push("Article");
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else if (this.pageName === "新增Article") {
                    article.addArticle(params)
                        .then(res => {
                            console.log(res.data.code)
                            if (res.data.code === 0) {
                                this.$messageBox('新增成功', 'success');
                                this.$router.push("Article");
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

            },
            cancel() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
</style>
<style lang="scss" scoped>
    .page-wrapper {
        padding: 30px 30px 3000px 30px;
        margin-bottom: -3000px;
        background-color: #f5f5f5;

        .panel {
            margin-bottom: 20px;
            background-color: #fff;
            border: 1px solid transparent;
            border-color: #ddd;
            border-radius: 4px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .05);

            .panel-heading {
                color: #333;
                font-weight: 700;
                font-size: 14px;
                background-color: #f5f5f5;
                padding: 10px 15px;
                border-bottom: 1px solid #ddd;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
            }

            .panel-body {
                padding: 15px;
            }
        }
    }

    .el-form-item {
        margin-bottom: 15px;
    }

    // .file {
    //     display: inline-block;
    //     padding: 6px 12px;
    //     line-height: 20px;
    //     vertical-align: middle;
    //     color: #fff;
    //     font-size: 14px;
    //     font-weight: 400;
    //     cursor: pointer;
    //     touch-action: manipulation;
    //     user-select: none;
    //     border: 1px solid #2e6da4;
    //     border-radius: 4px;
    //     background-color: #337ab7;
    // }

    // .img-responsive {
    //     display: block;
    //     line-height: 20px;
    //     max-width: 100%;
    //     height: auto;
    // }

    // .table {
    //     width: 100%;
    //     margin-bottom: 20px;
    //     border-spacing: 0;
    //     border-collapse: collapse;
    // }

    // th {
    //     width: 20%;
    //     font-size: 14px;
    //     border-bottom: 3px solid #ddd;
    // }

    // td {
    //     text-align: center;
    //     font-size: 14px;
    //     word-break: break-all;

    //     .box {
    //         height: 20px;
    //         background-color: #f5f5f5;
    //         box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    //         border-radius: 4px;
    //         overflow: hidden;

    //         .val {
    //             text-align: right;
    //             line-height: 20px;
    //             color: white;
    //             background-color: #5cb85c;
    //         }
    //     }

    // }

    // .el-icon-check {
    //     font-weight: 600;
    //     font-size: 25px;
    // }

    // .btn {
    //     padding: 1px 5px;
    //     font-size: 12px;
    //     line-height: 1.5;
    //     border-radius: 3px;
    //     outline: none;
    //     white-space: nowrap;

    //     &:focus {
    //         box-shadow: none;
    //         outline: none;
    //     }
    // }

    // .width {
    //     width: 20%;
    // }

    .suc {
        display: inline-block;
        padding: 9px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        touch-action: manipulation;
        cursor: pointer;
        user-select: none;
        border: 1px solid #4cae4c;
        background-color: #5cb85c;
        color: #fff;
        border-radius: 4px;
        outline: none;

        &:focus {
            outline: 0;
            box-shadow: none;
        }
    }

    .jin {
        cursor: not-allowed;
        box-shadow: none;
        opacity: .65;
    }

    .cancel {
        float: right;
        color: #333;
        background-color: #fff;
        border-color: #ccc;
    }
</style>