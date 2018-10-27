//index.js
import {ClassicModel} from '../../models/classic.js'
let classic = new ClassicModel()
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    classicData:null,
    clock:true,
    first:false,
    latest:true,
    newest: '',
  },

  onLoad: function() {
    const db = wx.cloud.database()
   
    db.collection('blink').orderBy('pubdate','desc').limit(1).get({
      success: res => {
        this.setData({
          classicData: res.data[0],
          newest: res.data[0].index
        })
        console.log('[数据库] [查询记录] 成功: ',this.data.classicData.pubdate)
        console.log('[数据库] [查询记录] 成功: ',res)
      
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


    // classic.getLatest((res)=>{
    //     console.log(res);
    //     //数据更新(数据添加和更新)
    //     this.setData({
    //       classic:res
    //     })
    // })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },


  onTurn(event){
      if(this.data.clock){
        this.setData({
          clock:false
        })
        const db = wx.cloud.database()
        console.log(event);
        
        let type = event.detail.behavior;
        let index = this.data.classicData.index;
        let newest = this.data.newest;
        console.log(newest);
        
        db.collection('blink').where({
          index:type == 'next'? index+1 : index-1
        }).get({
          success: res => {
            console.log('[数据库] [查询记录] 成功: ',res)
            
            this.setData({
              classicData: res.data[0],
              clock:true,
              first:res.data[0].index == 4?true:false,
              latest:res.data[0].index == newest?true:false
            })
          
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })

      }
      
    },





















  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })
        console.log(res)
        const filePath = res.tempFilePaths[0]
        console.log(filePath.split('.'))
        let imageName = filePath.split('.')[filePath.split('.').length -2]
        // 上传图片
        const cloudPath = imageName + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //添加数据库记录
  addData:function(){
    const db = wx.cloud.database()
    db.collection('blink').add({
      data: {
        content: "learn cloud database",
        title: "李安<<饮食男女>>",
        pubdate: new Date("2018-09-01"),
        fav_nums: 20,
        like_status: false
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }

})
