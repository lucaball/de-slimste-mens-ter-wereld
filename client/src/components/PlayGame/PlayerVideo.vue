<template>
  <video autoplay class="h-full w-full object-cover absolute" ref="player_video"></video>
</template>

<script>
export default {
  name: "PlayerVideo",
  mounted() {
    this.peer.on('stream',(stream) => {
      const newVid = this.$refs.player_video;
      newVid.srcObject = stream;
      newVid.playsinline = false
      newVid.autoplay = true
      newVid.className = "vid"
    })
  },
  props: {
    peer: {}
  }
}
</script>

<style scoped>

</style>
