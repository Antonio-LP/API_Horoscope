import { Router } from "express"
import { Asignar } from "../services/asignacion.js";
import fs from "fs" 
// import json from "../resources/api.json" assert { type: "json" };

const router = Router();

router.get('/', (req, res) => {
    Asignar();
    res.send("Horoscope Api")
})


router.get('/api/horoscope/:id', (req, res) => {

    const json = fs.readFileSync("src/resources/api.json","utf-8")
    const jsonData = JSON.parse(json)

    let horoscope = jsonData.Lenguages.find(c => c.Id === req.params.id)
   
    if (!horoscope) {
        horoscope = jsonData.Lenguages.find(c => c.Id === "en")
        return res.send(horoscope)
    }
    res.send(horoscope)
})

router.get('/api/horoscope-links', (req, res) => {

    const json = fs.readFileSync("src/resources/api.json","utf-8")
    const jsonData = JSON.parse(json)

    let horoscope = jsonData.Links
   
    res.send(horoscope)
})


export default router;