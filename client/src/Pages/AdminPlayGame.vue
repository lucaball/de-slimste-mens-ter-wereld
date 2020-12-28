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
        <div class="flex flex-row h-full">
          <div class="w-1/2">
            <div class="bg-gray-400 p-4 mb-2 cursor-pointer"
                 v-for="question in playingRound.questions" :key="question.id">
              <span @click="$socket.emit('activateQuestion' , {
                   room: game.id,
                   ...question
                 })">
                {{ question.value }}
              </span>
              <div v-for="answer in question.answers" :key="answer.key"
                   @click="$socket.emit('initShowAnswer', { room: game.id,  id: answer.id, value: answer.value })">
                {{ answer.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex flex-col">
        <div class="flex flex-row justify-center">
          <button
              class="w-1/3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded p-8 text-white mx-2 my-4"
              @click="startTicking()">Start
          </button>
          <button
              class="w-1/3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded p-8 text-white mx-2 my-4"
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
  name: "AdminPlayGame",
  data() {
    return {
      questionHtml: "",
      ticker: {},
      playingPlayer: {},
    }
  },
  mounted() {
    this.initTicker();
    this.connectToWebsockets();
    this.sockets.subscribe('message', function(data){
      this.questionHtml = data.html;
    })
  },
  methods: {
    connectToWebsockets(){
      let self = this;
      this.$socket.on('connect', function() {
        self.$socket.emit('room', self.game.id);
      });
    },
    initTicker() {
      this.ticker = timer(1000, 1000).pipe(tap());
    },
    startTicking() {

      const tickTick = this.ticker.subscribe(() => {
        this.playingPlayer.seconds -= 1;
      })

      this.ticker = tickTick;
      this.$socket.emit('initStartTicking', {
        room : this.game.id
      });
    },
    async stopTicking() {
      await this.ticker.unsubscribe();
      this.initTicker();
      this.$socket.emit('initStopTicking', {
        room : this.game.id
      });
    },
    activatePlayer(player) {
      this.$set(this, 'playingPlayer', player);
      this.$socket.emit('initActivateUser', {
        room : this.game.id,
        player: player
      });
    },
    modifySeconds(seconds) {

      if (this.playingPlayer === null) {
        return;
      }

      this.playingPlayer.seconds += seconds;
    }
  },
  props: {
    playingRound : {},
    game: {}
  }
}
</script>

<style scoped>

</style>
