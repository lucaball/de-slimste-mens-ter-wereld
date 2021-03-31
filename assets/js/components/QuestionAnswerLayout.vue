<template>
  <div>
    <h2 v-if="question.type === 'text'" class="text-3xl">
      {{ question.value }}
    </h2>
    <img v-else-if="question.type === 'image'" class="inline object-cover w-20 h-20 mr-2 object-cover w-16 h-16 mr-2 rounded" :src="question.value" alt="">
    <video v-else-if="question.type === 'video'" class="inline object-cover w-20 h-20 mr-2 object-cover w-16 h-16 mr-2 rounded" :src="question.value" alt=""/>
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
