import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import FormPersonalInfo from '@/components/forms/FormPersonalInfo';
import FormAddress from '@/components/forms/FormAdress';
import FormCreditCard from '@/components/forms/FormCreditCard';

export default function PaymentPage() {

    const handleConfirmarPagamento = () => {
        // Aqui você pode adicionar a lógica para processar o pagamento
        alert('Pagamento confirmado!');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingVertical: 10, }}>
                <FormPersonalInfo formTitle='Informações Pessoais' onInfoChange={(info) => console.log(info)} />
                <FormAddress formTitle='Endereço de Cobrança do Cartão' onAddressChange={(address) => console.log(address)} />
                <FormCreditCard formTitle='Informações do Cartão de Crédito' onCardChange={(card) => console.log(card)} />
                <Button title="Confirmar Pagamento" color="#0AB8B6" onPress={handleConfirmarPagamento} />
            </View>
        </ScrollView>
    );
}
