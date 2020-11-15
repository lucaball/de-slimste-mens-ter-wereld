<template>
  <div>
    <div class="flex items-center mb-2">
      <div class="rounded-full h-6 w-6 flex mr-2 items-center justify-center">{{ itemNo }}</div>
      <input v-model="answer.value" @change="saveAnswer" class="rounded w-full p-2 border-2 border-gray-300 focus:border-gray-800" type="text">
    </div>
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
    itemNo: Number
  }
}
</script>

<style scoped>

</style>
