<template>
  <Modal ref="mediaManagerModal">
    <template v-slot:header>
      Kies of upload een afbeelding
    </template>
    <template v-slot:body>
      <header class="border-dashed border-2 border-gray-400 py-2 flex flex-col justify-center items-center">
        <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
          <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
        </p>
        <label for="fileUpload" id="button"
               class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
          Upload
          <input class="hidden" id="fileUpload" @change="upload($event)" type="file">
        </label>
      </header>
      <div class="flex flex-wrap -mx-2 overflow-hidden">
        <div @click="$emit('choose', file);" class="my-2 px-2 w-1/3 cursor-pointer overflow-hidden"
          v-for="file in files" :key="file.id">
          <img v-if="type === 'image'" :src="file.path" alt="">
          <video v-else class="inline object-cover w-20 h-20 mr-2 object-cover w-16 h-16 mr-2 rounded" :src="file.path" alt=""/>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "../components/Modal";
import axios from "axios";

export default {
  name: "MediaManager",
  components: {Modal},
  data() {
    return {
      files: []
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      default: 'image'
    }
  },
  methods: {
    upload(file) {

      const config = {headers: {'Content-Type': 'multipart/form-data'}};
      let fd = new FormData();
      fd.append('file', file.target.files[0]);
      axios.post('/upload/files?type=' + this.type, fd, config).then((response) => {
        this.files.push(response.data.file);
        this.$emit('choose', response.data.file);
      });
    },
    open() {

      if (this.files.length <= 0) {
        axios.get('/files?type=' + this.type, {}).then((response) => {
          this.files = response.data.files;
        });
      }

      this.$refs.mediaManagerModal.open();
    },
    close() {
      this.$refs.mediaManagerModal.close();
    }
  }
}
</script>

<style scoped>

</style>
