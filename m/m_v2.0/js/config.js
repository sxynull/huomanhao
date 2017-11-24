
'use strict';

app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'tabsCtrl':"js/controllers/tabsCtrl.js",             //选项卡
        'homeCtrl':"js/controllers/homeCtrl.js",            //主页
        'olduserWelfareCtrl':"js/controllers/olduserWelfareCtrl.js",            //主页
        'newpeopleWelfareCtrl':"js/controllers/newpeopleWelfareCtrl.js",            //主页
        'detailsCtrl':"js/controllers/detailsCtrl.js",       //详情页
        'searchCtrl':"js/controllers/search.js",           //搜索
        'highListCtrl':"js/controllers/highListCtrl.js",       //高价值列表
        'todayListCtrl':"js/controllers/todayListCtrl.js",       //每日列表
        'goodListCtrl':"js/controllers/goodListCtrl.js",          //好货精选列表
        'newListCtrl':"js/controllers/newListCtrl.js",             //新人专享列表
        'coinListCtrl':"js/controllers/coinListCtrl.js",             //金币必中列表
        'coinSecondsKillCtrl':"js/controllers/coinSecondsKillCtrl.js",             //金币秒杀列表
        'coinSecondsKillSuccessCtrl':"js/controllers/coinSecondsKillSuccessCtrl.js",             //金币秒杀成功
        'coinSecondsKillDefeatedCtrl':"js/controllers/coinSecondsKillDefeatedCtrl.js",             //金币秒杀成功
        'spokesmanPageCtrl':"js/controllers/spokesmanPageCtrl.js",     //代言人明细
        'spokesmanDetailCtrl':"js/controllers/spokesmanDetailCtrl.js",     //代言人明细
        'spokesmanWhatCtrl':"js/controllers/spokesmanWhatCtrl.js",     //代言人介绍
        'personalCenterCtrl':"js/controllers/personalCenterCtrl.js",     //个人资料
        'gradeRankCtrl':"js/controllers/gradeRankCtrl.js",     //个人资料
        'personalDateCtrl':"js/controllers/personalDateCtrl.js",     //个人资料
        'winningValueCtrl':"js/controllers/winningValueCtrl.js",     //个人资料
        'applyIndexCtrl':"js/controllers/applyIndexCtrl.js",     //申请活动主页
        'applyCollectCtrl':"js/controllers/applyCollectCtrl.js",     //申请双收藏
        'applyCommandCtrl':"js/controllers/applyCommandCtrl.js",     //申请淘口令
        'applyPcCtrl':"js/controllers/applyPcCtrl.js",     //申请关键词
        'applyQrcodeCtrl':"js/controllers/applyQrcodeCtrl.js",     //申请二维码
        'applyCompareCtrl':"js/controllers/applyCompareCtrl.js",     //货比三家
        'applySameshopCtrl':"js/controllers/applySameshopCtrl.js",     //浏览同店
        'applyRelevanceCtrl':"js/controllers/applyRelevanceCtrl.js",     //关联购买
        'applyPayCtrl':"js/controllers/applyPayCtrl.js",     //提交支付
        'applyWangwangchatCtrl':"js/controllers/applyWangwangchatCtrl.js",     //旺旺聊天
        'applyShoutaoCtrl':"js/controllers/applyShoutaoCtrl.js",     //手淘问大家
        'applyTomorrowCtrl':"js/controllers/applyTomorrowCtrl.js",     //等待明日开奖
        'applynowinCtrl':"js/controllers/applynowinCtrl.js",     //暂未中奖
        'applyovertimeCtrl':"js/controllers/applyovertimeCtrl.js",     //暂未中奖
        'applyalreadyfullCtrl':"js/controllers/applyalreadyfullCtrl.js",     //暂未中奖
        'applyFinishCtrl':"js/controllers/applyFinishCtrl.js",     //完成领取
        'applyEvaluationfinishCtrl':"js/controllers/applyEvaluationfinishCtrl.js",     //完成评价
        'applyCompleteCtrl':"js/controllers/applyCompleteCtrl.js",     //等待开奖
        'addvalueservicesShareCtrl':"js/controllers/addvalueservicesShareCtrl.js",     //分享朋友圈
        'addvalueservicesShowpicCtrl':"js/controllers/addvalueservicesShowpicCtrl.js",     //晒图好评
        'addvalueservicesShowtextCtrl':"js/controllers/addvalueservicesShowtextCtrl.js",     //文字好评
        'addvalueservicesGoodopinionCtrl':"js/controllers/addvalueservicesGoodopinionCtrl.js",     //好评置顶
        'addvalueservicesAddshowtextCtrl':"js/controllers/addvalueservicesAddshowtextCtrl.js",     //文字好评追评
        'addvalueservicesAddshowpicCtrl':"js/controllers/addvalueservicesAddshowpicCtrl.js",     //晒图好评追评
        'addvalueservicesAddgoodopinionCtrl':"js/controllers/addvalueservicesAddgoodopinionCtrl.js",     //好评置顶追评

        'fundallCtrl':"js/controllers/fundallCtrl.js",     //资金明细
        'integralListCtrl':"js/controllers/integralListCtrl.js",     //积分明细
        'taobaoaccountBindCtrl':"js/controllers/taobaoaccountBindCtrl.js",     //淘宝绑定
        'useVipDredgeCtrl':"js/controllers/useVipDredgeCtrl.js",     //vip充值
        'withdrawBindCtrl':"js/controllers/withdrawBindCtrl.js",     //绑定提现账户
        'withdrawBindsubmitCtrl':"js/controllers/withdrawBindsubmitCtrl.js",     //提交提现绑定
        'withdrawDepositCtrl':"js/controllers/withdrawDepositCtrl.js",     //提现
        'withdrawIntoaccountCtrl':"js/controllers/withdrawIntoaccountCtrl.js",     //即时到账
        'helpcenterIndexCtrl':"js/controllers/helpcenterIndexCtrl.js",     //帮助中心
        'helpcenterDetailCtrl':"js/controllers/helpcenterDetailCtrl.js",     //帮助中心
        'feedBackCtrl':"js/controllers/feedBackCtrl.js",     //帮助中心
        'goldDepositsCtrl':"js/controllers/goldDepositsCtrl.js",     //资金明细
        'goidIndexCtrl':"js/controllers/goidIndexCtrl.js",     //资金明细首页
        'newNoticeCtrl':"js/controllers/newNoticeCtrl.js",     //消息通知
        'loginCtrl':"js/controllers/loginCtrl.js",     //登录
        'loginregisterCtrl':"js/controllers/loginregisterCtrl.js",     //注册
        'loginbindCtrl':"js/controllers/loginbindCtrl.js",     //绑定手机号
        'taobaoaccountSuccessCtrl':"js/controllers/taobaoaccountSuccessCtrl.js",     //绑定淘宝账号成功
        'searchResultsCtrl':"js/controllers/searchResultsCtrl.js",     //绑定淘宝账号成功
        //*** Services
        'ChatsService':"js/services/ChatsService.js",
         'Signature':"js/services/signature.js"
        //***  工具类
        //*** 主件
    },
    ViewArgs: {
      ChatsArgs: ['ChatsCtrl','ChatsService'],
      ChatDetailCtrlArgs: ['ChatDetailCtrl','ChatsService'],
      homeCtrl:['homeCtrl','Signature'],
      olduserWelfareCtrl:['olduserWelfareCtrl','Signature'],
      newpeopleWelfareCtrl:['newpeopleWelfareCtrl','Signature'],
      applyIndexCtrl:['applyIndexCtrl','Signature'],
        loginCtrl:['loginCtrl','Signature'],
        fundallCtrl:['fundallCtrl','Signature'],
      applyCollectCtrl:['applyCollectCtrl','Signature'],
      applyCommandCtrl:['applyCommandCtrl','Signature'],
      applyPcCtrl:['applyPcCtrl','Signature'],
      applyQrcodeCtrl:['applyQrcodeCtrl','Signature'],
      applySameshopCtrl:['applySameshopCtrl','Signature'],
      applynowinCtrl:['applynowinCtrl','Signature'],
      applyovertimeCtrl:['applyovertimeCtrl','Signature'],
      applyalreadyfullCtrl:['applyalreadyfullCtrl','Signature'],
      applyCompareCtrl:['applyCompareCtrl','Signature'],
      applyWangwangchatCtrl:['applyWangwangchatCtrl','Signature'],
      applyShoutaoCtrl:['applyShoutaoCtrl','Signature'],
      applyRelevanceCtrl:['applyRelevanceCtrl','Signature'],
      applyPayCtrl:['applyPayCtrl','Signature'],
      applyTomorrowCtrl:['applyTomorrowCtrl','Signature'],
      applyCompleteCtrl:['applyCompleteCtrl','Signature'],
      withdrawBindCtrl:['withdrawBindCtrl','Signature'],
      withdrawBindsubmitCtrl:['withdrawBindsubmitCtrl','Signature'],
      withdrawDepositCtrl:['withdrawDepositCtrl','Signature'],
      goidIndexCtrl:['goidIndexCtrl','Signature'],
      goldDepositsCtrl:['goldDepositsCtrl','Signature'],
      useVipDredgeCtrl:['useVipDredgeCtrl','Signature'],
      withdrawIntoaccountCtrl:['withdrawIntoaccountCtrl','Signature'],
      integralListCtrl:['integralListCtrl','Signature'],
      personalCenterCtrl:['personalCenterCtrl','Signature'],
      winningValueCtrl:['winningValueCtrl','Signature'],
      personalDateCtrl:['personalDateCtrl','Signature'],
      gradeRankCtrl:['gradeRankCtrl','Signature'],
      taobaoaccountSuccessCtrl:['taobaoaccountSuccessCtrl','Signature'],
      addvalueservicesShowtextCtrl:['addvalueservicesShowtextCtrl','Signature'],
      addvalueservicesShowpicCtrl:['addvalueservicesShowpicCtrl','Signature'],
      addvalueservicesShareCtrl:['addvalueservicesShareCtrl','Signature'],
      addvalueservicesGoodopinionCtrl:['addvalueservicesGoodopinionCtrl','Signature'],
      addvalueservicesAddshowtextCtrl:['addvalueservicesAddshowtextCtrl','Signature'],
      addvalueservicesAddshowpicCtrl:['addvalueservicesAddshowpicCtrl','Signature'],
      addvalueservicesAddgoodopinionCtrl:['addvalueservicesAddgoodopinionCtrl','Signature'],
      loginbindCtrl:['loginbindCtrl','Signature'],
      loginregisterCtrl:['loginregisterCtrl','Signature'],
      /*high_listArgs:['highListCtrl','sortList']*/
      highListCtrl:['highListCtrl','Signature'],
      goodListCtrl:['goodListCtrl','Signature'],
      newListCtrl:['newListCtrl','Signature'],
      coinListCtrl:['coinListCtrl','Signature'],
      coinSecondsKillCtrl:['coinSecondsKillCtrl','Signature'],
      coinSecondsKillSuccessCtrl:['coinSecondsKillSuccessCtrl','Signature'],
      todayListCtrl:['todayListCtrl','Signature'],
      spokesmanPageCtrl:['spokesmanPageCtrl','Signature'],
      spokesmanDetailCtrl:['spokesmanDetailCtrl','Signature'],
      detailsCtrl:['detailsCtrl','Signature'],
      tabsCtrl:['tabsCtrl','Signature'],
      feedBackCtrl:['feedBackCtrl','Signature'],
      taobaoaccountBindCtrl:['taobaoaccountBindCtrl','Signature'],
      newNoticeCtrl:['newNoticeCtrl','Signature'],
      searchResultsCtrl:['searchResultsCtrl','Signature']
    }
});

