<template>
  <div>
    <!-- //header头部显示;;要用大写 -->
    <Header/>
    <!-- nuxt内容占位 -->
    <nuxt />
    <!-- footer页脚显示 -->
    <Footer/>
  </div>
</template>

<script>
//引入公共样式组件header和footer
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue';
export default{
//注册子组件
 components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}
a:hover{

}
em,i{
  font-style: normal;
}
</style>
