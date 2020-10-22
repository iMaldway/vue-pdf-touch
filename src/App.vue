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
