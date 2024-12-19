
Component({
  data: {
    
  },
  methods: {
    onJumpRule(){
        console.log('111')
        wx.navigateTo({
            url: '/pages/rule/rule',
            success() {
                console.log('222')
            },
            fail(err) {
                console.error('navigateTo failed,', err);
            },
        })
    },
    onJumpGame(){
        wx.navigateTo({
            url: '/pages/game/game'
        })
    }
  },
})
