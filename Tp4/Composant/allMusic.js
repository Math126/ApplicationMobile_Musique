import React from "react-native";
import MusicCard from "./MusicCard";
import GetInfoMusic from "./GetInfoMusic";
export default function AllMusic(){
    const songs = require.context('../Musique',true)
    const songprint = songs.keys()
    const songList = songs.keys().map(song=> songs(song)) 
    songList.map(d=>console.log(d))
    return(<>{songList.map(d=> MusicCard(d,songprint))}</>) 
}
