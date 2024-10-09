import React from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, Surface, Text } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';

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
                            autoComplete='name'
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
                            autoComplete='email'
                            error={!!errors.email}
                        />
                        {errors.email && <HelperText type="error">{errors.email.message}</HelperText>}
                    </>
                )}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', columnGap:10 }}>

                <View style={{ flex: 1 }}>
                    
                    {/* Campo CPF com máscara */}
                    <Controller
                        control={control}
                        name="tax_id"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="CPF"
                                    value={value}
                                    onBlur={onBlur}
                                    render={props => (
                                        <MaskInput
                                            {...props}
                                            value={value}
                                            onChangeText={onChange}
                                            mask={Masks.BRL_CPF}
                                            keyboardType="numeric"
                                        />
                                    )}
                                    error={!!errors.tax_id}
                                />
                                {errors.tax_id && <HelperText type="error">{errors.tax_id.message}</HelperText>}
                            </>
                        )}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    
                    {/* Campo Celular */}
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Celular"
                                    value={value}
                                    onBlur={onBlur}
                                    autoComplete='tel'
                                    render={props => (
                                        <MaskInput
                                            {...props}
                                            value={value}
                                            onChangeText={onChange}
                                            mask={Masks.BRL_PHONE}
                                            keyboardType="phone-pad"
                                        />
                                    )}
                                    error={!!errors.phone}
                                />
                                {errors.phone && <HelperText type="error">{errors.phone.message}</HelperText>}
                            </>
                        )}
                    />
                    
                </View>

            </View>

        </Surface>
    );
};

export default PersonalInfoForm;