<template>
  <div class="p-4 rounded bg-gray-200 mb-4">
    <component v-bind:is="currentTabComponent" class="tab"></component>
    <label for="texttype" class="p-1 rounded bg-blue-200 mr-2" :class="{ 'bg-blue-700' : (question.type === 'text') }">
      T
      <input type="radio" id="texttype" value="text" class="hidden" v-model="question.type">
    </label>
    <label for="imagetype" class="p-1 rounded bg-blue-200 mr-2" :class="{ 'bg-blue-700' : (question.type === 'image') }">
      <ImageIcon size="22"/>
      <input type="radio" id="imagetype" value="image" class="hidden" v-model="question.type">
    </label>
    <label for="videotype" class="p-1 rounded bg-blue-200 mr-2" :class="{ 'bg-blue-700' : (question.type === 'video') }">
      V
      <input type="radio" id="videotype" value="video" class="hidden" v-model="question.type">
    </label>
    <input
        @change="saveQuestion"
        ref="gameName"
        v-model="question.value"
        type="text"
        id="question-name"
        class="px-4 py-2 rounded w-full">
    <button class="mt-2 border-2 rounded p-2 border-black" @click="$emit('editanswers', question)">
      Antwoorden bewerken
    </button>
  </div>
</template>

<script>
import ImageIcon from "../Icons/ImageIcon";
import axios from "axios";
import TextType from "./InputTypes/TextType";

export default {
  name: "Question",
  components: {TextType, ImageIcon},
  data(){
    return {
      currentTabComponent : TextType
    }
  },
  methods : {
    saveQuestion(){
      axios.put('/question/' + this.question.id, this.question)
    }
  },
  props: {
    question: {}
  },
}
</script>

<style scoped>

</style>