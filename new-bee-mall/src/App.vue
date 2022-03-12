<template>
  <div id="app">
    <!-- v-slot 插槽 -->
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-dialog v-model:show="show" title="标题" show-cancel-button>
  <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
</van-dialog>
  </div>
</template>

<script>
export default {
    props: {
      collectionName: String
    },
    setup() {
      // const readersNumber = ref(0)
      // const book = reactive({ title: 'Vue 3 Guide' })

      // 暴露给 template
      return {
        // readersNumber,
        // book,
        show: true,
      }
    }
  }
</script>

<style lang="less"></style>
