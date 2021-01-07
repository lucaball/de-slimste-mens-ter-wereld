<template>
  <video autoplay class="h-full w-full object-cover absolute" ref="player_video"></video>
</template>

<script>
export default {
  name: "PlayerVideo",
  methods : {
    setupCall(){

      if(this.call === undefined){
        return;
      }

      this.call.on('stream',(stream) => {
        console.log(stream);
        const newVid = this.$refs.player_video;
        newVid.srcObject = stream;
        newVid.playsinline = false
        newVid.autoplay = true
        newVid.className = "vid"
      });
    }
  },
  mounted() {
    this.setupCall();
  },
  props: {
    call: null
  }
}
</script>

<style scoped>

</style>
