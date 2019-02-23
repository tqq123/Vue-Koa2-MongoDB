<template>
  <div class="floor">
    <div class="floor-title">{{floorTitle}}</div>
    <div class="floor-unnormal">
      <div class="floor-one" @click="goGoodsInfo(floorData0.goodsId)">
        <img :src="floorData0.image" width="100%" />
      </div>
      <div>
        <div class="floor-two" @click="goGoodsInfo(floorData1.goodsId)">
          <img :src="floorData1.image" width="100%" />
        </div>
        <div @click="goGoodsInfo(floorData2.goodsId)">
          <img :src="floorData2.image" width="100%" />
        </div>
      </div>
    </div>
    <div class="floor-normal">
      <div v-for="(item, index) in floorData.slice(3)" :key="index" @click="goGoodsInfo(item.goodsId)">
        <img :src="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      floorData: {
        type: Array,
        default: []
      },
      floorTitle: {
        type: String,
        default: ''
      }
    }, 
    data () {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {}
      }
    },
    watch: {
      floorData (val) {
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
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
  .floor-title {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
    color: #e5017d;
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
</style>