const BASEURL = 'http://localhost:8080'
const LOCALURL = 'http://localhost:3000'
export default {
  getShoppingMallInfo: LOCALURL + '/api/index',   // 首页
  getCityInfo: LOCALURL + '/city',                // 城市选择信息
  registerUser : LOCALURL + '/user/register',      // 用户注册
  loginUser : LOCALURL + '/user/login',      // 用户登录 
  getAllGoodsInfo: LOCALURL + '/goods/getAllGoodsInfo',       // 获取所有商品
  getDetailGoodsInfo: LOCALURL + '/goods/getDetailGoodsInfo',   // 获取商品详情 
  getDetailGoodsComments: LOCALURL + '/goods/getDetailGoodsComments',   // 获取商品评论 
  getCategoryList: LOCALURL + '/goods/getCategoryList',      // 获取商品大类信息
  getCategorySubList: LOCALURL + '/goods/getCategorySubList',      // 获取商品小类信息
  getGoodsListByCategorySubId: LOCALURL + '/goods/getGoodsListByCategorySubId'      // 获取商品列表
}