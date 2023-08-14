import { Translated } from "../services/translated.js";
// import jsonData from "../resources/api.json" assert { type: "json" };
import { setURL } from "./youtube-music.js";
import axios from "axios";
import fs from "fs"; 

let jsonData = {};
const list_lenguages =
[ 
    "es", // Español
    "zh", // Chino
    "hi", // Hindi
    "ar", // Árabe 
    "pt", // Portugués
    "bn", // Bengalí
    "ru", // Ruso
    "ja", // Japonés
    "pa", // Punjabi
    "de", // Alemán
    "jv", // Javanés
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

function AsignarRandomYoutubeLinks(){
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
            Object.values(value).map((val, i) =>

                Object.values(val).map((subval) => {
                    if (i < 4)
                        textBase.push(subval)
                    else
                        textsAPIs.push(subval)
                }
                )
            )
        }
    })

    const textTotrans = textBase.join('.\n');
    const textAPIsToTrans = textsAPIs.join('.\n')

    for (const idiom of list_lenguages) {
        const filtre = await Translated(encodeURI(textTotrans), idiom);

        const hosrosTrasn = await Translated(encodeURI(textAPIsToTrans), idiom);

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

        const d = {
            "Aries": {
                "PhraseSplashSelectSing": filtre.at(9),
                "BoredApi": filtre.at(10),
                "HorosocApi": filtre.at(11)
            },
            "Leo": {
                "PhraseSplashSelectSing": filtre.at(12),
                "BoredApi": filtre.at(13),
                "HorosocApi": filtre.at(14)
            },
            "Aquarius": {
                "PhraseSplashSelectSing": filtre.at(15),
                "BoredApi": filtre.at(16),
                "HorosocApi": filtre.at(17)
            },
            "Cancer": {
                "PhraseSplashSelectSing": filtre.at(18),
                "BoredApi": filtre.at(19),
                "HorosocApi": filtre.at(20)
            },
            "Gemini": {
                "PhraseSplashSelectSing": hosrosTrasn.at(0),
                "BoredApi": hosrosTrasn.at(1),
                "HorosocApi": hosrosTrasn.at(2)
            },
            "Taurus": {
                "PhraseSplashSelectSing": hosrosTrasn.at(3),
                "BoredApi": hosrosTrasn.at(4),
                "HorosocApi": hosrosTrasn.at(5)
            },
            "Capricorn": {
                "PhraseSplashSelectSing": hosrosTrasn.at(6),
                "BoredApi": hosrosTrasn.at(7),
                "HorosocApi": hosrosTrasn.at(8)
            },
            "Libra": {
                "PhraseSplashSelectSing": hosrosTrasn.at(9),
                "BoredApi": hosrosTrasn.at(10),
                "HorosocApi": hosrosTrasn.at(11)
            },
            "Virgo": {
                "PhraseSplashSelectSing": hosrosTrasn.at(12),
                "BoredApi": hosrosTrasn.at(13),
                "HorosocApi": hosrosTrasn.at(14)
            },
            "Pisces": {
                "PhraseSplashSelectSing": hosrosTrasn.at(15),
                "BoredApi": hosrosTrasn.at(16),
                "HorosocApi": hosrosTrasn.at(17)
            },
            "Sagittarius": {
                "PhraseSplashSelectSing": hosrosTrasn.at(18),
                "BoredApi": hosrosTrasn.at(19),
                "HorosocApi": hosrosTrasn.at(20)
            },
            "Scorpio": {
                "PhraseSplashSelectSing": hosrosTrasn.at(21),
                "BoredApi": hosrosTrasn.at(22),
                "HorosocApi": hosrosTrasn.at(23)
            }

        }

        b.Horosoc = d; 
        jsonData.Lenguages = jsonData.Lenguages.filter(language => language.Id !== idiom);

        jsonData.Lenguages.push(b); 
        // console.log(idiom) 
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

        const json_horoscope = JSON.stringify(jsonData);
        fs.writeFileSync("src/resources/api.json", json_horoscope, "utf-8");
    } catch (error) {
        console.error("Error:", error);
    }
}

function Asignar() {  
    const json = fs.readFileSync("src/resources/api.json","utf-8")
    jsonData = JSON.parse(json)

    dateA =  jsonData.Date; 
    dateB = new Date().toLocaleDateString() 

    if (dateA != dateB) {
    
        AsignarAPIs().then( 
            TraducirIdiomas(),
        )
    }
}
export { Asignar }