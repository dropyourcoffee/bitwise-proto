import net from "net";
import {EventEmitter} from "events";


class Protocol extends EventEmitter{
  constructor(){
    super();

  }

  connect({
    host = "localhost",
    port = "9878",
          } = {}){

    this.host = host;
    this.port = port;
    this.srv = net.createConnection({host, port});
    this.srv.on("connect",()=>{
      // 연결시 전처리 프로세스는 여기.
      this.emit("open")
    })
    this.srv.on("data", (m)=>{
      // 데이터 preprocess may com here
      this.emit("message", m)
    })
  }

  send(msgToSend){
    // 연결된 상태라면
    if(this.srv){
      this.srv.write(msgToSend)
      console.log(`sent :: ${msgToSend}`)

    }else{
      console.error("not connected to server")
    }
  }



}

export default Protocol;

