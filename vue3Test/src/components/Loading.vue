<template>
  <div v-show="visible" class="loading-wrap">
    <div class="loading-box">
      <!-- <img src="./images/loading.gif" alt=""> -->
      正在加载中。。。
    </div>
  </div>
</template>

<script>
export default {
  name: 'sloading',
}
</script>

<script setup>
  // export default {
  //   name: "sloading",
  //   data() {
  //     return {
  //       visible: false
  //     }
  //   }
  // }
  const visible = ref(false)
</script>
<style scoped lang="css">
  .loading-box {
    position: absolute;
    left: 50%;
    top: 40%;
    height: 60px;
    width: 60px;
    margin-left: -30px;
    z-index: 2000;
  }
  img {
      width: 100%;
      height: 100%;
    }
</style>
