<template>
  <div v-if="question.type === 'image' " class="w-full">
    <div class="flex w-full">
      <div class="cursor-pointer border-2 border-black p-2 border-dashed w-full text-center" @click="$refs.mediaManager.open()">
        <span v-if="question.value.length === 0">
            Kies een afbeelding
        </span>
        <div v-else>
          <div>
              <img class="inline object-cover w-20 h-20 mr-2 object-cover w-16 h-16 mr-2 rounded" :src="question.value" alt="">
          </div>
        </div>
      </div>
    </div>
    <MediaManager type="image" @choose="save" ref="mediaManager"></MediaManager>
  </div>
</template>

<script>
import MediaManager from "../MediaManager";

export default {
  name: "ImageType",
  components: {MediaManager},
  methods: {
    save($event){
      this.question.value = $event.path;
      this.$refs.mediaManager.close();
      this.$emit('input');
    }
  },
  props: {
    question: {}
  }
}
</script>

<style scoped>

</style>
