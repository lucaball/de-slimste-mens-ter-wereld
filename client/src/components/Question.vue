<template>
  <div class="p-4 rounded bg-gray-200 mb-4">
    <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'text') }" @click="question.type = 'text'">
      <TextIcon size="20"></TextIcon>
    </button>
    <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'image') }" @click="question.type = 'image'">
      <ImageIcon size="20"></ImageIcon>
    </button>
    <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'video') }" @click="question.type = 'video'">
      <VideoIcon size="20"></VideoIcon>
    </button>

    <TextType :question="question" @input="question.value = $event"></TextType>
    <ImageType :question="question" @input="question.value = $event"></ImageType>
    <VideoType :question="question" @input="question.value = $event"></VideoType>

    <button class="mt-2 border-2 rounded p-2 border-black" @click="$emit('editanswers', question)">
      Antwoorden bewerken
    </button>
  </div>
</template>

<script>
import ImageIcon from "../Icons/ImageIcon";
import axios from "axios";
import TextType from "./InputTypes/TextType";
import ImageType from "./InputTypes/ImageType";
import VideoType from "./InputTypes/VideoType";
import VideoIcon from "../Icons/VideoIcon";
import TextIcon from "../Icons/TextIcon";

export default {
  name: "Question",
  components: {VideoIcon, VideoType, ImageType, TextType, ImageIcon, TextIcon},
  methods: {
    saveQuestion() {
      axios.put('/question/' + this.question.id, this.question)
    },
  },
  props: {
    question: {}
  },
}
</script>

<style scoped>

</style>
