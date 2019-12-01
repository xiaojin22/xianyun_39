// 固定的写法,所有仓库里面的数据都叫 state;;// 这个是用来声明数据的
export const state = () => ({
  //采用接口返回的数据结构；；和我们发送axios请求返回的数据结构一致
  userInfo: {
    token: "",
    data: {}
  }
})

// 实现登录 ；；把登录请求放到store/user.js中统一管理。
// 用来改变数据状态的
export const mutations = {
  // 保存用户信息到state
  // 每一个属性都是一个函数
  // 有两个参数,
  // 第一个,是我们的状态对象 state
  // 第二个就是我们想要改变的数据
  setUserInfo(state, data) {
       // 这里是负责修改用户数据的
    state.userInfo = data;//data就是我们要发送axios请求回来的数据；
  }
}
