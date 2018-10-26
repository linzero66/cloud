// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function (newValue, oldValue, changedPath) {
        let index = newValue < 10 ? '0' + newValue : newValue;
        this.setData({
          _index: index
        })
      },
    },
    pubDate: {
      type: String,
      observer: function (newValue, oldValue, changedPath) {
        let date = new Date(newValue)
        let month = date.getMonth() <10? '0'+date.getMonth():date.getMonth()
          this.setData({
            year: date.getFullYear(),
            month: month
          })
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month: '',
    year: '',
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})