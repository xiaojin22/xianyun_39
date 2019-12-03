// 使用axios的拦截器拦截页面的所有请求错误，并弹出对应的提示。
import { Message } from 'element-ui'// 用elenmt中单独引用
export default function ({ $axios, redirect }) {
  $axios.onError((err) => {
    window.console.log(err)
    const { statusCode, message } = err.response.data

    // 还未使用
    // if(statusCode === 401 || statusCode === 403){
    //     Message.warning({message: "请先登录"});
    //     redirect("/user/login");
    // }

    if (statusCode === 400) {
      Message.warning({ message })
    }
  })
}
