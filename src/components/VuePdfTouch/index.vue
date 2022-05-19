<template>
  <div class="pdf-container">
    <div class="head" v-show="pageTotalNum > 1">
      <div class="pageNumber">
        <button class="left" @click="prePage">上一页</button>
        <button class="right" @click="nextPage">下一页</button>
      </div>
      <div class="page">{{ pageNum }} / {{ pageTotalNum }}</div>
    </div>
    <v-touch v-on:swipeleft="swipeLeft" v-on:swiperight="swipeRight" :swipe-options="{ direction: 'horizontal' }">
      <pdf @loaded="loadedPDF" @error="pdfError" :page="pageNum" :src="getURL" @progress="progress"
        @num-pages="numPages"></pdf>
    </v-touch>
  </div>
</template>
<script>
import pdf from 'vue-pdf';
export default {
  name: 'VuePdfTouch',
  components: {
    pdf,
  },
  props: {
    pdfUrl: {
      type: String,
      required: true
    },
    isBase64File: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageNum: 1,
      pageTotalNum: 1,
      loadedRatio: 0,
    }
  },
  computed: {
    //计算属性
    getURL: function () {
      return this.isBase64File ? this.converData(this.pdfUrl) : this.pdfUrl;
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //路由守卫，在渲染该组件的对应路由被 confirm 前调用
    })
  },
  created() {
    //可访问实例，dom还未渲染
  },
  mounted() {
    //dom已经挂载
  },
  methods: {
    loadedPDF() {
      this.$emit('loaded');
    },
    pdfError(e) {
      this.$emit('error', e);
    },
    progress(e) {
      if (e || e === 0) {
        this.loadedRatio = e;
      }
    },
    numPages(e) {
      if (e) {
        this.pageTotalNum = e;
      }
    },
    // 上一页
    prePage() {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页
    nextPage() {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 左滑
    swipeLeft() {
      this.prePage();
    },
    // 右滑
    swipeRight() {
      this.nextPage();
    },
    /*转化编码格式*/
    converData(data) {
      data = data.replace(/[\n\r]/g, '');
      let raw = window.atob(data);
      let rawLength = raw.length;
      let array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.pdf-container {
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;

  .head {
    z-index: 8;
    width: 100%;
    position: absolute;

    .pageNumber {
      display: flex;
      float: left;

      .left,
      .right {
        display: inline-block;
        line-height: .1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-color: #DCDFE6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 400;
        padding: 12px 20px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #5583FE;
        border-color: #5583FE;
      }

      .left {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      .right {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: 1px solid #DCDFE6;
      }
    }

    .page {
      float: right;
      color: #FFFFFF;
      height: 27px;
      line-height: 27px;
      width: 5rem;
      text-align: center;
      display: inline-block;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, .5);
    }
  }
}
</style>
