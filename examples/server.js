import ProtocolServer from "../src/server/index"

///  Server ///
const protocolServer = new ProtocolServer("localhost", 9878 );


// 연결 되자 마자 보낼 할 작업.
protocolServer.onFirstConnect = (function(cli){
  cli.write("hello client");
})

protocolServer.createServer(function(cli){

  // 데이터를 받았을때 어떻게 할지..
  cli.on("data", (message)=>{
    console.log(`server received :: ${message}`)
    // const replyMsg = protocolServer.createMessage(
    //   new Field(Fields.TrCode, "REG"),
    //   new Field(Fields.OrderID, "12345667890"),
    //   // ...
    // );
    const replyMsg = "replying to client";

    protocolServer.send(replyMsg)

    // const msg = protocolServer.parse(replyMsg.encode());
    // console.log(msg.fields)

  });

});

