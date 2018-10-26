// components/like/index.js
const util = require('../../util/antiShake.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      count: {
        type:Number
      },
      like:{
        type:Boolean
      },
      weeklyID:{
        type:String,
      },
      dataBaseName:{
        type:String,
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      yesSrc:'image/like.png',
      noSrc:'image/like@dis.png',
      type:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onclick(){
          if(this.data.type){
            this.setData({
              type : false
            })
            this.onLike()
          }
      },
      // onLike:util.throttle(function(e){
        
      //   let like = this.properties.like;
      //   let count = this.properties.count;
      //   let weeklyID = this.properties.weeklyID
      //   let vm = this;
      //   const db = wx.cloud.database()
      //   const _ = db.command
      //   db.collection('blink').doc(weeklyID).update({
      //         data: {
      //           like_status: !like,
      //           fav_nums:like?_.inc(-1):_.inc(1)
      //         },
      //         success: function(res) {
      //           vm.setData({
      //             like:!like,
      //             count:like?count-1:count+1,
      //             type:true
      //           })
      //           console.log(res)
      //         },
      //         fail: function(res) {
      //           console.log(res)
      //         }
      //     })
      // }, 1000),
      onLike(e){
        let like = this.properties.like;
        let count = this.properties.count;
        let weeklyID = this.properties.weeklyID
        let dataBaseName = this.properties.dataBaseName
        let vm = this;
        const db = wx.cloud.database()
        const _ = db.command
        db.collection(dataBaseName).doc(weeklyID).update({
              data: {
                like_status: !like,
                fav_nums:like?_.inc(-1):_.inc(1)
              },
              success: function(res) {
                vm.setData({
                  like:!like,
                  count:like?count-1:count+1,
                  type:true
                })
                console.log(res)
              },
              fail: function(res) {
                console.log(res)
              }
          })
      }
   }
})
