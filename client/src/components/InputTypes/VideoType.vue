<template>
  <div v-if="question.type === 'video'">
    <input type="text" disabled name="" id="">
    Video
  </div>
</template>

<script>
export default {
  name: "VideoType",
  props : {
   question : {}
  }
}
</script>

<style scoped>

</style>
