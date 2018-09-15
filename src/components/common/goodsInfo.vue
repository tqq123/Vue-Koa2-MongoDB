<template>
  <div class="goods-info" @click="goGoodsPage">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">{{goodPrice | moneyFilter}}</div>
  </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter'
  export default {
    props: {
      goodsImage: {
        type: String,
        default: ''
      },
      goodsName: {
        type: String,
        default: ''
      },
      goodPrice: {
        type: Number,
        default: 0
      },
      goodsId: {
        type: String,
        default: 0
      }
    },
    methods: {
      goGoodsPage() {
        this.$router.push({
          path: '/goods',
          query: {
            goodsId: this.goodsId
          }
        })
      }
    },
    filters: {
      moneyFilter(val) {
        return toMoney(val)
      }
    }
  }
</script>

<style scoped>
  .goods-image {
    padding: 5px;
  }
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>