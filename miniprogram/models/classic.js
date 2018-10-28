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
        db.collection('blink').where({
            index: type == 'next' ? index + 1 : index - 1
        }).get({
            success: res => {
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
    isFirst(index) {
        return index == 4 ? true : false
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

}
export {
    ClassicModel
}