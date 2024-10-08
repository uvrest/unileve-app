import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextInput, Button, HelperText } from 'react-native-paper';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import AddressInfoForm from '../components/forms/AddressInfoForm';
import CreditCardInfoForm from '../components/forms/CreditCardInfoForm';
import PaymentInfo from '../components/forms/PaymentInfo';
import ServiceSelection from '../components/forms/ServiceSelection';

const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome que consta em seu cartão'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    tax_id: Yup.string().matches(/^\d+$/, 'Informe apenas números').required('Digite o seu CPF').length(11, 'O CPF deve ter exatamente 11 dígitos'),
    phone: Yup.string().matches(/^\d+$/, 'Informe apenas números').required('Digite o seu celular'),
    postal_code: Yup.string().matches(/^\d+$/, 'Informe apenas números').required('Digite o seu CEP').length(8, 'O CEP deve ter exatamente 8 dígitos'),
    street: Yup.string().required('O campo logradouro é obrigatório'),
    number: Yup.string().matches(/^\d+$/, 'Informe apenas números').required('O campo número é obrigatório'),
    complement: Yup.string().nullable(),
    locality: Yup.string().required('O campo bairro é obrigatório'),
    city: Yup.string().required('O campo cidade é obrigatório'),
    region_code: Yup.string().required('O estado é obrigatório').length(2, 'O Estado deve ter exatamente 2 dígitos'),
    card_number: Yup.string().required('O número do cartão de crédito é obrigatório'),
    expiration_date: Yup.string().required('Data de expiração do cartão é obrigatória'),
    security_code: Yup.string().required('Digite o código de segurança de três dígitos do cartão').length(3, 'O código CVV de possuir 3 caracteres'),
});

export default function PaymentPage() {

    const [selectedService, setSelectedService] = useState(null); // Estado para o serviço selecionado
    const [isSending, setIsSending] = useState(false);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    // Função chamada ao enviar o formulário
    const handleConfirmPayment = (data) => {
        if (!selectedService) {
            alert('Selecione um serviço para continuar.');
            return;
        }
        console.log({ ...data, selectedService });
        alert('Pagamento confirmado!');
    };

    const machineInfo = {
        machineName: 'Brastemp ABC 30kg',
    };

    const services = [
        { id: '1', name: 'Limpeza Leve', duration: '30 min', price: '12,90' },
        { id: '2', name: 'Limpeza Padrão', duration: '60 min', price: '17,90' },
        { id: '3', name: 'Limpeza Pesada', duration: '90 min', price: '25,90' },
    ];

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingVertical: 15, paddingHorizontal: 15, display: 'flex' }}>

                <PaymentInfo />

                <ServiceSelection
                    machineInfo={machineInfo}
                    services={services}
                    onSelectService={setSelectedService}
                />

                {/* Seção de Informações Pessoais */}
                <PersonalInfoForm control={control} errors={errors} />

                {/* Seção de Informações de Endereço */}
                <AddressInfoForm control={control} errors={errors} setValue={setValue} />

                {/* Seção de Informações de Endereço */}
                <CreditCardInfoForm control={control} errors={errors} />

                {/* Botão Confirmar Pagamento */}
                <Button
                    icon="credit-card-check"
                    mode="contained"
                    onPress={handleSubmit(handleConfirmPayment)}
                    loading={isSending}
                    disabled={isSending}
                    style={{ marginTop: 15 }}
                >
                    Confirmar Pagamento
                </Button>

            </View>
        </ScrollView>
    );
}
