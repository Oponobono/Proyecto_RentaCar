import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//componentes
import Home from './assets/components/Home';
import RegistroUsuario from './assets/components/RegistroUsuario';
import Login from './assets/components/Login';

const stack = createNativeStackNavigator();

export default function App() {

  const onIdentificaRol = (rol) => {
    setRegistro(rol);
  }

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='home'>

        <stack.Screen
          name="home"
          component={Home}
          options={{ title: "Renta Car" }}
        />

        <stack.Screen
          name="registroUsuario"
          component={RegistroUsuario}
          options={{ title: "Registro usuario" }}
        />

      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
