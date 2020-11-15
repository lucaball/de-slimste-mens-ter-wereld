<template>
  <div>
    <h2 class="text-3xl">{{ question.value }}</h2>
    <div v-if="answers.length !== 0">
      <Answer v-for="(answer, index) in answers" :item-no="index + 1" :key="answer.id" :answer="answer"></Answer>
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
import axios from "axios";

export default {
  name: "QuestionAnswerLayout",
  components: {Answer},
  methods: {
    addAnswer() {
      axios.post('/answer', {
        questionId: this.question.id
      }).then((response) => {
        this.answers.push(response.data.answer);
      })
    },
  },
  props: {
    answers: Array,
    question: {},
  }
}
</script>

<style scoped>

</style>
