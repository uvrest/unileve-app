import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextInput, Button } from 'react-native-paper';

const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome que consta em seu cartão'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    tax_id: Yup.number().typeError('Informe apenas números').required('Digite o seu CPF'),
    phone: Yup.number().typeError('Informe apenas números').required('Digite o seu celular'),
});

export default function PaymentPage() {

    const [isSending, setIsSending] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const handleConfirmarPagamento = () => {
        alert('Pagamento confirmado!');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingVertical: 15, paddingHorizontal: 15, display: 'flex', rowGap: 10 }}>
                <TextInput
                    mode='outlined'
                    label="Nome que aparece em seu cartão"
                />
                <TextInput
                    mode='outlined'
                    label="Seu e-mail"
                />
                <TextInput
                    mode='outlined'
                    label="CPF"
                />
                <TextInput
                    mode='outlined'
                    label="Celular"
                />
                <Button icon="camera" mode="contained" onPress={handleConfirmarPagamento} style={{ marginTop: 15 }}>
                    Confirmar Pagamento
                </Button>
            </View>
        </ScrollView>
    );
}
