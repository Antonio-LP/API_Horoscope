import translate from "@iamtraction/google-translate";

async function Translated(searchQuery, idiom) {

  // console.log(searchQuery)
  const res = await translate(searchQuery, { from: "en", to: idiom });
  // console.log(res) 

  // Reemplazar %20 con espacio en blanco
  const formattedText = res.text.replace(/%20/g, ' ')
  // console.log(formattedText)
  // .replace(//g, '\n');

  const character = formattedText.split("---%0A")
  // console.log(character)
  return character;
}


export { Translated };
