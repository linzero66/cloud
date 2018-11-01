// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'

const BGM = wx.getBackgroundAudioManager()

Component({

  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: './images/player@playing.png',
    waitSrc: './images/player@waitting.png',
    playing: false
  },
  attached() {
    this._coverStatus()
    this._monitorStatus()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlaying() {
      let playing = this.data.playing
      if (!playing) {
        BGM.src = this.properties.url
        BGM.play()
      } else {
        BGM.stop()
      }
      this.setData({
        playing: !playing
      })
    },
    _coverStatus() {

      if (BGM.paused) {
        this.setData({
          playing: false
        })
        return;
      }

      if (BGM.src == this.properties.url) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorStatus() {
      BGM.onPlay(() => {
        this._coverStatus()
      })
      BGM.onPause(() => {
        this._coverStatus()
      })
      BGM.onEnded(() => {
        this._coverStatus()
      })
      BGM.onStop(() => {
        this._coverStatus()
      })
    }

  }
})