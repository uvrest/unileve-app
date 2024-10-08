import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, Surface, Text } from 'react-native-paper';

const PersonalInfoForm = ({ control, errors }) => {
    return (
        <Surface style={{ padding: 15, marginVertical: 10, rowGap: 10}}>

            <Text>Informações Pessoais</Text>

            {/* Campo Nome */}
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Nome que aparece em seu cartão"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.name}
                        />
                        {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}
                    </>
                )}
            />

            {/* Campo Email */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Seu e-mail"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.email}
                        />
                        {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
                    </>
                )}
            />

            {/* Campo CPF */}
            <Controller
                control={control}
                name="tax_id"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="CPF"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.tax_id}
                        />
                        {errors.tax_id && <HelperText type="error">{errors.tax_id.message}</HelperText>}
                    </>
                )}
            />

            {/* Campo Celular */}
            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="Celular"
                            keyboardType="phone-pad"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.phone}
                        />
                        {errors.phone && <HelperText type="error">{errors.phone.message}</HelperText>}
                    </>
                )}
            />
        </Surface>
    );
};

export default PersonalInfoForm;