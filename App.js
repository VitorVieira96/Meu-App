import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import {FaCheckCircle, FaTrash, FaPen } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios


import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import Login from './src/login';

function App(){
  const [lista,setLista] = useState([]);
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [id,setId] = useState('');
  const [senha,setSenha] = useState('');

  useEffect(()=> {
    listarDados();
  },[])
 
  async function listarDados(){
    const res = await axios.get('http://localhost/apireact/listar.php');
    setLista(res.data);
  }

  return (

     <Text>Teste</Text>

  )
}

export default App;