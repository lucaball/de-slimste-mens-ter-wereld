<template>
  <div>
    <div class="flex flex-row space-x-2">
      <div class="w-1/3 h-56 bg-gray-400">1</div>
      <div class="w-1/3 h-56 bg-gray-400">2</div>
      <div class="w-1/3 h-56 bg-gray-400">3</div>
    </div>
    <div class="flex flex-row space-x-4 flex-grow">
      <div class="h-100 w-1/2 bg-gray-400">
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex flex-row">
          <button class="w-1/2">Start</button>
          <button class="w-1/2">Stop</button>
        </div>
        <div class="flex flex-row flex-wrap">
          <button class="w-1/4">+10</button>
          <button class="w-1/4">+15</button>
          <button class="w-1/4">+20</button>
          <button class="w-1/4">+30</button>
          <button class="w-1/4">+40</button>
          <button class="w-1/4">+50</button>
        </div>
        <div class="flex">
          <button>-20</button>
        </div>
      </div>
    </div>
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
