<template>
  <div v-if="question.type === 'text'">
    <input class="rounded w-full p-2" type="text" :value="question.value">
  </div>
</template>

<script>
export default {
  name: "TextType",
  props : {
    question : {}
  }
}
</script>

<style scoped>

</style>
