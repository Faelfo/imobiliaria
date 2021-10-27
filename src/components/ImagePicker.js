import React from 'react'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'


export default function IP(
    {title={},
    buttonStyle={},
    contentStyle={},
    usePhotoFromLibrary=false,
    saveCameraImage=false,
    onTakePhoto=(_uri)=>{},
    onCalcelTakePhoto=()=>{}}
)    {

    const obterPermissao = () => {
        ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.requestMediaLibraryPermissionsAsync()
    }

    const obterImagem = async ()=>{
        let result
        if(usePhotoFromLibrary) result = await ImagePicker.launchImageLibraryAsync()
        else result = await ImagePicker.launchCameraAsync()
        if(result){
            if(!result.cancelled){
                let uri = result.uri
                if(saveCameraImage && !usePhotoFromLibrary) uri = (await MediaLibrary.createAssetAsync(uri)).uri 
                if(onTakePhoto) onTakePhoto(uri)
                else if(onCancelTakePhoto) onCancelTakePhoto()
            }
        }
    }

    React.useEffect(()=>{
        obterPermissao()
    }, [])

    return <Button title={title} onPress={obterImagem}/>

}
