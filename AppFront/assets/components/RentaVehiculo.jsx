import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar el metodo para generar el bottom tabs
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";


const RentaVehiculo = ({ navigation }) => {
    const [errormessage, setErrorMessage] = useState('');
  
    const onSubmit = (data) => {
      const { username, rentNumber, plateNumber, rentDate } = data;
  
      // Verificar fecha
      const fecha = Date.parse(rentDate);
      const fechaLista = new Date(fecha);
      console.log(
        fechaLista.getDate() + '/' + fechaLista.getMonth() + '/' + fechaLista.getFullYear()
      );
  
      setErrorMessage('Vehículo rentado con éxito');
    };
  
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        rentNumber: '',
        username: '',
        plateNumber: '',
        rentDate: '',
      },
    });
  
    return (
      <View>
        <Text>Número de renta</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
          name="rentNumber"
          rules={{ required: true }}
        />
        {errors.rentNumber && <Text>Este campo es requerido</Text>}
  
        <Text>Nombre de usuario</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && <Text>Este campo es requerido</Text>}
  
        <Text>Número de placa</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
          name="plateNumber"
          rules={{ required: true }}
        />
        {errors.plateNumber && <Text>Este campo es requerido</Text>}
  
        <Text>Fecha de renta</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={value} onChangeText={onChange} />
          )}
          name="rentDate"
          rules={{ required: true }}
        />
        {errors.rentDate && <Text>Este campo es requerido</Text>}
  
        <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
  
        {errormessage !== '' && <Text>{errormessage}</Text>}
      </View>
    );
  };
  
  export default RentaVehiculo;
  