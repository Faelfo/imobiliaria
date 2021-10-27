import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//função para criar a navegação
import createAppbarStyle from './src/utils/createAppBar'

//uma animação para troca de páginas --> olhe na pasta styles
import animationTransitionPage from './src/styles/animation_transition_page'

import HomeScreen from './src/screens/HomeScreen'
import ListagemScreen from './src/screens/ListagemScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import PView from './src/screens/PView'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{transitionSpec: {open: animationTransitionPage, close: animationTransitionPage}}}>
          <Stack.Screen name="Home"     component={HomeScreen}     options={createAppbarStyle('Imobiliaria')} />
          <Stack.Screen name="Listagem" component={ListagemScreen} options={createAppbarStyle('Imobiliaria')} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={createAppbarStyle('Imobiliaria')} />
          <Stack.Screen name="PView"    component={PView}          options={createAppbarStyle('')} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}