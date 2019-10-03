import Protocol from "../src/index"

const protocolClient = new Protocol();

protocolClient.connect({
  host: "localhost",
  port:9000,
});


protocolClient.on("open", ()=>{
  console.log("client connected");
  // Connect 하고 client가 먼저 메세지를 보낸다면 여기..

});


protocolClient.on("message", (m)=>{
  console.log("on message :: "+m);
  protocolClient.send("hi server");
  // Connect 하고 server에게 먼저 메세지를 받는다면 여기..
})
