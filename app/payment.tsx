import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMachineContext } from '@/components/contexts/MachineContext';
import * as Yup from 'yup';
import { Button } from 'react-native-paper';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import AddressInfoForm from '../components/forms/AddressInfoForm';
import CreditCardInfoForm from '../components/forms/CreditCardInfoForm';
import PaymentInfo from '../components/forms/PaymentInfo';
import ServiceSelection from '../components/forms/ServiceSelection';
import uuid from 'react-native-uuid';
import axios from 'axios';

const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome que consta em seu cartão'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    tax_id: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido').required('Digite o seu CPF'),
    phone: Yup.string().matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone não é válido').required('Digite o seu celular'),
    postal_code: Yup.string().matches(/^\d{8}$/, 'Informe apenas números').required('Digite o seu CEP').length(8, 'O CEP deve ter exatamente 8 dígitos'),
    street: Yup.string().required('O campo logradouro é obrigatório'),
    number: Yup.string().matches(/^\d+$/, 'Informe apenas números').required('O campo número é obrigatório'),
    complement: Yup.string().nullable(),
    locality: Yup.string().required('O campo bairro é obrigatório'),
    city: Yup.string().required('O campo cidade é obrigatório'),
    region_code: Yup.string().required('O estado é obrigatório').length(2, 'O Estado deve ter exatamente 2 dígitos'),
    card_number: Yup.string().matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Formato de cartão inválido').required('O número do cartão de crédito é obrigatório'),
    expiration_date: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'A data de expiração deve estar no formato MM/AA').required('Data de expiração do cartão é obrigatória'),
    security_code: Yup.string().matches(/^\d{3}$/, 'O código de segurança deve ter 3 dígitos').required('Digite o código de segurança de três dígitos do cartão'),
});

const defaultValues = {
    name: '',
    email: '',
    tax_id: '',
    phone: '',
    postal_code: '',
    street: '',
    number: '',
    complement: '',
    locality: '',
    city: '',
    region_code: '',
    card_number: '',
    expiration_date: '',
    security_code: '',
    selected_service: '',
}

export default function PaymentPage() {

    const { machine } = useMachineContext();
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: defaultValues,
    });

    // Função chamada ao enviar o formulário
    const handleConfirmPayment = async (data) => {

        setIsSending(true);

        const { name, email, tax_id, phone, street, number, complement, locality, city, region_code, postal_code } = data;
        const { machine_function, custom_price } = selectedFunction;

        // Gerar um ID único para referência
        const referenceId = uuid.v4();

        // Extrair área e número de telefone (remover parênteses, espaços e traços)
        const [areaCode, phoneNumber] = phone.replace(/\D/g, '').match(/(\d{2})(\d{8,9})/).slice(1);

        // Converter o preço para centavos
        const unitAmount = Math.round(parseFloat(custom_price) * 100);

        const paymentData = {
            reference_id: referenceId,
            customer: {
                name,
                email,
                tax_id: tax_id.replace(/\D/g, ''), // CPF (somente números)
                phones: [
                    {
                        country: 55,
                        area: parseInt(areaCode),
                        number: parseInt(phoneNumber),
                        type: 'MOBILE',
                    },
                ],
            },
            items: [
                {
                    reference_id: `machine_${selectedFunction.franchise_machine_id}`,
                    name: `${machine_function.title} ${machine_function.description}`,
                    quantity: 1,
                    unit_amount: unitAmount,
                },
            ],
            shipping: {
                address: {
                    street,
                    number,
                    complement,
                    locality,
                    city,
                    region_code,
                    country: 'BRA',
                    postal_code,
                },
            },
            charges: [
                {
                    reference_id: referenceId,
                    description: `Unileve Lavanderia: ${machine_function.title}`,
                    amount: {
                        value: unitAmount,
                        currency: 'BRL',
                    },
                    payment_method: {
                        type: 'CREDIT_CARD',
                        installments: 1,
                        capture: true,
                        card: {
                            encrypted: 'TITpBXOd+ugEt++ctvpgrmxpWCfmSxMNj9fom6DXHmy4lXB9B36CP7MWU3mZhn+TMKNG6HfGHR3r6cQXTxnUTIn8hcBPHuk5gHwFwDNltNUDuRhbXYZhjXm15+WHyIj9HqLVSw8EG3PH+RZyOsU6xL1+BUA+u6qWYs8omuUD20CXPD2Wo5u0STVOMmMayjh/6Jhve4yTn/eEl1+ZjMPvqQLKfxkpFHOQcA1uMtU+n1oksDK2YtEYGh1mHJ1u6f7WUgV+D2uUmnQcmKxKTYHXgXePXzDj+OZZHQ9OUObwnc29VrDSavD0NiwM91Kk7lwxEzK31Y2U0pj/GTxqTlMHNQ==',
                            store: false,
                        },
                        holder: {
                            name,
                            tax_id: tax_id.replace(/\D/g, ''),
                        },
                    },
                },
            ],
        };

        const urlApi = 'http://10.0.2.2:8000/api/payments/create-order';
        const bearerToken = '51c90193-491e-4d1c-bc3d-e7e9aa4a72027acfc15f43aa80ad09de809d817f3c03962b-3f0f-4578-8374-3745218c2fdb';

        try {
            // Fazendo o POST com Axios
            const response = await axios.post(urlApi, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.api+json',
                    'Authorization': `Bearer ${bearerToken}`,
                },
            });

            // Exibe a resposta do servidor
            const pagBankResponse = response.data;

            if (pagBankResponse.charges[0].payment_response.message === 'SUCESSO') {
                Alert.alert('Pagamento efetuado com sucesso, aguarde o destravamento da máquina');
            }
            console.log('Resposta da API:', response.data);

        } catch (error) {
            console.error('Erro ao enviar pagamento:', error.response ? error.response.data : error.message);
        }

        setIsSending(false);

        return;
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingVertical: 15, paddingHorizontal: 15, display: 'flex' }}>

                <PaymentInfo />

                <ServiceSelection
                    machine={machine}
                    control={control}
                    setSelectedFunction={setSelectedFunction}
                    name='selected_service'
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
