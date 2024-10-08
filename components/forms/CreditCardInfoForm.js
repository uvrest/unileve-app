import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, Surface, Text } from 'react-native-paper';

const CreditCardInfoForm = ({ control, errors }) => {
    return (
        <Surface style={{ padding: 15, marginVertical: 10, rowGap: 10}}>
            
            <Text>Informações do Cartão de Crédito</Text>

            {/* Campo Número do Cartão */}
            <Controller
                control={control}
                name="card_number"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Número do Cartão de Crédito"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.card_number}
                        />
                        {errors.card_number && <HelperText type="error">{errors.card_number.message}</HelperText>}
                    </>
                )}
            />

            {/* Data de expiração do cartão */}
            <Controller
                control={control}
                name="expiration_date"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Vencimento do cartão"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.expiration_date}
                        />
                        {errors.expiration_date && <HelperText type="error">{errors.expiration_date.message}</HelperText>}
                    </>
                )}
            />

            {/* Código de segurança */}
            <Controller
                control={control}
                name="security_code"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Código de segurança"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.security_code}
                        />
                        {errors.security_code && <HelperText type="error">{errors.security_code.message}</HelperText>}
                    </>
                )}
            />

        </Surface>
    );
}

export default CreditCardInfoForm;