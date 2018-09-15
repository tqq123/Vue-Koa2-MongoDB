<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item in hot" :key="item.id"
          @click="handleCityClick(item.name)">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) in cities" :key="key" :ref="key">
        <div class="title">{{key}}</div>
        <div class="item-list">
          <div v-for="city in item" :key="city.id"
          class="item van-hairline--bottom"
          @click="handleCityClick(city.name)">{{city.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapMutations} from 'vuex'

export default {
  props: {
    cities: {
      type: Object,
      default () {
        return {}
      }
    },
    hot: {
      type: Array,
      default () {
        return []
      }
    },
    letter: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.$router.push('/')  
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {click: true})
  },
  watch: {
    letter (val) {
      if (val) {
        this.scroll.scrollToElement(this.$refs[val][0])
      }
    }
  }
}
</script>

<style scoped>
  .border-bottom {
    border-bottom: .5px solid #ccc;
  }
  .list {
    overflow: hidden;
    position: absolute;
    top: 79px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .title {
    line-height: 1.8rem;
    background: #eee;
    padding-left: .5rem;
    color: #666;
    font-size: 0.7rem;
  }
      
  .button-list {
    padding: .1rem .6rem .1rem .1rem;
    overflow: hidden;
  }
      
  .button-wrapper {
    float: left;
    width: 33.3%;
  }
  .button {
    margin: .1rem;
    padding: .1rem 0;
    text-align: center;
    border: .5px solid #ccc;
    border-radius: .06rem;
    font-size: 15px;
  }
  .item-list .item{
    line-height: 1.8rem;
    padding-left: .5rem;
    font-size: 15px;
  }
</style>
