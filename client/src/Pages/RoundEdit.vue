<template>
  <MediaManager></MediaManager>
<!--  <GameComposite :game="game">-->
<!--    <div class="w-5/12 p-10 border-r-2 border-black">-->
<!--      <h2 class="text-3xl">{{ round.name }}</h2>-->
<!--      <Question @editanswers="showAnswersEdit" class="py-4" :question="question" @delete="deleteFromCollection(index)"-->
<!--                v-for="(question, index) in round.questions" :key="question.id" :ref="question.id">-->
<!--      </Question>-->
<!--      <button @click="addQuestion"-->
<!--              class="mt-3 w-full border-dashed border-gray-500 text-gray-500 border-2 font-bold text-center rounded py-2 uppercase">-->
<!--        Voeg een vraag toe-->
<!--      </button>-->
<!--    </div>-->
<!--    <div class="w-6/12">-->
<!--      <QuestionAnswerLayout v-if="questionHasBeenChosen" class="p-10" :question="questionToEditAnswers" :answers="answers">-->
<!--      </QuestionAnswerLayout>-->
<!--    </div>-->
<!--  </GameComposite>-->
</template>

<script>

import GameComposite from "./GameComposeLayout";
import Question from "../components/Question";
import axios from "axios";
import QuestionAnswerLayout from "../components/QuestionAnswerLayout";
import MediaManager from "../components/MediaManager";

export default {
  name: "RoundEdit",
  components: {MediaManager, QuestionAnswerLayout, Question, GameComposite},
  data() {
    return {
      questionHasBeenChosen : false,
      questionToEditAnswers: {},
      answers: []
    }
  },
  methods: {
    deleteFromCollection(index){
      this.$delete(this.round.questions, index);
    },
    addQuestion() {
      axios.post('/question/new', {
        round: this.round.id
      }).then((response) => {
        this.round.questions.push(response.data.question);
      })
    },

    showAnswersEdit(question) {

      this.questionHasBeenChosen = true;
      this.questionToEditAnswers = question
      this.answers = [];

      axios
          .get('/question/' + question.id + '/answers')
          .then((response) => {
            this.answers = response.data.question.answers
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
