<template>
  <div class="p-4 rounded bg-gray-200 mb-4 bg-gradient-to-bl from-start to-end">
    <div class="flex justify-between text-white">
      <div>
        <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'text') }" @click="question.type = 'text'">
          <TextIcon :size=20></TextIcon>
        </button>
        <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'image') }" @click="question.type = 'image'">
          <ImageIcon :size=20></ImageIcon>
        </button>

        <button class="pr-2 pb-2 text-gray-500 hover:text-black" :class="{ 'text-gray-900' : (question.type === 'video') }" @click="question.type = 'video'">
          <VideoIcon :size=20></VideoIcon>
        </button>
      </div>
      <div>
        <DeleteButton @confirm="deleteQuestion()"></DeleteButton>
      </div>
    </div>

    <TextType :question="question" @input="saveQuestion()"></TextType>
    <ImageType :question="question" @input="saveQuestion()"></ImageType>
    <VideoType :question="question" @input="saveQuestion()"></VideoType>

    <a aria-label="button" class="text-white mt-4 hover:underline cursor-pointer" @click="$emit('editanswers', question)">
      Antwoorden bewerken
    </a>
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
import DeleteButton from "./Buttons/DeleteButton";

export default {
  name: "Question",
  components: {DeleteButton, VideoIcon, VideoType, ImageType, TextType, ImageIcon, TextIcon},
  data(){
    return {
      originalType : '',
      origialValue : ''
    }
  },
  watch : {
    'question.type'  : function() {
        this.question.value = "";
    }
  },
  mounted() {
    this.originalType = this.question.type;
  },
  methods: {
    deleteQuestion(){
      axios.delete("/question/" + this.question.id).then((response) => {
        if (response.data){
          this.$emit('delete')
        }
      });
    },
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
