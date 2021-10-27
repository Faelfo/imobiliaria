import React from 'react'
import { FlatList, Text, View } from 'react-native'

import AnuncioItem from '../components/AnuncioItem'
import DataBase from '../services/database'
import SimplePicker from '../components/SimplePicker'

export default class ListagemScreen extends React.Component {
    constructor(props) {
        super(props)
        this.db = new DataBase()
        this.types = [
            { label: 'Todos', value: -1 },
            { label: 'Casa', value: 1 },
            { label: 'Camércio', value: 2 },
            { label: 'Condominio', value: 3 },
        ]
        this.navigation = props.navigation
        this.state = {
            anuncios: [],
            carregando: true,
            filter: -1,
        }
        this.refresh()
    }

    refresh = () => {
        let filter = this.state.filter
        if (filter > 0) setTimeout(() => {
            this.setState({ anuncios: [], carregando: true })
            this.db.loadAnunciosWithTypeFilter(filter).then(anuncios => this.setState({ anuncios: anuncios, carregando: false }))
        }, 0)
        else setTimeout(() => {
            this.setState({ anuncios: [], carregando: true })
            this.db.loadAnuncios().then(anuncios => this.setState({ anuncios: anuncios, carregando: false }))
        }, 0)
    }
    renderItem = ({ item }) => <AnuncioItem anuncio={item} onPress={() => this.navigation.push('PView', { anuncioId: item.id })} />

    keyExtractor = (item) => item.id.toString()

    render() {
        return (
            <View>
                <View>
                    <Text>Filtrar por:</Text>
                    <SimplePicker values={this.types} onChange={(value) => this.setState({ filter: value }, () => this.refresh())} />
                </View>
                {this.state.carregando ? 
                    <Text>Carregando...</Text>: 
                        this.state.anuncios.length > 0 ? 
                    <FlatList 
                        data={this.state.anuncios}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false} />: 
                    <Text>Não há anúncios no momento :(</Text>
                }
            </View>
        )
    }
}