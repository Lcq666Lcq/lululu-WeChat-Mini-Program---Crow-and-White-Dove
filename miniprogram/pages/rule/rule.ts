// pages/rule/rule.ts
Component({
    data:{

    },
    methods:{
        backIndex(){
            wx.navigateTo({
                url: '/pages/index/index',
                success() {
                    console.log('222')
                },
                fail(err) {
                    console.error('navigateTo failed,', err);
                },
            })
        },
    }
})