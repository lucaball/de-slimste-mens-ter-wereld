<template>
  <div v-if="question.type === 'image' " class="w-full">
    <div class="flex w-full" @click="$refs.mediaManager.open()">
      <div class="">

      </div>
      <div class="border-2 border-black p-2 border-dashed w-ful">
        {{ question.value }}
      </div>
    </div>
    <MediaManager ref="mediaManager"></MediaManager>
  </div>
</template>

<script>
import MediaManager from "../MediaManager";
export default {
  name: "ImageType",
  components: {MediaManager},
  props: {
    question: {}
  }
}
</script>

<style scoped>

</style>
