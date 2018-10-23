import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
    getLatest(sCallback){
        this.request({
            success:(res)=>{
              sCallback(res)
              
            }
         })
    }
}
export {ClassicModel}