Component({
    data:{
        round:1,
        RAVEN : 1,  //乌鸦
        DOVE : 0,   //白鸽
        checked:false,
        myGrade:0,
        grade:{
            one:0,
            two:0,
            three:0
        },
        pickCards:{
            first:'',
            second:'',
            third:''
        },
        readyIcon:{
            packing:'waiting',
            ready:'success'
        },
        currentCard: 'first',
        scores: [0,0,0,0],
    },
    
    lifetimes:{
        attached() {
            wx.showLoading({
                title: '对手选牌中',
            })
            // 组件实例进入页面节点树时执行
            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
            this.playersCheck();
        }
    },
    methods:{
        playersCheck(){
            if(this.data.checked === false){
                for(let i = 1; i < 4;i ++){
                    let check = Math.random() >= 0.5 ? 2 : 1;
                    if(i === 1){
                        switch (check) {
                            case 1:
                                this.setData({
                                   'pickCards.first' : '../../image/白鸽牌.png'
                                })
                                break;
                            case 2:
                                this.setData({
                                    'pickCards.first' : '../../image/乌鸦牌.png'
                                 })
                                 break;
                            default:
                                break;
                        }
                    }
                    if(i === 2){
                        switch (check) {
                            case 1:
                                this.setData({
                                   'pickCards.second' : '../../image/白鸽牌.png'
                                })
                                break;
                            case 2:
                                this.setData({
                                    'pickCards.second' : '../../image/乌鸦牌.png'
                                 })
                                 break;
                            default:
                                break;
                        }
                    }
                    if(i === 3){
                        switch (check) {
                            case 1:
                                this.setData({
                                   'pickCards.third' : '../../image/白鸽牌.png'
                                })
                                break;
                            case 2:
                                this.setData({
                                    'pickCards.third' : '../../image/乌鸦牌.png'
                                 })
                                 break;
                            default:
                                break;
                        }
                    }
                }
            }
        },
        // gradeCheck(){

        // },
        checkCard(){
            wx.showLoading({
                title: '对局统计中',
            })
            // 组件实例进入页面节点树时执行
            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
            const value = this.data.currentCard === 'first' ? this.data.DOVE : this.data.RAVEN
            const card1 = this.data.pickCards.first === '../../image/白鸽牌.png' ? this.data.DOVE : this.data.RAVEN
            const card2 = this.data.pickCards.second === '../../image/白鸽牌.png' ? this.data.DOVE : this.data.RAVEN
            const card3 = this.data.pickCards.third === '../../image/白鸽牌.png' ? this.data.DOVE : this.data.RAVEN
            const newScores: number[] = this.calculateScores([value,card1,card2,card3]);
            this.addScore(newScores);
            if(this.data.round === 4){
                this.gameOver([this.data.myGrade,this.data.grade.one,this.data.grade.two,this.data.grade.three]);
                return;
            }
            let newround = this.data.round + 1;
            this.setData({
                round: newround
            })
            this.playersCheck();
        },
        handleRadioChange(e: { detail: { value: any; }; }) {
            const { value } = e.detail;
            this.setData({
                currentCard: value
            })
        },
        //最终分数统计
        gameOver(scores:number[]){
            wx.showLoading({
                title: '结果统计中',
            })
            // 组件实例进入页面节点树时执行
            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
            console.log(scores)
            const value = scores[0];
            let ranking = 1;
            scores.shift();
            console.log(scores)
            scores.forEach(score =>{
                if(score >= value){
                    ranking  = ranking + 1;
                }
            })
            console.log(ranking)
            if(ranking >= 3){
                wx.showToast({
                    title: '你死了',
                    icon: 'error',
                    duration: 2000
                  })                 
            }else{
                wx.showToast({
                    title: '胜利',
                    icon: 'success',
                    duration: 2000
                  })     
            }
            // this.clearGame();
            setTimeout(function () {
                wx.navigateBack();
            }, 2000)
            
        },
        //清空数据
        clearGame(){
            this.setData({
                round:1,
                checked:false,
                myGrade:0,
                grade:{
                    one:0,
                    two:0,
                    three:0
                },
            })
        },
        //为玩家添加分数
        addScore(scores:number[]){
            scores.forEach((score, index) =>{
                switch (index) {
                    case 0:
                        let newGrade = this.data.myGrade + score;
                        this.setData({
                            myGrade : newGrade
                        })
                        break;
                    case 1:
                        let newGrade2 = this.data.grade.one + score;
                        this.setData({
                            'grade.one' : newGrade2
                        })
                        break;
                    case 2:
                        let newGrade3 = this.data.grade.two + score;
                        this.setData({
                            'grade.two' : newGrade3
                        })
                        break;
                    case 3:
                        let newGrade4 = this.data.grade.three + score;
                        this.setData({
                            'grade.three' : newGrade4
                        })
                        break;
                    default:
                        break;
                }
            })
        },
        //分数判定方法
        calculateScores(choices: number[]): number[] {
            let ravenCount = 0;
            let scores: number[] = [0, 0, 0, 0];
          
            // 计算乌鸦牌的数量
            choices.forEach(choice => {
              if (choice === 1) ravenCount++;
            });
          
            // 根据规则计算得分
            switch (ravenCount) {
              case 0:
                scores.fill(3); // 所有玩家均为白鸽
                break;
              case 1:
                // 一名玩家为乌鸦，三名玩家为白鸽
                choices.forEach((choice, index) => {
                  scores[index] = choice === 0 ? 1 : 4;
                });
                break;
              case 2:
                // 两名玩家为乌鸦，两名玩家为白鸽
                choices.forEach((choice, index) => {
                  scores[index] = choice === 0 ? 3 : 0;
                });
                break;
              case 3:
                // 三名玩家为乌鸦，一名玩家为白鸽
                choices.forEach((choice, index) => {
                  scores[index] = choice === 0 ? 3 : -1;
                });
                break;
              case 4:
                scores.fill(-2); // 所有玩家均为乌鸦
                break;
            }
          
            return scores;
          }
    }
})