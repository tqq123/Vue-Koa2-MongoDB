<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="6">
          <img @click="selectCity" class="location-icon" :src="locationIcon" alt="" width="35%" />
          <span class="city">{{city}}</span>
        </van-col>
        <van-col span="18">
          <van-search
            v-model="search"
            placeholder="请输入搜索关键词"
            background="#e5017d"
            show-action
            @cancel="onCancel"
          />
        </van-col>
      </van-row>
      <div class="search-content" ref="search" v-show="search">
        <ul>
          <li class="van-hairline--bottom " v-for="item in searchList" 
          @click="goGoodsInfo(item.Id)">{{item.Name}}</li>
          <li class="border-bottom" v-show="hasNoData">没有找到匹配商品</li>
        </ul>
      </div>
    </div>
    <van-notice-bar
      text="商城开业大酬宾，线上线下全部5折，全部5折!!!  下单满199元，免费赠送礼品一份，数量有限，送完为止"
      mode="closeable"
    />
    <banner :bannerPicArray="bannerPicArray"></banner>
    <div class="type-bar">
      <div v-for="(item, index) in category" :key="index" @click="goCategoryList(item.mallCategoryId)">
        <img v-lazy="item.image" alt="" width="90%">
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <div class="adbanner">
      <img v-lazy="adBanner" width="100%" alt="">
    </div>
    <div class="recommend">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="options">
          <swiper-slide v-for="(item,key) in recommendGoods" :key="key">
            <div class="recommend-item" @click="goGoodsInfo(item.goodsId)">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor :floorData="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floor3" :floorTitle="floorName.floor3"></floor>
    <div class="hot">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row>
            <van-col span="12" v-for="(item, index) in hotgoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" 
              :goodPrice="item.price" :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import floor from '../common/floor.vue'
  import banner from '../common/banner.vue'
  import goodsInfo from '../common/goodsInfo.vue'
  import {toMoney} from '../../filter/moneyFilter'
  import url from '../../config'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    created() {
      // 判断MongoDB是否已经存入数据
      !localStorage.initDataBase?  this.initData() : this.getData()
    },
    data() {
      return {
        search: '',
        goodsList: [],
        searchList: [],
        timer: null,
        hasNoData: false,
        locationIcon: require('../../assets/img/location.png'),
        bannerPicArray: [],
        category: [],
        adBanner: '',
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotgoods: [],
        options: {
          slidesPerView: 2.5
        }
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.search, {click: true})
    },
    computed: {
      ...mapState(['city'])
    },
    filters: {
      moneyFilter(val) {
        return toMoney(val)
      }
    },
    methods: {
      getData () {
        this.getShoppingMallInfo()
        this.getAllGoodsInfo()
      },
      initData () {
        const insertGoodsComments = () => axios.get('http://localhost:3000/goods/insertGoodsComments').then((res) => {})
        const insertAllGoodsInfo = () => axios.get('http://localhost:3000/goods/insertAllGoodsInfo').then((res) => {})
        const insertAllCategory = () => axios.get('http://localhost:3000/goods/insertAllCategory').then((res) => {})
        const insertAllCategorySub = () => axios.get('http://localhost:3000/goods/insertAllCategorySub').then((res) => {})

        const initArray = [insertGoodsComments(), insertAllGoodsInfo(), insertAllCategory(), insertAllCategorySub()]
        Promise.all(initArray).then((res) => {
          localStorage.initDataBase = true;
          this.getData()
        })
      },
      getShoppingMallInfo () {
        axios.get(url.getShoppingMallInfo).then((res) => {
          if (res.data.errno === 0) {
            res = res.data.data
            this.category = res.data.category
            this.adBanner = res.data.advertesPicture.PICTURE_ADDRESS
            this.bannerPicArray = res.data.slides
            this.recommendGoods = res.data.recommend
            this.floor1 = res.data.floor1
            this.floor2 = res.data.floor2
            this.floor3 = res.data.floor3
            this.floorName = res.data.floorName
            this.hotgoods = res.data.hotGoods
          }
        })
      },
      getAllGoodsInfo () {
        axios.get(url.getAllGoodsInfo).then(res => {
          if (res.data.code === 200 && res.data.message.length) {
            res = res.data.message
            this.goodsList = res
          }
        })
      },  
      goGoodsInfo (goodsId) {
        this.$router.push({
          path: '/goods',
          query: {  
            goodsId
          } 
        })
      },
      goCategoryList(CategoryId) {
        this.$router.push({
          path: '/categorylist',
          query: { 
            CategoryId
          } 
        })
      },
      selectCity () {
        this.$router.push('/city')
      },
      onCancel () {
        this.search = ''
      }
    },
    watch: {
      search () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (!this.search) {
          this.list = []
          return
        }
        this.timer = setTimeout(() => {
          const result = []
          this.goodsList.map(item => {
            if (item.NAME.indexOf(this.search) > -1) {
              result.push({
                Name: item.NAME,
                Id: item.ID
              })
            }
          })
          this.searchList = result
          if (!this.searchList.length) {
            this.hasNoData = true
          } else {
            this.hasNoData = false
          }
        }, 100)
      }
    },
    components: {
      swiper,
      swiperSlide,
      floor,
      banner,
      goodsInfo
    }
  }
</script>
<style>
  .van-search__action-text {
    color: #fff;
  }
</style>
<style scoped>
  .city {
    font-size: 14px;
    color: #fff;
    vertical-align: top;
  }
  .search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    border: 0;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }
  .location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .type-bar {
    background: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div{
    flex: 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .recommend {
    background: #fff;
    margin-top: .3rem;
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .floor-unnormal {
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-unnormal>div {
    width: 50%;
    box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-normal {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #fff;
  }
  .floor-normal div {
    width: 50%; 
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
  }
  .floor-normal div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
  .hot {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .hot-goods {
    margin-bottom: 50px;
  }
  .search-content {
    z-index: 2;
    position: absolute;
    overflow: hidden;
    top: 2.2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
  }
  .search-content ul li {
    line-height: 1.5rem;
    padding: .3rem;
    color: #666;
    background: #fff;
    font-size: 15px;
  }
</style>