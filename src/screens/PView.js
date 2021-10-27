import React from 'react'
import Database from '../services/database'
import { View, Text, Image } from 'react-native'
import Anuncio from '../models/anuncio'


export default class PView extends React.Component{
    constructor(props){
        super(props)
        this.db = new Database()
        this.anuncioId = props.route.params.anuncioId
        this.state = {
            anuncio: new Anuncio(),
            carregando: true
        }

        if(!this.anuncioId){
            setTimeout(props.navigation.pop,0) //volta caso o id não seja carregado corretamente
            alert("Id não foi passado para View")
        } else {
            this.db.loadAnunciosById(this.anuncioId).then(res => {
                if(res){
                    this.setState({anuncio:res,carregando:false})
                } else {
                    setTimeout(props.navigation.pop,0) //volta caso o id não seja carregado corretamente
                    alert("Anuncio não carregado do banco")
                }
            })
        }
    }
    render(){
        return !this.state.carregando ?
            <View>
                <Image source={{uri:this.state.anuncio.image}} />
                <View>
                    <Text>{this.state.anuncio.final == 1? "Aluga-se": this.state.anuncio.final == 2? "Vende-se":"?"}</Text>
                </View>
                <View>
                    <Text>{this.state.anuncio.name}</Text>
                    <Text>{this.state.anuncio.price}</Text>
                    <Text>Endereço: {this.state.anuncio.address}</Text>
                </View>
            </View>
            : <Text>Carregando ... </Text>
    }
}