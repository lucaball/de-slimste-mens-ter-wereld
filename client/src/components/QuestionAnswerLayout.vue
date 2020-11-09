<template>
  <div>
    <div v-if="answers.length !== 0">
      <Answer v-for="answer in answers" :key="answer.id" :answer="answer"></Answer>
    </div>
    <p v-else>Geen antwoorden, voeg er toe. </p>
    <button @click="addAnswer"
            class="mt-3 w-full border-dashed border-gray-500 text-gray-500 border-2 font-bold text-center rounded py-2 uppercase">
      Antwoord toevoegen
    </button>
  </div>
</template>

<script>
import Answer from "../components/Answer";

export default {
  name: "QuestionAnswerLayout",
  components: {Answer},
  methods: {
    addAnswer() {
      this.answers.push({
        id : 'test',
        value : 'test'
      })
    }
  },
  props: {
    answers: []
  }
}
</script>

<style scoped>

</style>