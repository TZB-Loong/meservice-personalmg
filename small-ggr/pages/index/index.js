//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isSupport: false,
    canAuthentication:wx.canIUse('checkIsSupportSoterAuthentication')
  },
  onLoad: function () {
    wx.showLoading({ mask: true });
    //设备支持指纹识别时
    if (this.data.canAuthentication) {
      wx.checkIsSupportSoterAuthentication({success:res=> this.checkSucess(res),fail:res=>this.checkFail(res)});
      return
    }
    //设备不支持指纹识别（执行）

  },
  checkSucess(res){
    let supportMode = res.supportMode;
    if(supportMode[0] == 'fingerPrint'){
      wx.checkIsSoterEnrolledInDevice({checkAuthMode:"fingerPrint",success:res=>{
        //已经录入指纹
        if(res.isEnrolled != 0){
          wx.startSoterAuthentication({
            requestAuthModes:['fingerPrint'],
            challenge:'123456',
            authContent:'请用指纹解锁',
            success:res=>{
              console.log(res,'99')
            }
          })
          return
        }
        //没有录入指纹时跳转去录入指纹登陆

      }})
    }
  },
  checkFail(res){
    //无法调用指纹登陆时
    console.log(res,'10')
  },
  onReady: function () {
    wx.hideLoading();
  },
})
