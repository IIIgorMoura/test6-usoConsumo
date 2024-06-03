import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemCor, setMensagemCor] = useState('#1ACEDA');

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  async function verificarLogin() {
    try {
      const q = query(collection(bancoExterno, 'cadastros'), where('Email', '==', email), where('Senha', '==', senha));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setMensagem(`Bem-vindo(a) ${userData.Nome}`);
        setMensagemCor('#1ACEDA'); // Azul para login correto
      } else {
        setMensagem('Email ou senha inválidos. Tente novamente.');
        setMensagemCor('#FF0000'); // Vermelho para login incorreto
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  }

  return (
    <View style={styles.container}>
      {mensagem ? (
        <Animatable.View animation="slideInUp" style={[styles.viewConfirm, { backgroundColor: mensagemCor }]}>
          <Text style={styles.confirmacao}>{mensagem}</Text>
        </Animatable.View>
      ) : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor={"gray"}
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor={"gray"}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={verificarLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 5,

    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    color: '#fff',
  },
  button: {
    backgroundColor: "#1ACEDA",
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  confirmacao: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
  viewConfirm: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
  },
});