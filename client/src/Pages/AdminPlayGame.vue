<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-row flex-grow space-x-2 h-screen/5">
      <div class="w-1/3 p-6"
           :key="gamePlayer.id"
           v-for="gamePlayer in game.gamePlayers"
           v-on:click="activatePlayer(gamePlayer)">
        <div class="h-full w-full rounded bg-gray-400 flex justify-center items-center"
             :class="{ 'border-4 border-gradient-tr-main-gradient' : (playingPlayer === gamePlayer) }">
          <span class="text-6xl ">{{ gamePlayer.seconds }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-row space-x-4 flex-grow">
      <div class="h-100 w-1/2 p-6">
        <div class="flex flex-row h-full">
          <div class="w-1/2 p-2">
            <div class="bg-main-gradient text-white p-4 mb-2 cursor-pointer rounded bg-gradient-to-bl from-start to-end"
                 @click="roundIndex -= 1">Previous round
            </div>
            <div @click="wsEmit('activateQuestion' , question); setActiveQuestionAnswers(question.answers)"
                 class="bg-gray-400 p-4 mb-2 cursor-pointer rounded"
                 v-for="question in activeRound.questions"
                 :key="question.id">
              <span>
                {{ question.value }}
              </span>
            </div>
            <div class="p-4 mb-2 cursor-pointer rounded bg-gradient-to-bl from-start to-end text-white"
                 @click="roundIndex += 1">Next round
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div class="bg-gray-400 p-4 mb-2 cursor-pointer rounded"
                 :class="{ 'border-4 border-gradient-tr-main-gradient' : answer.isShown }"
                 v-for="(answer, index) in activeQuestionAnswers"
                 :key="answer.key"
                 v-on:click="activateAnswer(answer, index)">
              <label :for="answer.id">
                <input class="hidden" :id="answer.id" type="checkbox" v-model="answer.isShown">
                {{ answer.value }} - {{ answer.isShown }}
              </label>
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
        <div class="flex flex-col flex-wrap">
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
      roundIndex: 0,
      activeQuestionAnswers: [],
      questionHtml: "",
      ticker: {},
      playingPlayer: {},
    }
  },
  mounted() {
    this.initTicker();
    this.connectToWebsockets();

    this.sockets.subscribe('message', function (data) {
      this.questionHtml = data.html;
    })
  },
  computed: {
    activeRound: function () {
      return this.game.rounds[this.roundIndex];
    }
  },
  methods: {
    activateAnswer(answer, index) {
      this.activeQuestionAnswers[index].isShown = true;
      this.wsEmit('initShowAnswer', {id: answer.id, value: answer.value});
    },
    connectToWebsockets() {
      let self = this;
      this.$socket.on('connect', function () {
        self.$socket.emit('room', self.game.id);
      });
    },
    initTicker() {
      this.ticker = timer(1000, 1000).pipe(tap());
    },
    startTicking() {

      this.ticker = this.ticker.subscribe(() => {
        this.playingPlayer.seconds -= 1;
      });

      this.wsEmit('initStartTicking');
    },

    async stopTicking() {
      await this.ticker.unsubscribe();
      this.initTicker();
      this.wsEmit('initStopTicking');
    },

    activatePlayer(player) {
      this.$set(this, 'playingPlayer', player);
      this.wsEmit('initActivateUser', {
        player: player
      });
    },

    wsEmit(event, body) {
      this.$socket.emit(event, {
        room: this.game.id,
        ...body,
      });
    },

    modifySeconds(seconds) {

      if (this.playingPlayer === null) {
        return;
      }

      this.playingPlayer.seconds += seconds;
      this.wsEmit('initAddSeconds', {seconds: seconds})
    },
    setActiveQuestionAnswers(answers) {
      this.activeQuestionAnswers = answers.map((answer) => {
        answer.isShown = false;
        return answer;
      });
    }
  },
  props: {
    game: {}
  }
}
</script>

<style scoped>

</style>
