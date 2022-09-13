import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import {FaCheckCircle, FaTrash, FaPen } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios

import { ListGroupItemHeading } from 'reactstrap';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';


function usuarios(){

  function mensagemDelete(id){
    
    Alert.alert(
      "Excluir Registro",
      "Deseja Excluir este Registro?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => deleteItem(id) }
      ],
      { cancelable: true }
    );

    

  }

  
  const mensagemDuplicidade = () =>
    Alert.alert(
      "Erro ao Salvar",
      "Email Já Cadastrado",
      [
        
        { text: "OK", onPress: () => setAbrir(true) }
      ],
      { cancelable: true }
    ); 

  //const api = 'http://192.168.15.8/apireact/';
  const api = 'http://192.168.0.14/apireact/';
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [id, setId] = useState('');
  const [buscar, setBuscar] = useState('');

  const[abrir, setAbrir] = useState(false);

  useEffect(()=> {
    listarDados();
  },[])


  
  
  async function listarDados(){
    const res = await axios.get(api + 'listar.php?busca=' + buscar);
    setLista(res.data.result);
    //console.log(res.data.result);
    
  }

  function buscarDados(){
    listarDados();
  }

  async function add(){
    const obj = {nome, email, senha, id};
    
    if(id > 0){
     const res = await axios.post(api + 'editar.php', obj);
      if(res.data.success === true){
        //mensagemSalvar;
        limparCampos();
      }
    }else{
     const res = await axios.post(api + 'add.php', obj);
     
      if(res.data.success === true){
        //mensagemSalvar();
        limparCampos();
        
      }

      if(res.data.success === 'Email já Cadastrado!'){
        mensagemDuplicidade();
        
      }

      
    }
    
    listarDados();
    setAbrir(false);
   
  }


  async function getItem(id){
    const res = await axios.get(api + 'buscarId.php?id=' + id);
    setId(res.data.id);
    setNome(res.data.nome);
    setEmail(res.data.email);
    setSenha(res.data.senha);
    setAbrir(true);
    
    
  }


  async function deleteItem(id){
    const res = await axios.get(api + 'excluir.php?id=' + id);
    listarDados();
  }

  function limparCampos(){
        setNome('');
        setEmail('');
        setSenha('');
        setId('0');
  }


  return (
    <View>
    <View style={estilos.navbar}>
      
    <Text style={estilos.textonavbar}>Lista de Usuários</Text>  
    
    

    <TouchableOpacity
      
      style={estilos.botao}
      onPress={ () => setAbrir(true)}
      >
        <Ionicons name="ios-add" size={30} color="#FFF"></Ionicons>
        
      </TouchableOpacity>

    </View>

    <View style={estilos.ViewinputBuscar}>
    <TextInput 
      style={estilos.inputBuscar}
      placeholder="Buscar pelo Nome"
      value={buscar}
      onChangeText={ (buscar) => setBuscar(buscar)}
      onChange={buscarDados()}
      />
     <Ionicons style={estilos.iconeBuscar} name="ios-search" size={25} color="#4b4a49"></Ionicons>
    </View>
  
    <ScrollView>
    <View style={estilos.grid}>
    
      {lista.map(item => (
        <View style={estilos.griditem} key={item.id}><Text style={{color: '#585858'}}>{item.id} - {item.nome}</Text>

        <TouchableOpacity style={estilos.gridbotaoEditar}
             onPress={() => getItem(item.id)} >
               <Ionicons name="ios-create" size={30} color="#50b9e1"></Ionicons>
        </TouchableOpacity> 
        
        <TouchableOpacity style={estilos.gridbotaoExcluir}
            onPress={() => mensagemDelete(item.id)} >
              <Ionicons name="ios-trash" size={30} color="#e15f50"></Ionicons>
        </TouchableOpacity> 
       
                       
                    
        </View>
        
      ))}
     
   
    </View>
    </ScrollView>


     <Modal
      animationType="slide"
      transparent={false}
      visible={abrir}
      >
        <SafeAreaView style={estilos.modal}>

          

          <View style={estilos.modalHeader}>
          <TouchableOpacity
          onPress={ () => setAbrir(false)}
          >
          <Ionicons style={{marginLeft:5, marginRight:5}} name="md-arrow-back" size={35} color="#FFF"></Ionicons>
          </TouchableOpacity>
        <Text style={estilos.textoModal}>Inserir Usuário</Text>
        </View>

        <Animatable.View  
          animation="bounceInUp"
        useNativeDriver  >


        <TextInput 
        type="text"
      style={estilos.input}
      placeholder="Insira um Nome"
      value={nome}
      onChangeText={ (nome) => setNome(nome)}
      />

      <TextInput 
      style={estilos.input}
      placeholder="Insira seu Email"
      value={email}
      onChangeText={ (email) => setEmail(email)}
      />

<TextInput 
      style={estilos.input}
      placeholder="Insira sua Senha"
      value={senha}
      onChangeText={ (senha) => setSenha(senha)}
      />

      
      <TouchableOpacity  
      style={estilos.botaoModal}
      onPress={add}
      >
        <Text  style={estilos.textoBotaoModal}>Salvar</Text>
      </TouchableOpacity>
       

        </Animatable.View>

        </SafeAreaView>
 
      </Modal>


     </View> 
    );

}

export default App;




const estilos = StyleSheet.create({
  modal:{
    flex: 1,
    backgroundColor:'#b2b2b2'
    
  },

  textoModal:{
    
    color: '#FFF',
    
    marginLeft: 15,
    fontSize:25,
    
    
  },

  modalHeader:{
    
   marginLeft:10,
   marginTop:20,
   alignItems:'center',
   flexDirection:'row',
   marginBottom:30,
    
  },


  input:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize:13
  },
  botaoModal:{
    backgroundColor: '#00335c',
    borderRadius: 5,
    margin: 5,
    padding: 12,
    color: '#FFF',
    alignItems:'center',
    justifyContent:'center',
    
  },
  textoBotaoModal:{
    fontSize:16,
    color:'#FFF',

  },

  navbar:{
    backgroundColor: '#00335c',
    padding: 12,
    color: '#FFF',
    flexDirection:'row',
    marginTop: 35,

  },

  textonavbar:{
    fontSize:20,
    color:'#FFF',
    marginTop: 4,
    marginBottom: 2,
  },

  botao:{
    position: 'absolute', 
    right: 13,
    marginTop: 11,
  },


  grid:{
    marginTop: 8,
    
  },

  griditem:{
    padding: 11,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  gridbotaoEditar:{
    position: 'absolute',
    right:40,
    color:'#5c7ef6',
  },

  gridbotaoExcluir:{
    position: 'absolute',
    right:15,
    color:'#cc1414',
  },

  inputBuscar:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 8,
    padding: 8,
    color: '#000',
    fontSize:15,
    borderBottomColor: "#767676",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width:'100%',
    position:'relative',
    
  },

  ViewinputBuscar:{
    flexDirection:'row',
  },

  iconeBuscar:{
    position:'absolute',
    right:20,
    top: 15,
  }
});