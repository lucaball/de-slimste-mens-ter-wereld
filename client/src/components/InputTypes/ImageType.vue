<template>
  <div v-if="question.type === 'image' ">
        <input class="rounded w-full p-2" type="file" :value="question.value">
  </div>
</template>

<script>
export default {
  name: "ImageType",
  props: {
    question: {}
  }
}
</script>

<style scoped>

</style>
