import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';

const PaymentInfo = () => {
    return (
        <Surface style={styles.container}>
            <Text style={styles.message}>
                Não armazenamos os dados de seu cartão.
            </Text>
            <Text style={styles.message}>
                O pedido é processado por:
            </Text>
            <Image
                source={require('@/assets/images/banks/logo_pagbank.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
        marginBottom: 20, // Espaçamento entre o componente e o formulário
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 5,
    },
    logo: {
        width: 150,
        height: 50,
        marginTop: 10,
    },
});

export default PaymentInfo;
