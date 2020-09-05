<template>
    <div>

        <!--        <el-button  size="mini" class="filter-item" type="primary" icon="el-icon-download" @click="handleExport('https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/2020/07/13/数组的操作.pdf')">导出</el-button>-->
<!--        <el-button @click="exportRs( 'https://xqb-edu.oss-cn-hangzhou.aliyuncs.com/2020/07/13/数组的操作.pdf','数值操作')"-->
<!--                   class="filter-item" icon="el-icon-download" size="mini" type="primary">点我-->
<!--        </el-button>-->
<!--        <el-button :loading="isLoading" @click="download">点我</el-button>-->
<!--        <el-button @click="downloads"-->
<!--                   size="small"-->
<!--                   :loading="isLoading"-->
<!--                   type="text">下载-->
<!--        </el-button>-->
        <el-button @click="download"
                   size="small"
                   :loading="isLoading"
                   type="text">下载
        </el-button>


    </div>
</template>

<script>

    import {download} from './pdfMethod'

    import fileDownload from 'js-file-download';
    import api from '../../network/downpdf'

    export default {
        name: "UsePdf",
        components: {download, fileDownload},
        data() {
            return {
                isLoading:false
            }
        },

        methods: {

            convertRes2Blob(response) {
                // 将二进制流转为blob
                let blob = new Blob([response]);
                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
                    window.navigator.msSaveBlob(blob, decodeURI("文件名.pdf"))
                } else {
                    console.log('save....');
                    // 创建新的URL并指向File对象或者Blob对象的地址
                    const blobURL = window.URL.createObjectURL(blob);
                    // 创建a标签，用于跳转至下载链接
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobURL;
                    tempLink.setAttribute('download', decodeURI("文件名.pdf"));
                    // 兼容：某些浏览器不支持HTML5的download属性
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank')
                    }
                    // 挂载a标签
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    // 释放blob URL地址
                    window.URL.revokeObjectURL(blobURL);
                }
            },
            download() {
                api.getFiles("api/2020/07/13/数组的操作.pdf",//api 设计到了跨域
                    {
                        responseType: 'blob',
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        },
                    }).then(result => {
                    console.log(result);
                    this.convertRes2Blob(result);
                });
            },
            // download() {
            //     api.getFile("/2020/07/13/数组的操作.pdf",
            //         {
            //             responseType: 'blob',
            //             headers: {
            //                 'Content-Type': 'application/octet-stream'
            //             },
            //         }).then(result => {
            //         console.log(result);
            //         this.convertRes2Blob(result);
            //     });
            // },
            // downloads() {
            //     this.isLoading = true
            //     var requestUrl = "/api/2020/07/13/数组的操作.pdf";
            //
            //     axios({
            //         method: 'get',
            //         url: requestUrl,
            //
            //         responseType: 'blob'
            //     }).then(res => {
            //
            //         fileDownload(res.data, 'deviceModel.pdf');
            //         this.isLoading = false
            //     });
            // },
            //method方法
            exportRs(url, fileName) {
                download(url, fileName)
            },
            // download() {
            //
            //     axios.get('/api/2020/07/13/数组的操作.pdf', {
            //         responseType: 'arraybuffer'
            //     }).then((res) => {
            //         console.log(res);
            //         if (res.status == 200) {
            //             let blob = new Blob([res.data], {
            //                 type: `application/pdf;charset-UTF-8`//word文档为msword,pdf文档为pdf
            //             });
            //             let objectUrl = URL.createObjectURL(blob);
            //             console.log(objectUrl);
            //             let downEle = document.createElement("a");
            //             let fname = `download`; //下载文件的名字
            //             downEle.href = objectUrl;
            //             downEle.setAttribute("download", fname);
            //             document.body.appendChild(downEle);
            //             downEle.click();
            //         }        // fileDownload(res.data,'resume.pdf')
            //     }).catch((err) => {
            //         console.log(err);
            //     })
            //
            // },
        },

        mounted: function () {

        }

    };
</script>

<style lang="scss" scoped>

</style>