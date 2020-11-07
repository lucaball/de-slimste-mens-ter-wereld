<template>
  <div>
    <label for="question-name">
      Vraag
    </label>
    <input
        ref="gameName"
        v-model="activeQuestion.value"
        autofocus="autofocus"
        type="text"
        id="question-name"
        class="px-4 py-2 border-2 border-black rounded w-full"
    >
    <button class="mt-2 border-2 rounded p-2 border-black" @click="$emit('editanswers', activeQuestion)">
      Antwoorden bewerken
    </button>
  </div>
</template>

<script>
export default {
  name: "Question",
  data(){
    return {
      activeQuestion : {}
    }
  },
  beforeMount() {
    this.activeQuestion = this.question;
  },
  props: {
    question: {}
  },
}
</script>

<style scoped>

</style>