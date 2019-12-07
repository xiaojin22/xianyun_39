export const state = () => ({
// 模拟搜索数据实现历史记录；；；；
// 将搜索的数据存储到vuex中进行管理
  historyList: [
    // {
    //   departCity: '北京',
    //   destCity: '深圳',
    //   departDate: '2020-1-1'
    // },
    // {
    //   departCity: '广州',
    //   destCity: '上海',
    //   departDate: '2020-1-1'
    // }
  ]
})

// 用// 用来改变数据状态的
export const mutations = {
  addHistoryItem (state, data) {
    state.historyList.push(data)// 往historyList追加this.form,是由commit提交过来的数据
  }
}
