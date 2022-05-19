# vue-pdf-touch

基于 vue-pdf 和 vue-touch 的一个实用实例。
用于 PC 与移动设备间预览 PDF 文件，可以通过链接远程加载，也可以通过接受基于 Base64 加密过的密文进行加载。具体详情请自行安装查看。
头部展示 **_上一页_** 与 **_下一页_** 还有 **_页码_** 信息。在移动设备上可以 **_左右滑动来切换页面_**。

**安装[vue-pdf-touch](https://www.npmjs.com/package/vue-pdf-touch)**

    npm i vue-pdf-touch

**然后在 main.js 上导入并使用：**

    import VuePdfTouch from 'VuePdfTouch'
    Vue.use(VuePdfTouch);

**或者手动安装依赖**

**安装[vue-pdf](https://www.npmjs.com/package/vue-pdf)**

    npm install --save vue-pdf

**安装[vue-touch](https://github.com/vuejs/vue-touch/tree/next)**

    npm install vue-touch@next --save

**然后在 main.js 上导入并使用：**

    import VueTouch from "vue-touch";
    Vue.use(VueTouch, {name: "v-touch"});

最后将**src**-->**components**-->**VuePdfTouch**下的组件导入到你要使用到的地方

    <template>
      <div id="app">
    	<div style="width: 49%;display: inline-block;">
    	  <h3>使用远程链接加载pdf</h3>
    	  <PdfConsult class="demo1" :pdfUrl="pdfUrl"></PdfConsult>
    	</div>
    	<div style="width: 49%;display: inline-block;">
    	  <h3>加载base64加密的数据</h3>
    	  <PdfConsult class="demo1" :isBase64File="true" :pdfUrl="getGetPDF"></PdfConsult>
    	</div>
      </div>
    </template>
    <script>
    import PdfConsult from './components/PdfConsult'
    import getPdf from '@/assets/getPdf.js';

    export default {
      name: 'App',
      components: {
    	PdfConsult
      },
      data() {
    	return {
    	  pdfUrl: 'http://image.cache.timepack.cn/nodejs.pdf',
    	}
      },
      computed:{
    	getGetPDF:function(){
    	  return getPdf;
    	}
      }
    }
    </script>

    <style>
      *{
    	box-sizing: border-box;
      }
    #app {
      width: 100%;
      height: 100%;
    }
    .demo1{
      width: 450px;
      height: 550px;
    }
    </style>

其中 getPdf 中的是 base64 加密的数据，可自行查看，根据业务加载。

## API

### 组件事件

基于 vue-pdf 和 vue-touch 的事件需要自行添加。仅提供 pdf 的 **@loaded** 事件和 **@error** 事件

## 参数

### 组件参数

| 参数名           | 类型    | 必填  | 说明                                                    |
| ---------------- | ------- | ----- | ------------------------------------------------------- |
| **pdfUrl**       | String  | true  | 默认情况下，pdfUrl 是一个网络路径                       |
| **isBase64File** | Boolean | false | 是否是 Base64 数据，当为 true 时，pdfUrl 应当为加密数据 |
