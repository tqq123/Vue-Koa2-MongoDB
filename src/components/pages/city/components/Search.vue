<template>
  <div>
    <div class="search">
      <input type="text" class="search-input" placeholder="输入城市名或拼音" v-model="search"/>
    </div>
    <div class="search-content" ref="search" v-show="search">
      <ul>
        <li class="van-hairline--bottom" v-for="item in list" :key="item.id"
        @click="handleCityClick(item.name)">{{item.name}}</li>
        <li class="van-hairline--bottom" v-show="hasNoData">没有找到匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  props: {
    cities: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      search: '',
      list: [],
      timer: null
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    handleCityClick (city) {
      this.changeCity(city)
      this.$router.push('/')
      this.search = ''
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.search, {click: true})
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
        for (let i in this.cities) {
          this.cities[i].forEach((item) => {
            if (item.spell.indexOf(this.search) > -1 || item.name.indexOf(this.search) > -1) {
              result.push(item)
            }
          })
        }
        this.list = result
      }, 100)
    }
  }
}
</script>

<style scoped>
  .search {
    height: 40px;
    background: #e5017d;
    padding: 0 .5rem;
  }
  input {
    box-sizing: border-box;
    height: 1.4rem;
    padding: 0 .5rem;
    line-height: 1rem;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    border: none;
    color: #666;
    font-size: 14px;
  } 
  .search-content {
    z-index: 1;
    position: absolute;
    overflow: hidden;
    top: 79px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
  }
  .search-content ul li {
    line-height: 1.1rem;
    padding: .3rem;
    color: #666;
    background: #fff;
    font-size: 15px;
  } 
</style>
