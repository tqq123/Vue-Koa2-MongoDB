<template>
  <div class="header">
    城市选择
    <van-icon name="arrow-left" @click="back" class="header-back" />
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .header {
    position: relative;
    overflow: hidden;
    height: 39px;
    line-height: 39px;
    text-align: center;
    color: #fff;
    background: #e5017d;
    font-size: .8rem;
  }
  .header-back {
    position: absolute;
    top: 0.7rem;  
    left: 0.5rem;
    width: .64rem;
    font-size: .8rem;
  } 
</style>
