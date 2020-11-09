<template>
  <GameComposite :game="game">
    <div class="w-5/12 p-10 border-r-2 border-black">
      <h2 class="text-3xl">{{ round.name }}</h2>
      <Question @editanswers="showAnswersEdit" class="py-4" :question="question"
                v-for="question in round.questions" :key="question.id">

      </Question>
      <button @click="addQuestion"
              class="mt-3 w-full border-dashed border-gray-500 text-gray-500 border-2 font-bold text-center rounded py-2 uppercase">
        Voeg een vraag toe
      </button>
    </div>
    <div class="w-6/12">
      <QuestionAnswerLayout class="p-10" :answers="answers">
      </QuestionAnswerLayout>
    </div>
  </GameComposite>
</template>

<script>

import GameComposite from "./GameComposeLayout";
import Question from "../components/Question";
import axios from "axios";
import QuestionAnswerLayout from "../components/QuestionAnswerLayout";

export default {
  name: "RoundEdit",
  components: {QuestionAnswerLayout, Question, GameComposite},
  data() {
    return {
      questionToEditAnswers: {},
      answers: []
    }
  },
  methods: {

    addQuestion() {
      axios.post('/question/new', {
        round: this.round.id
      }).then((response) => this.round.questions.push(response.data.question))
    },
    
    showAnswersEdit(question) {

      this.questionToEditAnswers = question
      this.answers = [];

      axios
          .get('/question/' + question.id + '/answers')
          .then((response) => {
            console.log(response);
          });
    }
  },
  props: {
    game: {},
    round: {}
  }
}
</script>

<style scoped>

</style>