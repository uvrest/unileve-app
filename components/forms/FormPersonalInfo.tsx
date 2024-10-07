import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function FormPersonalInfo({ formTitle, onInfoChange }) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    //const [dataNascimento, setDataNascimento] = useState('');

    // Propaga as mudanças para o componente pai
    onInfoChange({ nome, cpf, telefone });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formTitle ?? 'Informações Pessoais'}</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome Completo" />
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="CPF" />
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="Telefone" />
            {/*<TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} placeholder="Data de Nascimento" />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});