<template>
  <Modal ref="mediaManagerModal">
    <template v-slot:header>
      Kies een afbeelding HALOOOOO
    </template>
    <template v-slot:body>
      <header class="border-dashed border-2 border-gray-400 py-2 flex flex-col justify-center items-center">
        <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
          <span>Drag and drop your</span>&nbsp;<span>files anywhere oRr</span>
        </p>
        <label for="fileUpload" id="button" class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
          <input id="fileUpload" @change="upload($event)" type="file">
        </label>
      </header>
    </template>
  </Modal>
</template>

<script>
import Modal from "../components/Modal";
import axios from "axios";

export default {
  name: "MediaManager",
  components: {Modal},
  mounted() {
    this.$refs.mediaManagerModal.openModal();
  },
  watch : {

  },
  methods : {
    upload(image){

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      let fd = new FormData();
      fd.append('image',image.target.files[0]);
      axios.post('/upload/image', fd, config);
    },
    open(){
      this.$refs.mediaManagerModal.openModal();
    }
  }
}
</script>

<style scoped>

</style>
