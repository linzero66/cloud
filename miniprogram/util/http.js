import {config} from "../config.js"

class HTTP{
    request(params){
        wx.request({
            url:'http://www.baidu.com' ||config.api_base_url + params.url,
            method: params.method || 'GET',
            data:params.data,
            header:{
                'content-type':'application/json',
                'appkey':'appkey',
            },
            success:(res)=>{
               
                let code = res.statusCode.toString()
                if (code.startsWith('2')){
                    params.success(res)
                }
                else{
                    wx.showToast({
                        title: '错误',
                        icon: 'none',
                        duration:1500
                    })
                }
            },
            fail:(err)=>{

            }
        })
    }
}

export {HTTP}