<template>
  <div class="flex flex-col items-stretch h-screen">
    <nav id="header" class="w-full top-0 border-b-2 border-black py-4 px-2">
      <div class="mx-auto flex flex-wrap flex-col">
        <h3 class="font-bold text-3xl">{{ game.name }}</h3>
        <small>Joincode: {{ game.joinCode }}</small>
      </div>
    </nav>
    <div class="w-12/12 flex flex-col flex-grow">
      <div class="flex flew-col h-full">
        <div class="flex flex-col w-2/12 text-center border-r-2 border-black">
          <span class="flex items-center flex-1 self-center" v-for="round in game.rounds" :key="round.id">
            <inertia-link class="hover:underline" :href="'/game/' + game.id + '/rounds/' + round.id">
              <span class="py-2 hover:border-b">
                {{ round.name }}
              </span>
            </inertia-link>
          </span>
        </div>
        <div class="flex flex-row w-10/12">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameComposite",
  props: {
    game: {}
  }
}
</script>

<style scoped>

</style>
