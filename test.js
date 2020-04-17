var jwt = require('jsonwebtoken');
var token = jwt.sign({username:"abc"},"loi");
jwt.sign({username:"abc"},"loi",(err,token)=>{
    console.log(token);
})

jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlhdCI6MTU4NzA0MTE3Mn0.ihGZ2dARK6dsoMSMav0qGmfI8flVOqJ68MpIoNKhQl4","loi",(err,data)=>{
    console.log(data);
})
console.log(token);