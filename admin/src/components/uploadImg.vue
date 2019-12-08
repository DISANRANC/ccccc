<template>
    <div>
        <div>
            <!-- <label v-show="!showTb" for="upfile" type="button" class="file">选择文件</label> -->
            <label for="upfile" type="button" class="file">选择文件</label>
            <input id="upfile" type="file" accept="image/*" @change="upfileFile" :value="removes" style="display: none">
        </div>
        <div>
            <img :src="fileSrc" alt="图片预览" class="img-responsive">
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
                        <!-- <el-button class="el-icon-upload btn" type="success" :disabled="uploadBtn" @click="uploadFile">
                            上传</el-button> -->
                        <el-button class="el-icon-upload btn" type="success" @click="uploadFile">
                            上传</el-button>
                        <el-button class="el-icon-delete btn" type="danger" @click="deleteFile">
                            删除</el-button>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import article from "@/api/article/article.js";
    export default {
        data() {
            return {
                showTb: false, // 是否显示文件信息
                fileSrc: '', // 预览图
                progressVal: 0,
                imgName: null,
                fileSize: null,
                showG: false,
                uploadBtn: false,
                fileData: {}, // 转换为表格数据，接口传参
                industryIf: false,
                removes: '', //   用来清空input file中的文件
            }
        },
        props: ['img'],
        watch: {
            img(val) {
                console.log(val)
                console.log(this)
                this.fileSrc = this.img;
            }
        },
        created() {
            console.log(this.img)
            // this.fileSrc = this.img;
        },
        methods: {
            upfileFile(e) {
                console.log(e)
                console.log(this.removes)
                // if (e.target.files.length > 0) {
                //     this.removes = '';
                // }
                let file = e.target.files[0];
                console.log(file)
                this.showTb = true;
                this.imgName = file.name;
                this.showG = false;
                this.progressVal = 0;
                this.fileSize = (Math.round((file.size * 100) / (1024 * 1024)) / 100).toString() + "MB"; //图片大小
                let reader = new FileReader();
                reader.readAsDataURL(file); //用来转格式的
                let that = this;
                reader.onload = function(){
                    that.fileSrc = this.result; //地址储存的路径
                }
                this.fileData = new FormData();
                this.fileData.append("file", file);
                console.log(this.fileData.get('file'))
                this.$emit('url','');
            },
            uploadFile() {
                this.uploadBtn = true;
                let config = {
                    onUploadProgress: e => {
                        console.log(e)
                        // this.progressVal = ((e.loaded / e.total) * 100) | 0;
                        this.progressVal = (e.loaded / e.total * 100);
                        console.log(this.progressVal)
                    }
                };
                console.log(article.uploadImg)
                article.uploadImg(this.fileData, config)
                    .then(res => {
                        console.log(res)
                        this.$emit("url", res.data.data.url);
                        this.showG = true;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            deleteFile() {
                this.showG = false;
                this.progressVal = 0;
                this.showTb = false;
                this.$emit('url',this.fileSrc);
            },
        }
    }
</script>
<style lang="scss" scoped>
    .file {
        display: inline-block;
        padding: 6px 12px;
        line-height: 20px;
        vertical-align: middle;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        touch-action: manipulation;
        user-select: none;
        border: 1px solid #2e6da4;
        border-radius: 4px;
        background-color: #337ab7;
    }

    .img-responsive {
        display: block;
        line-height: 20px;
        max-width: 100%;
        height: auto;
    }

    .table {
        width: 100%;
        margin-bottom: 20px;
        border-spacing: 0;
        border-collapse: collapse;
    }

    th {
        width: 20%;
        font-size: 14px;
        border-bottom: 3px solid #ddd;
    }

    td {
        text-align: center;
        font-size: 14px;
        word-break: break-all;

        .box {
            height: 20px;
            background-color: #f5f5f5;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            border-radius: 4px;
            overflow: hidden;

            .val {
                text-align: right;
                line-height: 20px;
                color: white;
                background-color: #5cb85c;
            }
        }

    }

    .el-icon-check {
        font-weight: 600;
        font-size: 25px;
    }

    .btn {
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        outline: none;
        white-space: nowrap;

        &:focus {
            box-shadow: none;
            outline: none;
        }
    }

    .width {
        width: 20%;
    }
</style>