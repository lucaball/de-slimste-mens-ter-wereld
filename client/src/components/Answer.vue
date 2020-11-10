<template>
  <div>
    <input v-model="answer.value" @change="saveAnswer" class="rounded w-full p-2" type="text">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Answer",
  methods: {
    saveAnswer() {
      axios.put('/answer/' + this.answer.id, {
        answer: this.answer
      }).then((response) => {
        this.answers = response.data.answer;
      })
    }
  },
  props: {
    answer: {},
    question: {},
  }
}
</script>

<style scoped>

</style>
