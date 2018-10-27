// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String
      },
      firstBoolean:{
        type:Boolean
      },
      lastBoolean:{
        type:Boolean
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
      leftSrc:"images/triangle@left.png",
      disLeftSrc:"images/triangle.dis@left.png",
      rightSrc:"images/triangle@right.png",
      disRightSrc:"images/triangle.dis@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onLeft(e){
        if(!this.properties.lastBoolean){
           this.triggerEvent('left',{behavior: 'next'},{})
        }
         
      },
      onRight(e){
        if(!this.properties.firstBoolean){
          this.triggerEvent('right',{behavior: 'last'},{})
        }
        
      }
  }
})
