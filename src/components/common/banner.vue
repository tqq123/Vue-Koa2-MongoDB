<template>
  <div class="swipe-area">
    <van-swipe :autoplay="autoplay">
      <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index" @click.native="goGoodsInfo(item.goodsId)">
        <img v-lazy="item.image" alt="" width="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    bannerPicArray: {
      type: Array,
      default: []
    },
    autoplay: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    goGoodsInfo (goodsId) {
      this.$router.push({
        path: '/goods',
        query: { 
          goodsId
        } 
      })
    }
  }
}
</script>

<style>
  .swipe-area {
    clear: both;
    max-height: 12rem;
    overflow: hidden;
  }
</style>