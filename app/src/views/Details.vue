<template>
  <div id="detail">
    <div class="header-top">
      <van-icon name="arrow-left" size="20px" @click="back"/>
      <span>返回</span>
    </div>
    <detailspic :key="index" :item="datas" :commentNum="commentNum"></detailspic>
    <van-tabs v-model="active" id="bg">
      <van-tab title="景点介绍">
        <div id="main" class="main">
          <div class="mid-title">{{content}}</div>
          <div class="bottom-btn" @click="showImg">景点图片阅览</div>
          <div class="jdyl">
            <van-image-preview :key="index" v-model="show" :images="images" @change="onChange">
              <template v-slot:index>第{{ index }}页</template>
            </van-image-preview>
          </div>
        </div>
      </van-tab>
      <van-tab title="景点评论">
        <div class="comment">
          <div class="top-font">{{msg}}</div>
          <detailslist v-for="(item,index) of commentDatas" :key="index" class="footer-margin" :item="item"></detailslist>
          <detailsupload :sid="1"></detailsupload>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DetailsList from "../components/DetailsList.vue";
import DetailsPic from "../components/DetailsPic.vue";
import DetailsUpload from "../components/DetailsUpload.vue";
import Vue from "vue";
import { ImagePreview } from "vant";

export default {
  data() {
    return {
      active: 0,
      show: false,
      index: 0,
      images: [],
      datas: [],
      lid: "",
      commentDatas:[],
      msg:"",
      content:"",
      commentNum:0
    };
  },
  components: {
    detailslist: DetailsList,
    detailspic: DetailsPic,
    detailsupload: DetailsUpload
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    showImg() {
      // console.log(this.datas[0].img);
      Vue.use(ImagePreview);
      ImagePreview({
        images: this.images,
        startPosition: 0,
      });
    },
    back(){
      // console.log(11111111);
      this.$router.back();
    },
    init() {
      this.lid = this.$route.query.lid;
      // 调用景点详情接口
      
      this.axios.get(`/spotdetail?id=${this.lid}`).then(res => {
          this.datas = res;
          this.content = this.datas.content;
          for(var i=0;i<this.datas.images.length;i++){
            this.images.push(this.datas.images[i].img);
          }
          // console.log(res);
          // console.log(this.images);
      });

      // 调用评论相关信息接口
      this.axios.get(`/commentlist?lid=${this.lid}`).then(res=>{
        if(res.code===1){
          this.msg = res.msg;
          this.commentDatas = res.datas;
          this.commentNum = res.datas.length;
        }else if (res.code===-1){
          this.msg = res.msg;
          this.commentNum = 0;
        }
        this.msg = res.msg;
      })
    }
  },
  created() {
    this.init();
  }
};
</script>
<style scoped>
#detail {
  background-color: #ebecec !important;
  padding-bottom: 0.533rem;
}
#main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 1.15rem;
}
.mid-title,
.comment {
  width: 9.6rem;
  box-sizing: border-box;
  padding: 0.2rem;
  background: #fff;
  font-size: 12px;
  line-height: 24px;
  padding-bottom: 1.2rem;
  border-radius: 0.133333rem;
  margin: 0 auto;
}
.mid-title {
  text-indent: 2em;
}
.bottom-btn {
  position: fixed;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #fff;
  font-size: 16px;
  text-align: center;
  background-color: #4e74d8;
  border-radius: 31px;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.top-font {
  font-size: 16px;
  font-weight: 500;
}
.collect {
  display: flex;
  flex-wrap: nowrap;
  width: 90%;
  margin-top: 0.5rem;
}
.collect > span {
  display: inline-block;
  width: 50%;
  font-size: 25px;
  text-align: center;
  color: #4e74d8;
}
.van-tabs >>> .van-tabs__wrap > .van-tabs__nav {
  background-color: #ebecec;
}

.header-top>div{
  background: transparent;
}
.header-top{
  padding: 10px;
}
.header-top>span{
  font-size: .333333rem;
  position: relative;
  top: -5px;
}
</style>
