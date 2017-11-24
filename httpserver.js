/**
 * Created by hxsd on 2016/6/21.
 */
var http=require("http");
var express=require("express");
var socketIo=require("socket.io");
var port=8080;
var app=express();
var httpServer=http.createServer(app);
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});

httpServer.listen(port,function(){
    console.log("服务器端口运行在"+port)
});
var count = 0;

app.use("/m",express.static("m"));
app.get("/doname",function(request,response){
    var name=request.query.nickname;
    console.log(name);
    var usedName=["毛泽东","周恩来","拉登"];
    var message={result:false};
    if(usedName.indexOf(name)==-1){
        message.result=true
    }
    response.send(message)

});

var socketIoServer=socketIo.listen(httpServer);
socketIoServer.on("connection",function(socket){

    socket.emit("hi","欢迎进入梦的世界");
    socket.on("message",function(data){
        console.log(data.sex);
        switch (data.type){
            case "usesex":
                socketSex(data,socket);
                break;
            case "use_login":
                socketLogin(data,socket);
                break
            case "new":
                socketNew(data,socket);
                break

        }

    });
    socket.on("disconnect",function(){
        handleUserLeave(socket);

    });
});
function socketNew(data,socket){
    var message = {
        type:"userMessage",
        nickname:socket.usename,
        content:data.new
    };
    socket.broadcast.send(message);
    message.type="myMessage";
    socket.send(message);

}
function socketSex(data,socket){


    var message={
        type:"myUse_sex",
        useSex:data.sex
    }
}
function socketLogin(data,socket){
    count++;
    console.log(count)
    socket.emit('usernum',{number:count})
     socket.nickname=data.usemz;
    console.log(data.sex)
    console.log(data.usemz);
    var message={
        type:"use_new",
        usename:data.usemz,
        usetb:data.useTb,
        sex:data.sex,
        rs:data.users
    };
    socket.broadcast.send(message);
    // 将消息发送回给自己
    message.type="my_entered";
    socket.send(message);
}
function handleUserLeave(socket){
    count--;
    socket.broadcast.emit('usernum',{number:count});

    console.log(socket.usename)
    var message = {
        type:"user_leave",
        nickname:socket.nickname
    };
    socket.broadcast.send(message);
}
