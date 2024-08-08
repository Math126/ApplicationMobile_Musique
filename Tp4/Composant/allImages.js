import React from "react-native";
import * as FileSystem from 'expo-file-system';
import img from "../Information/moreinfo"

export default async function AllImages(){
    const exampleImageUri = Image.resolveAssetSource(img).uri
    console.log(exampleImageUri)
}