<template>
  <div class="container">
    <!-- 幻灯片;;elemnt—ui；轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(value, index) in imgLunbo" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL}${value.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据
      imgLunbo: [
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        // },
        // {
        //   url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        // }
      ]
    };
  },
  //获取轮播数据
     mounted(){
        this.$axios({
            url: "/scenics/banners"
        }).then(res => {
           console.log(res)
           this.imgLunbo=res.data.data
        })
    }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>