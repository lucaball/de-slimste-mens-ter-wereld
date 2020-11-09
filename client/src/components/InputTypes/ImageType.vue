<template>
  <div v-if="question.type === 'image' ">
    <input type="text" :value="question.value">
    Image
  </div>
</template>

<script>
export default {
  name: "ImageType",
  props : {
    question: {}
  }
}
</script>

<style scoped>

</style>
