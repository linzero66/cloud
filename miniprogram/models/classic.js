import {
    HTTP
} from '../util/http.js'
class ClassicModel extends HTTP {
    // getLatest(sCallback){
    //     this.request({
    //         success:(res)=>{
    //           sCallback(res)

    //         }
    //      })
    // }
    getLatest(sCallback) {
        const db = wx.cloud.database()

        db.collection('blink').orderBy('pubdate', 'desc').limit(1).get({
            success: res => {
                sCallback(res)
                console.log('[数据库] [查询记录] 成功: ', res)
                this._setLatestIndex(res.data[0].index)
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
    getTurn(index, type, sCallback) {
        const db = wx.cloud.database()
        let classicIndex = type == 'next' ? this._getIndex(index + 1) : this._getIndex(index - 1);
        let classicInfo = wx.getStorageSync(classicIndex);
        if (!classicInfo) {
            db.collection('blink').where({
                index: type == 'next' ? index + 1 : index - 1
            }).get({
                success: res => {
                    wx.setStorageSync(classicIndex,res)
                    console.log('[数据库] [查询记录] 成功: ', res)
                    sCallback(res)
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
        else{
            sCallback(classicInfo)
        }

    }
    isFirst(index) {
        return index == 3 ? true : false
    }
    isLatest(index) {
        return index == this._getLatestIndex(index) ? true : false
    }
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    _getLatestIndex(index) {
        return wx.getStorageSync('latest')
    }
    _getIndex(index) {
        let numIndex = "classis-" + index;
        return numIndex;
    }
    getLikeOrUnlike(index,type,sCallback){
        const db = wx.cloud.database()
        db.collection('blink').where({
            index: type == 'next' ? index + 1 : index - 1
        }).field({
            like_status: true,
            fav_nums: true
          })
         .get({
            success: res => {
                sCallback(res)
                console.log('[数据库] [查询记录] 成功: ', res)
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

}
export {
    ClassicModel
}