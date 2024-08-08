
export default async function GetInfoMusic(name) {
    console.log("fetching: "+name)
    var response = await fetch("http://10.228.135.4:5000/music", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Nom: name
        }),
        })    
    var rep = await response.json();
    return rep
}




// .then((response) => response.json())
//     .then((responseData) => {
//         console.log(JSON.stringify(responseData));
//         lego = responseData
        
//     })