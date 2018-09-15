export default {
  addGoods (state, goods) {
    state.cartInfo.push(goods)
    try {
      localStorage.cartInfo = JSON.stringify(state.cartInfo)
    } catch (e) {}
  },
  clearCart (state) {
    state.cartInfo = []
    try {
      localStorage.removeItem('cartInfo')
    } catch (e) {}
  },
  changeCity (state, city) {
    state.city = city
    localStorage.city = city
  }
}