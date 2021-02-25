<template>
  <div class="ObsIntro">
    <h1>OBS介绍及使用教程</h1>
    <p>OBS是用于推送直播视频源到服务器的工具</p>
    <p>第一步：先拿到需要推流的地址码（即推流URL和流名称）</p>
    <p>第二步：下载OBS推流工具，下载完成OBS工具之后打开主界面，在obs软件中点击【设置】</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/5596100_1562207680.cn/txdocpic/0/fb66dd0f1428ea339f26d7d60a247d25/0"
        alt="">
    <p>
      第三步：在左侧功能栏中选择“流”。在流类型处选择“自定义流媒体服务器”。将刚刚在招满满管理台复制的URL和流名称分别粘贴到OBS软件URL和流名称对应的位置，或者是复制到对应的服务器和串流密钥两个地方（下图分别是win7和win10的配置信息，名称稍微有点区别）</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/50619000_1562207680.cn/txdocpic/0/f4b5aa5c87b987f5ad4ebb5cd6cc7bfd/0"
        alt="">
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/84098500_1562207680.cn/txdocpic/0/2f253b318596efb1598c6c96bb5dba92/0"
        alt="">
    <p>第四步：在obs软件中选择场景和来源</p>
    <h3>1、显示器捕获：会直播出电脑整个操作界面。</h3>
    <p>在场景处点击“+”添加一个场景后，在来源处点击“+”,在弹出的列表中选择“显示器捕获”。</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/8484200_1562207681.cn/txdocpic/0/11527dbf34d4f816d01a3052df2c728f/0"
        alt="">
    <p>在弹出的窗口输入名称后点击确定，</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/31944900_1562207681.cn/txdocpic/0/1e95ca1b8be0646376b1ac4a88eb655d/0"
        alt="">
    <p>在显示器捕获页面点击确定后即可添加成功。</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/52404100_1562207681.cn/txdocpic/0/54336027f689a28588fafa2c5dca6832/0"
        alt="">
    <h3>2、窗口捕获：只会只播出所选择的的软件。</h3>
    <p>在场景处点击“+”添加一个场景后，在来源处点击“+”,在弹出的列表中选择“窗口捕获”，</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/8484200_1562207681.cn/txdocpic/0/11527dbf34d4f816d01a3052df2c728f/0"
        alt="">
    <p>在弹出的窗口输入名称后点击确定，</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/4345200_1562207682.cn/txdocpic/0/61bcda0ee6e948e3dd9f7afc778007df/0"
        alt="">
    <p>在窗口捕获页面，在窗口处选择需要直播的软件，点击确定后即添加成功。</p>
    <img
        src="http://wechatapppro-1252524126.file.myqcloud.com/help_document/image/ueditor/35582400_1562207682.cn/txdocpic/0/a806edaa93be50302d59091c04541ee9/0"
        alt="">
  </div>
</template>

<script>
export default {
  name: "ObsIntro"
}
</script>

<style scoped>
.ObsIntro {
  text-align: left;
  width: 1000px;
  margin: 20px auto;
}
.ObsIntro img{
  width: 80%;
  height: 80%;
  margin: 30px auto;
}
</style>
