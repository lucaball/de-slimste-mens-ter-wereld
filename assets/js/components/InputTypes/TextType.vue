<template>
  <div v-if="question.type === 'text'">
    <input v-model="question.value" class="rounded w-full p-2 text-black" type="text" @change="$emit('input', question.value)">
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
