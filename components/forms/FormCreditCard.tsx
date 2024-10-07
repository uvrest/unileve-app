import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function FormCreditCard({ formTitle, onCardChange }) {
    const [numeroCartao, setNumeroCartao] = useState('');
    const [validade, setValidade] = useState('');
    const [codigoSeguranca, setCodigoSeguranca] = useState('');

    // Propaga as mudanças para o componente pai
    onCardChange({ numeroCartao, validade, codigoSeguranca });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formTitle ?? 'Cartão de Crédito'}</Text>
            <TextInput style={styles.input} value={numeroCartao} onChangeText={setNumeroCartao} placeholder="Número do Cartão" />
            <TextInput style={styles.input} value={validade} onChangeText={setValidade} placeholder="Validade" />
            <TextInput style={styles.input} value={codigoSeguranca} onChangeText={setCodigoSeguranca} placeholder="Código de Segurança" />
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
