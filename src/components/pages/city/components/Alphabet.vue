<template>
  <div class="list">
    <ul @click="handleClick">
      <li
      class="item" v-for="item in letter"
      :key="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :ref="item"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  computed: {
    letter () {
      const letter = []
      for (let i in this.cities) {
        letter.push(i)
      }
      return letter
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart (e) {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // 截流
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letter.length) {
            this.$emit('change', this.letter[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
       console.log(3)
      this.touchStatus = false
    }
  },
  props: {
    cities: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 79px;
    bottom: 0;
    right: 0.2rem;
    width: .4rem;
  }
  .item {
    font-size: 13px;
    line-height: 1.1rem;
    color: #e5017d;
  }
</style>
