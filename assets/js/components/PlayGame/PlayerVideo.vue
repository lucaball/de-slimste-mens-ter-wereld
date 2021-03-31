<template>
  <video :srcObject.prop="stream"
         autoplay
         class="h-full w-full object-cover absolute"
         ref="player_video">
  </video>
</template>

<script>
export default {
  name: "PlayerVideo",
  data(){
    return {
      muted: false,
      stream: null,
    }
  },
  methods : {
    setupStream(){
      if(this.ownStream !== null){
        this.$refs.player_video.muted = true;
        this.stream = this.ownStream;
      }
    },
    setupCall(){

      if(this.call === undefined){
        return;
      }

      this.call.on('stream',(stream) => {
        this.stream = stream;
      });
    }
  },
  mounted() {
    this.setupCall();
    this.setupStream();
  },
  watch : {
    ownStream : function(newVal) {
      console.log('HALOOO');
      this.stream = newVal
    }
  },
  props: {
    ownStream: null,
    call: null,
  }
}
</script>

<style scoped>

</style>
