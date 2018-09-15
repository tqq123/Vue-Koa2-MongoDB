<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="类别列表"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left-nav">
            <ul>
              <li @click="clickCategory(index, item.ID)" v-for="(item, index) in category" :key="index" :class="{categoryActive: categorySelectedIndex == index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub"> 
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" 
              :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onPullDown">
              <van-list v-model="loading" :finished="finished" @load="onPullUp">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}元</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/config'
import {Toast} from 'vant'
import {toMoney} from '@/filter/moneyFilter'

export default {
  data() {
    return {
      category: [],
      categorySub: [],
      categorySelectedIndex: 0,  // 大类选中标签
      active: 0,          // 小类选中标签
      loading: false,
      finished: false,     // 上拉加载是否有数据
      goodList: [],              // 商品数据
      categorySubId: '',      // 子类id
      page: 1,                // 商品页数
      isRefresh: false,      // 下拉刷新
      errorImg: `this.src="${require('@/assets/img/errorimg.png')}"`
    }
  },
  created () {
    this.getCategory()
  },
  activated () {
    let query = Object.keys(this.$route.query)
    if (query.length) {
      let CategoryId = this.$route.query.CategoryId
      switch (parseInt(CategoryId)) {
        case 1: 
          this.clickCategory(3, 1)
          break
        case 2: 
          this.clickCategory(2, 2)
          break
        case 3: 
          this.clickCategory(1, 3)
          break
        case 4: 
          this.clickCategory(0, 4)
          break
        case 5: 
          this.clickCategory(4, 5)
          break
        default:
      }
    }
  },
  mounted () {
    let windowHeight = document.documentElement.clientHeight
    document.getElementById('left-nav').style.height = windowHeight - 46 -50 + 'px'
    document.getElementById('list-div').style.height = windowHeight - 90 -50 + 'px'
  },
  methods: {
    getCategory () {
      axios.get(url.getCategoryList).then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.category = res.data.message
          this.getCategorySubByCategoryId(this.category[0].ID)
        } else {
          Toast('数据加载失败')
        }
      })
    },
    clickCategory (index, categoryId) {
      this.categorySelectedIndex = index
      // 获取子类数据
      this.getCategorySubByCategoryId(categoryId)
      this.active = 0
      this.page = 1
      this.finished = false
      this.goodList = []
    },
    getCategorySubByCategoryId (categoryId) {
      axios.post(url.getCategorySubList, {
        categoryId
      }).then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.categorySub = res.data.message
          this.categorySubId = this.categorySub[0].ID
          this.onPullUp()
        } 
      })
    },
    onPullUp () {  // 上拉加载
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    },
    onPullDown () {  // 下拉刷新
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onPullUp()
      }, 500)
    },
    getGoodList () {
      axios.post(url.getGoodsListByCategorySubId, {
        categorySubId: this.categorySubId,
        page: this.page
      }).then(res => {
        if (res.data.code === 200 && res.data.message.length) {
          this.page++
          this.goodList = [...this.goodList, ...res.data.message]
        } else {
          // 数据加载完毕
          this.finished = true
        }
        this.loading = false
      })
    },
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onPullUp()
    },
    goGoodsInfo (goodsId) {
      // path-query    name-params
      this.$router.push({
        path: '/goods',
        query: { 
          goodsId
        } 
      })
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>
  #left-nav {
    background: aliceblue;
  }
  #left-nav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: .8rem;
    text-align: center;
  }
  .categoryActive {
    background: #fff;
  }
  
  .list-item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
  }
  #list-div{
    overflow: scroll;
  }
  .list-item-img{
    flex:8;
  } 
  .list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
  }
</style>