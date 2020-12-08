<template>
  <div>
    <div class="w-100 flex flex-row">
      <div>Hallo</div>
      <div>Helo</div>
      <div>Lets go</div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "PlayGame",
  props : {
    activePlayer: String,
    game: {}
  }
}
</script>

<style scoped>

</style>
