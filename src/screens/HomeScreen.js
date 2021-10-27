import React from 'react'
import { View, Text, Button } from 'react-native'
//faltou importar o database
import DataBase from '../services/database'


export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        //faltou essas duas linhas abaixo
        this.db = new DataBase
        this.navigation = props.navigation
        
    }
    render(){
        return(
            <View>
                <Text>Bem Vindo Operador!</Text>
                <Button
                    title='Listagem'
                    onPress={() => {this.navigation.push('Listagem',{})}}
                />
                <Button
                    title='Cadastro'
                    onPress={() => {this.navigation.push('Cadastro',{})}}
                />
            </View>
        )
    }
}