<template>
  <video autoplay muted class="h-full w-full object-cover absolute" ref="player_video"></video>
</template>

<script>
export default {
  name: "PlayerVideo",
  mounted() {
    this.peer.peer.on('stream',(stream) => {
      this.$refs.player_video.srcObject = stream;
    })
  },
  props: {
    peer: {}
  }
}
</script>

<style scoped>

</style>
