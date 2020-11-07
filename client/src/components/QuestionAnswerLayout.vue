<template>
  <div>
    <Answer v-if="answers.length !== 0"></Answer>
    <p v-else>Geen antwoorden, voeg er toe. </p>
  </div>
</template>

<script>
import Answer from "../components/Answer";
export default {
name: "QuestionAnswerLayout",
  components: {Answer},
  props : {
    answers : []
  }
}
</script>

<style scoped>

</style>