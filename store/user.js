// 固定的写法,所有仓库里面的数据都叫 state;;// 这个是用来声明数据的
export const state = () => ({
  //采用接口返回的数据结构；；和我们发送axios请求返回的数据结构一致
  userInfo: {
    token: "",
    data: {}
  }
})

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

// 实现登录 ；；把登录请求放到store/user.js中统一管理。
// 由于mutation只能执行同步代码，对应异步代码；ajax请求，需要使用actions
export const actions={
     // 里面每一个属性都是函数l;;;;;（commit是$store本身具有的方法，）
    // 两个参数,第一个是 {commit} 将这个仓库对象本身的 commit 函数解构出来
    // 第二个参数就是我们需要传进来的数据
    login({commit},data){
        // 这里的 return 是为了能够对外返回一个带数据的 promise 方便外面继续进行处理
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then((res)=>{
            const data =res.data
            //用户登录成功，将数据存储到vuex中;;将commit提交到 setUserInfo(state, data)；数据对应
          commit("setUserInfo",data)
          return data
        })
    }
}

//第一个return；返回的是promise实例对象；可以直接.then((res)=>{})
//第二个return；返回的是res.data(请求回来的数据)，给到.then中的res使用