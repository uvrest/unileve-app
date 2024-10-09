import React from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, Surface, Text } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';

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
                            value={value}
                            onBlur={onBlur}
                            error={!!errors.card_number}
                            autoComplete='cc-number'
                            render={props => (
                                <MaskInput
                                    {...props}
                                    value={value}
                                    onChangeText={onChange}
                                    mask={Masks.CREDIT_CARD}
                                    keyboardType="numeric"
                                    showObfuscatedValue={false}
                                />
                            )}
                        />
                        {errors.card_number && <HelperText type="error">{errors.card_number.message}</HelperText>}
                    </>
                )}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', columnGap:10 }}>
                
                {/* Data de expiração do cartão */}
                <View style={{ flex: 1 }}>
                    <Controller
                        control={control}
                        name="expiration_date"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Vencimento"
                                    onBlur={onBlur}
                                    value={value}
                                    error={!!errors.expiration_date}
                                    render={props => (
                                        <MaskInput
                                            {...props}
                                            value={value}
                                            onChangeText={onChange}
                                            keyboardType="numeric"
                                            showObfuscatedValue={false}
                                            mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                                        />
                                    )}
                                />
                                {errors.expiration_date && <HelperText type="error">{errors.expiration_date.message}</HelperText>}
                            </>
                        )}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    {/* Código de segurança */}
                    <Controller
                        control={control}
                        name="security_code"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Cód. Seg."
                                    onBlur={onBlur}
                                    value={value}
                                    error={!!errors.security_code}
                                    render={props => (
                                        <MaskInput
                                            {...props}
                                            value={value}
                                            onChangeText={onChange}
                                            keyboardType="numeric"
                                            showObfuscatedValue={false}
                                            mask={[/\d/, /\d/, /\d/]}
                                        />
                                    )}
                                />
                                {errors.security_code && <HelperText type="error">{errors.security_code.message}</HelperText>}
                            </>
                        )}
                    />
                </View>

            </View>

        </Surface>
    );
}

export default CreditCardInfoForm;