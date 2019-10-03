const net = require("net");
// import net from "net";
import {EventEmitter} from "events";

// Server Impl
class ProtocolServer extends EventEmitter{
  constructor(host, port){
    super();
    this.host = host;
    this.port = port;
    this.sessions = [];

  }

  createServer(cb){
    this.srv = net.createServer(cli=>{
      this.sessions.push(cli);
      cb(cli);
    });

    // 처음 접속 되었을때 trigger할 함수 :: onFirstConnect
    if (this.onFirstConnect)
      this.srv.addListener("connection", this.onFirstConnect);
    // if (this.onFirstConnect)
    //   this.srv.addListener("connection", function(cli){
    //     console.log("welcoms")
    //     cli.write("welcome");
    //   })

    this.srv.listen(this.port, ()=>{
      console.log(`listening on ${this.port}`)
    })

  }

  send(msgToSend){
    this.srv.getConnections((err, cnt)=>{
      if(cnt > 0){
        this.sessions.forEach((cli, ind)=>{
          console.log(`Server.sessions[${ind}].send(${msgToSend})`);
          setTimeout(()=>{
            cli.write(msgToSend);
          },2000);
        })
        console.log("------------------")
      }
    })

  }
}

export default ProtocolServer;
