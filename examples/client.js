import Protocol, {Field} from "../src"

const headerRule = ()=>{
  const totalLength= 40;

  return {
    totalLength,

    Fields:[
      {
        name: "stx",
        offset:0,
        length:1,
        get: msg =>
          String.fromCharCode(Buffer.alloc(1, 0x02, 'base64')[0]) // STX

      },
      {
        name: "len",
        offset:1,
        length:4,
        get: msg =>
          ("000"+ (totalLength + msg.body.length) ).slice(-4)

      },
      {
        name: "connID",
        offset:5,
        length:6,
        get: msg =>
          "------" // 6 spaces
      },
      {
        name: "filler",
        offset:11,
        length:29,
        get: msg =>
          "                EOHeadercli ]" // 6 spaces

      },
    ]
  }

};

const bodyRule = ()=>{
  return {
    Fields:[
      {
        name: "TrCode",
        length: 11,
      },
      {
        name: "OrderID",
        length: 10,
      }
    ]
  }
};

const protocol = new Protocol(headerRule, bodyRule);

protocol.connect({
  host: "localhost",
  port:9000,
});


protocol.on("open", ()=>{
  console.log("client connected");
  // Connect 하고 client가 먼저 메세지를 보낸다면 여기..

});


protocol.on("message", (m)=>{
  console.log("on message :: "+m);

  let msg = protocol.createMessage(
    new Field(protocol.Fields.TrCode,  "__TR_CODE__"),
    new Field(protocol.Fields.OrderID, "-order_id-")
  );/*?*/

  protocol.send(msg);
  // Connect 하고 server에게 먼저 메세지를 받는다면 여기..
})
