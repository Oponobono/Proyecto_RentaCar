import { Button, TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import useRegistroVehiculos from '../hooks/useRegistroVehiculos';
import { Button } from 'react-native-elements';

import { useForm, Controller } from "react-hook-form";
import React from "react";
import axios from 'axios';



export default function Login({ navigation }) {

    const { user, setUser } = useRegistroVehiculos();

    const [errormessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');


    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            usuario: '',
            contrasena: ''
        }
    });

    const onSubmit = data => console.log(data)


    const onSearch = async (data) => {


        try {
            const response = await axios.get(`192.168.1.11:3000/api/usuarios/${data.usuario}`); console.log(response.data)
            if (response.data.usuario === data.usuario && response.data.contrasena === data.contrasena) { // Encuentra el usuario 
                console.log("conectado")
                if (response.data.role === "1") {
                    //navigation.navigate(/*devolucion de vehiculos o lista de vehiculos*/)

                    console.log("User");
                    setUser(false);
                    reset();
                    navigation.navigate('vehiculoDisponible');
                }
                else if (response.data.role === "2") {
                    //navigation.navigate(/* renta de vehiculo*/)
                    console.log("Admin");
                    setUser(true);
                    reset();
                    navigation.navigate('vehiculoDisponible');
                }

                setErrorMessage(false);
                setMessage('');
            }
            else {
                setErrorMessage(true);
                setMessage("Usuario no encontrado",
                    console.log("Usuario no encontrado"));
                setTimeout(() => {
                    setMessage('');
                }, 2000)

            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
        finally {
            //setLoading(false); 
        }
    };


    return (
        <View style={styles.container} >
            <Text style={{ marginBottom: 10, fontSize: 25, fontWeight: 'bold' }}>Inicio de Sesión</Text>
            <Text style={{ color: 'red' }}>{setErrorMessage}</Text>
            <Text style={{ color: 'gray' }}>{setMessage} </Text>

            {/*usuario */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="account" />}

                    />
                )}
                name="usuario"
            />
            {errors.usuario?.type === 'required' && <Text>Este Campo es Obligatorio</Text>}
            {errors.usuario?.type === 'pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}

            {/*contrasena */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Contraseña"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="key" />}
                    />
                )}
                name="contrasena"
            />
            {errors.contrasena?.type === "required" && <Text>Este Campo es Obligatorio</Text>}
            {errors.contrasena?.type === "pattern" && <Text>El Password Debe contener  números y letras</Text>}



    <Button
        icon="door"
        mode="contained"
        title="Ingresar"
        onPress={handlePress}
        onPressOut={handleRelease}
        buttonStyle={[
          styles.button,
          { backgroundColor: isPressed ? '#999989' : '#B3AE4F' },
        ]}
        textStyle={styles.buttonText}
      />

      <Button
        title="Registrar"
        onPress={() => navigation.navigate('registroUsuario')}
        buttonStyle={[
          styles.button,
          { backgroundColor: isPressed ? '#999989' : '#66654B' },
        ]}
        textStyle={styles.buttonText}
      />

      <Button
        title="Recuperar Contraseña"
        onPress={() => navigation.navigate('ResetPassword')}
        buttonStyle={[
          styles.button,
          { backgroundColor: isPressed ? '#999989' : '#66654B' },
        ]}
        textStyle={styles.buttonText}
      />
 </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 10,
      width: 250,
      transitionProperty: 'background-color',
      transitionDuration: '0.3s',
    },
    buttonText: {
      color: 'white',
    },
  });

  
  
  
  

