import app from "./server.js";
// import { Asignar } from "./services/asignacion.js";


app.listen(app.get("port"),()=>{
  console.log(`App listening on port ${app.get("port")}!`)
  // Asignar();
})