export const state = () => ({
  // 采用接口返回的数据结构
  orderInfo: {
    seat_infos:{}
  },
  allPrice:0
}) 

export const mutations = {
  // 保存用户信息到state
  setOrderInfo(state, data){
    state.orderInfo = data;
  },
  removeOrderInfo(state){
    state.orderInfo = {}
  },
  setAllPrice(state,data){
    state.allPrice = data
  }
}