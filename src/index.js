import net from "net";
import {EventEmitter} from "events";
import Field from "./Field";

class Protocol extends EventEmitter{
  constructor(headerRule, bodyRule){
    super();

    this.headerRule = (typeof(headerRule) === "function" )? headerRule() : null;
    this.bodyRule = bodyRule();
    this.Fields = {};
    this.bodyRule.Fields.forEach(fieldRule=>{
      this.Fields[fieldRule.name] = fieldRule;
    })

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

  createMessage(...fields){
    let msg = ""
    if (this.headerRule !== null){
      let msg = {
        body:""
      };

      fields.forEach(f=>{
        msg.body += f.value();
      });

      let complete = Buffer.alloc(this.headerRule.totalLength + msg.body.length);
      complete.write(msg.body, this.headerRule.totalLength);


      this.headerRule.Fields.reduce((offset, rule)=>{
        complete.write(rule.get(msg), offset);
        return offset + rule.length
      },0)

      return complete;

    }else{

    }
    return msg

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

export {Field};

export default Protocol;

