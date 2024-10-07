import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormPersonalInfo from '@/components/forms/FormPersonalInfo';
import FormAddress from '@/components/forms/FormAdress';
import FormCreditCard from '@/components/forms/FormCreditCard';

const schema = Yup.object().shape({
    username: Yup.string().required('O nome de usuário é obrigatório'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
});

export default function PaymentPage() {

    const [isSending, setIsSending] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

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
