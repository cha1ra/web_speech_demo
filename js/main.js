/* -------------------------------
Speech Recognition
------------------------------- */

const recognition = new webkitSpeechRecognition()

recognition.lang = 'ja-JP'

// ユーザーエージェントが物音を察知したら発火
// https://webtan.impress.co.jp/g/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88
recognition.onaudiostart = () => {
  console.log('onaudiostart')
}
// なんかの音が鳴ったら発火
recognition.onsoundstart = () => {
  console.log('onsoundstart')
}
// 音声認識サービスにより音声として認識された音が検出された時
recognition.onspeechstart = () => {
  console.log('onspeechstart')
}
recognition.onspeechend = () => {
  console.log('onspeechend')
}
recognition.onsoundend = () => {
  console.log('onsoundend')
}
recognition.onaudioend = () => {
  console.log('onaudioend')
  recognition.stop()
}
recognition.onresult = (event) => {
  console.log('onresult')
  console.log(event)
  const text = event.results[0][0].transcript
  vm.word = text
}

/* -------------------------------
Speech Synthesis
------------------------------- */

const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
const voices = synth.getVoices()

console.log(voices)
// 7番だけ日本人 他は英語
utterThis.voice = voices[7]
// 音量 min 0 ~ max 1
utterThis.volume = 1.0
// 速度 min 0 ~ max 10
utterThis.rate = 1.0
// 音程 min 0 ~ max 2
utterThis.pitch = 1.0

// 喋る内容
utterThis.text = '喋ります'
utterThis.lang = 'ja-JP'

/* -------------------------------
Vue.js
------------------------------- */

let languages = [
  {
    id: 1,
    name: '日本語',
    code: 'ja-JP'
  },
  {
    id: 2,
    name: 'English',
    code: 'en-US'
  }
]

const vm = new Vue({
  el: '#app',
  data: {
    title: 'Translator',
    description: '言語を選択して話す',
    selected: 'ja-JP',
    languages: languages,
    word: ''
  },
  methods: {
    listen: function (event) {
      console.log(this.selected)
      recognition.lang = this.selected
      recognition.start()
    },
    speak: function (event) {
      utterThis.text = this.word === '' ? 'undefined' : this.word
      utterThis.lang = this.selected
      synth.speak(utterThis)
    }
  }
})
