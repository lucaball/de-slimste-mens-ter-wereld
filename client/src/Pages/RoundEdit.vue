<template>
  <GameComposite :game="game">
    <div class="w-5/12">
      <h2 class="text-3xl">{{ round.name }}</h2>
      <Question @editanswers="showAnswersEdit" class="py-4" :question="question"
                v-for="question in round.questions" :key="question.id">

      </Question>
      <button @click="addQuestion"
              class="mt-3 w-full bg-black font-bold text-white text-center rounded py-2 text-uppercase">
        Voeg een vraag toe
      </button>
    </div>
    <div class="w-6/12">
      <QuestionAnswerLayout :answers="answers">
      </QuestionAnswerLayout>
    </div>
  </GameComposite>
</template>

<script>

import GameComposite from "./GameComposeLayout";
import Question from "../components/Question";
import Answer from "../components/Answer";
import axios from "axios";
import QuestionAnswerLayout from "../components/QuestionAnswerLayout";

export default {
  name: "RoundEdit",
  components: {QuestionAnswerLayout, Question, GameComposite},
  data() {
    return {
      questionToEditAnswers: {},
      answers : []
    }
  },
  methods: {
    addQuestion() {
      this.round.questions.push({
        id: null,
        value: "Leuk hé, die vragen zo - ",
        position: 0
      })
    },
    showAnswersEdit(question) {

      this.questionToEditAnswers = question
      this.answers = [];

      if (null !== question.id) {
        axios
            .get('/question/' + question.id + '/answers')
            .then((response) => {
              console.log(response);
            })
      }

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