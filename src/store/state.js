let cartInfo = []
let city = ''
try {
  if (localStorage.cartInfo) {
    cartInfo = JSON.parse(localStorage.cartInfo)
  }
} catch (e) {console.log(e)}

try {
  if (localStorage.city) {
    city = localStorage.city
  }
} catch (e) {console.log(e)}

export default {cartInfo, city}
