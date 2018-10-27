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
        let month = date.getMonth()
        let months = this.data.months
          this.setData({
            year: date.getFullYear(),
            month: months[month]
          })
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月',
         '十月','十一月','十二月'],
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