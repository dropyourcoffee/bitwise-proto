# bitwise-proto

A JS library to build custom bitwise protocol with headers over TCP.

Usage
--------

```javascript
import Protocol from 'bitwise-proto';
const protocolClient = new Protocol();

protocolClient.connect({
  host: "localhost",
  port:9878,
});


protocolClient.on("open", (server)=>{
  console.log("client connected");

});


protocolClient.on("message", (m)=>{
  protocolClient.send("hi server");
});

```


