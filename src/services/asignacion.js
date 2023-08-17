import { Translated } from "../services/translated.js";
// import jsonData from "../resources/api.json" assert { type: "json" };
import { setURL } from "./youtube-music.js";
import axios from "axios";
import fs from "fs";

let jsonData = {};
const list_lenguages =
    [
        "es", // Español
        // "zh", // Chino
        "hi", // Hindi
        "ar", // Árabe 
        "pt", // Portugués
        "bn", // Bengalí
        "ru", // Ruso
        "ja", // Japonés
        "pa", // Punjabi
        "de", // Alemán
        // "jv", // Javanés
        "ms", // Malayo
        "ko", // Coreano
        "fr", // Francés
        "te", // Telugu
        "vi", // Vietnamita
        "ta", // Tamil
        "it", // Italiano
        "tr", // Turco
    ];

let dateA;
let dateB;

function AsignarRandomYoutubeLinks() {
    jsonData.Links.Aries = setURL();
    jsonData.Links.Leo = setURL();
    jsonData.Links.Aquarius = setURL();
    jsonData.Links.Sagittarius = setURL();

    jsonData.Links.Cancer = setURL();
    jsonData.Links.Capricorn = setURL();
    jsonData.Links.Libra = setURL();
    jsonData.Links.Taurus = setURL();

    jsonData.Links.Scorpio = setURL();
    jsonData.Links.Pisces = setURL();
    jsonData.Links.Gemini = setURL();
    jsonData.Links.Virgo = setURL();
}

async function TraducirIdiomas() {

    jsonData.Date = dateB
    const engLanguage = jsonData.Lenguages.find(language => language.Id === "en");
    const valuesArray = Object.entries(engLanguage);

    const textBase = [];
    const textsAPIs = [];
    Object.values(valuesArray).forEach(([key, value]) => {
        if (key != "Id" && key != "Horosoc")
            textBase.push(value)
        if (key == "Horosoc") {
            Object.values(value)
                .map((val) => Object.values(val)
                    .map((subval) => textsAPIs.push(subval))
                )
        }
    })

    const textBaseTotrans = textBase.join('---%0A');
    const textAPIsToTrans = textsAPIs.join('---%0A')

    for (const idiom of list_lenguages) {
        const filtre = await Translated(textBaseTotrans, idiom);
        const hosrosTrasn = await Translated(textAPIsToTrans, idiom);
        // console.log(hosrosTrasn)
        // return
        const b = {
            "Id": idiom,
            "Signs": [
                filtre.at(0)
            ],
            "WelcomeSplash": filtre.at(1),
            "PhraseSplash": filtre.at(2),
            "MenuTitle": filtre.at(3),
            "MenuCaution": filtre.at(4),
            "LabelYoutube": filtre.at(5),
            "button1": filtre.at(6),
            "button2": filtre.at(7),
            "button3": filtre.at(8),
            "Horosoc": {}
        }
        const d = {};
        const signsString = jsonData.Lenguages[0].Signs[0];
        const signArray = signsString.split(',');

        for (let i = 0; i < signArray.length; i++) {
            const element = {
                PhraseSplashSelectSing: hosrosTrasn.at(i*3),
                BoredApi: hosrosTrasn.at(i*3 + 1),
                HorosocApi: hosrosTrasn.at(i*3 + 2),
            };
            
            d[signArray[i].trim()] = element;
        }

        b.Horosoc = d;
        jsonData.Lenguages = jsonData.Lenguages.filter(language => language.Id !== idiom);

        jsonData.Lenguages.push(b);
        console.log(idiom)
    };

    // console.log("f")
    const json_horoscope = JSON.stringify(jsonData);
    fs.writeFileSync("src/resources/api.json", json_horoscope, "utf-8");
}

async function AsignarAPIs() {
    try {
        const cor = jsonData.Lenguages.find(language => language.Id === "en").Horosoc;

        const promises = Object.entries(cor).map(([sign, val]) => {
            let horoscopeApiUrl = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=" + sign + "&day=today";
            let boredApiUrl = "https://www.boredapi.com/api/activity/";

            const horoscopePromise = axios.get(horoscopeApiUrl)
                .then(response => {
                    const horoscopeData = response.data.data.horoscope_data;
                    val.HorosocApi = horoscopeData;
                })
                .catch(error => {
                    horoscopeApiUrl = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=" + sign + "&day=tomorrow";
                    return axios.get(horoscopeApiUrl)
                        .then(response => {
                            const horoscopeData = response.data.data.horoscope_data;
                            val.HorosocApi = horoscopeData;
                        });
                });

            const boredPromise = axios.get(boredApiUrl)
                .then(response => {
                    const boredActivity = response.data.activity;
                    val.BoredApi = boredActivity;
                });

            return Promise.all([horoscopePromise, boredPromise]);
        });
        await Promise.all(promises);

        AsignarRandomYoutubeLinks();
        jsonData.Lenguages = jsonData.Lenguages.filter(language => language.Id === "en");
        const json_horoscope = JSON.stringify(jsonData);
        fs.writeFileSync("src/resources/api.json", json_horoscope, "utf-8");
        console.log("APIS Asignadas")
    } catch (error) {
        console.error("Error:", error);
    }
}

function Asignar() {
    const json = fs.readFileSync("src/resources/api.json", "utf-8")
    jsonData = JSON.parse(json)
    dateA = jsonData.Date;
    dateB = new Date().toLocaleDateString()

    console.log(`Fechas Json 4 ${dateA} | Server ${dateB}`)

    if (dateA != dateB) {
        AsignarAPIs().then(() => {
            TraducirIdiomas()
        })
    }
}

export { Asignar }