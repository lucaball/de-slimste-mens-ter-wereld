<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-row flex-grow space-x-2 h-screen/5">
      <div class="w-1/3 p-6"
           :key="gamePlayer.id"
           v-for="gamePlayer in game.gamePlayers"
           v-on:click="activatePlayer(gamePlayer)">
        <div
            class="h-full w-full rounded bg-gray-400 flex justify-center items-center"
            :class="{ 'border-4 border-gradient-tr-main-gradient' : (playingPlayer === gamePlayer) }"
        >
          <span class="text-6xl ">{{ gamePlayer.seconds }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-row space-x-4 flex-grow">
      <div class="h-100 w-1/2 p-6">
        <div class="bg-gray-400 rounded h-full w-full flex justify-center items-center">
          <span class="text-6xl" v-show="questionHtml.length === 0">Vraag hier.</span>
          <div v-html="questionHtml">
            Vraag hier.
          </div>
        </div>
        <div class="h-40 flex flex-row flex-wrap">
          <div class="w1/6 h-20 w-20">1</div>
          <div class="w1/6  h-20 w-20">1</div>
          <div class="w1/6  h-20 w-20">1</div>
          <div class="w1/6  h-20 w-20">1</div>
          <div class="w1/6  h-20 w-20">1</div>
          <div class="w1/6  h-20 w-20">1</div>
        </div>
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex flex-row justify-center">
          <button class="w-1/3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded p-8 text-white mx-2 my-4"
                  @click="startTicking()">Start
          </button>
          <button class="w-1/3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded p-8 text-white mx-2 my-4"
                  @click="stopTicking()">Stop
          </button>
        </div>
        <div class="flex flex-row flex-wrap">
          <button class="w-1/4 p-10" @click="modifySeconds(10);">+10</button>
          <button class="w-1/4 p-10" @click="modifySeconds(15);">+15</button>
          <button class="w-1/4 p-10" @click="modifySeconds(20);">+20</button>
          <button class="w-1/4 p-10" @click="modifySeconds(30);">+30</button>
          <button class="w-1/4 p-10" @click="modifySeconds(40);">+40</button>
          <button class="w-1/4 p-10" @click="modifySeconds(50);">+50</button>
        </div>
        <div class="flex">
          <button @click="modifySeconds(-20)">-20</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timer} from "rxjs";
import {tap} from "rxjs/operators";

export default {
  name: "PlayGame",
  data() {
    return {
      questionHtml: "",
      ticker: {},
      playingPlayer: {}
    }
  },
  mounted() {
    this.initTicker();
  },
  methods: {
    initTicker() {
      this.ticker = timer(1000, 1000).pipe(tap());
    },
    startTicking() {

      console.log(typeof this.ticker);

      const tickTick = this.ticker.subscribe(() => {
        this.playingPlayer.seconds -= 1;
      })

      this.ticker = tickTick;
    },
    async stopTicking() {
      await this.ticker.unsubscribe();
      this.initTicker();
    },
    activatePlayer(player) {
      this.$set(this, 'playingPlayer', player);
    },
    modifySeconds(seconds) {

      if (this.playingPlayer === null) {
        return;
      }

      this.playingPlayer.seconds += seconds;
    }
  },
  props: {
    activePlayer: String,
    game: {}
  }
}
</script>

<style scoped>

</style>
