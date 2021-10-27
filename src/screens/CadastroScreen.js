import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Button } from 'react-native'
//tirei o input padrão e substitui pelo do elements porque estava dando erro
//precisa rodar primeiro npm install react-native-elements
import {Input} from 'react-native-elements'
//import styles from '../styles/all_styles'
import DatabaseClass from '../services/database'
import Anuncio from '../models/anuncio'
import SimplePicker from '../components/SimplePicker'
import ImagePicker from '../components/ImagePicker'

class CadastroScreen extends Component{
    constructor(props){
        super(props)
        this.db = new DatabaseClass()
        this.navigation = props.navigation
        this.types = [
            { label: 'Casa', value: 1, },
            { label: 'Comércio', value: 2, },
            { label: 'Condomínio', value: 3, },
        ]
        this.final = [
            { label: 'Alugar', value: 1, },
            { label: 'Vender', value: 2, },
        ]
        this.state = {
            anuncio_name: '',
            anuncio_price: 0.0,
            anuncio_address: '',
            anuncio_final: 1,
            anuncio_type: 1,
            anuncio_image: ''
        }
    }
    render(){
        return (
            <View>
                <ScrollView>
                    <Text>Cadastro de anúncio</Text>
                    {/* <Input placeholder="Nome"     onChangeText={(text) => this.setState({anuncio_name: text})} maxLength={20}/> */}
                    <Input containerStyle={{marginTop: 20}} onChangeText={text => this.setState({anuncio_name: text})} maxLength={20}/>
                    <Input type="text" placeholder="Endereço" onChangeText={text => this.setState({anuncio_address: text})} maxLength={60}/>
                    <Input placeholder="Preço"    onChangeText={text => this.setState({anuncio_price: text})} keyboardType='numeric' maxLength={12}/>
                    
                    <SimplePicker onChange={(value)=>this.setState({ anuncio_type: value })} values={this.types}/>
                    <SimplePicker onChange={(value)=>this.setState({ anuncio_final: value })} values={this.final}/>
                    
                    <View>
                        <ImagePicker title="Carregar foto" usePhotoFromLibrary={true} onTakePhoto={(uri)=>this.setState({anuncio_image: uri})}/>
                        <ImagePicker title="Tirar foto"    saveCameraImage={true}     onTakePhoto={(uri)=>this.setState({anuncio_image: uri})}/>
                    </View>

                    {this.state.anuncio_image ? 
                    <View>
                    {/* Acrescentei o estilo das dimensões da imagem, se não ela não aparece */}
                    <Image style={{marginVertical: 10, alignSelf: 'center', width: '100%', height: 250}} source={{uri: this.state.anuncio_image}}/>
                        
                    </View>
                    : 
                    <Text>Nenhuma imagem carregada!</Text> 
                    }
                    <Button title="Cadastrar" onPress={this.add_address}/>
                </ScrollView>
            </View>
        )
    }
    add_address = (()=>{
        let anuncio = new Anuncio({
            name: this.state.anuncio_name,
            image: this.state.anuncio_image,
            price: this.state.anuncio_price,
            address: this.state.anuncio_address,
            final: this.state.anuncio_final,
            type: this.state.anuncio_type,
        })
        if(!anuncio.isValidWithOutId()){
            alert('Por favor preencha todos os campos!')
            return
        }
        this.db.addNewAnuncio(anuncio).then(result => {
            if(result){
                this.navigation.pop()
                this.sendAnuncioNotification(anuncio)
            }else alert("Erro ao cadastrar anúncio!"+anuncio.name)
        })
    }).bind(this)

}
export default CadastroScreen;
