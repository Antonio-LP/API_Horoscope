import app from "./server.js";


app.listen(app.get("port"),()=>{
  console.log(`App listening on port ${app.get("port")}!`)
})