import React, { useState } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText, Surface, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const AddressInfoForm = ({ control, setValue, errors }) => {

    const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);
    const [hasAddress, setHasAddress] = useState(false);

    const getZipcode = async (cep) => {
        
        setIsLoadingZipCode(true);

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            
            if (!logradouro) {
                alert('CEP não encontrado. Tente novamente.');
                setIsLoadingZipCode(false);
                return;
            }
            
            // Preencher automaticamente os campos de endereço
            setValue('street', logradouro);
            setValue('locality', bairro);
            setValue('city', localidade);
            setValue('region_code', uf);
            
            setHasAddress(true);
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP. Tente novamente.');
        }
        setIsLoadingZipCode(false);
    }

    return (
        <Surface style={{ padding: 15, marginVertical: 10, rowGap: 10}}>
            
            <Text>Endereço de Cobrança</Text>

            {/* Campo CEP */}
            <Controller
                control={control}
                name="postal_code"
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            mode='outlined'
                            label="CEP"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={!!errors.postal_code}
                            right={<TextInput.Icon icon="map-search-outline" onPress={() => getZipcode(value)} />}
                        />
                        {errors.postal_code && <HelperText type="error">{errors.postal_code.message}</HelperText>}
                    </>
                )}
            />

            {isLoadingZipCode ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <ActivityIndicator animating={true} size="large" />
                    <Text style={{ marginTop: 10 }}>Buscando endereço, aguarde...</Text>
                </View>
            ) : hasAddress && (
                <>
                    {/* Campo Logradouro */}
                    <Controller
                        control={control}
                        name="street"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Logradouro"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.street}
                                />
                                {errors.street && <HelperText type="error">{errors.street.message}</HelperText>}
                            </>
                        )}
                    />

                    {/* Campo Número */}
                    <Controller
                        control={control}
                        name="number"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Número"
                                    keyboardType="numeric"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.number}
                                />
                                {errors.number && <HelperText type="error">{errors.number.message}</HelperText>}
                            </>
                        )}
                    />

                    {/* Campo Complemento */}
                    <Controller
                        control={control}
                        name="complement"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Complemento"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.complement}
                                />
                                {errors.complement && <HelperText type="error">{errors.complement.message}</HelperText>}
                            </>
                        )}
                    />

                    {/* Campo Localidade/Bairro */}
                    <Controller
                        control={control}
                        name="locality"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Bairro"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.locality}
                                />
                                {errors.locality && <HelperText type="error">{errors.locality.message}</HelperText>}
                            </>
                        )}
                    />

                    {/* Campo Cidade */}
                    <Controller
                        control={control}
                        name="city"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="Cidade"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.city}
                                />
                                {errors.city && <HelperText type="error">{errors.city.message}</HelperText>}
                            </>
                        )}
                    />

                    {/* Campo UF */}
                    <Controller
                        control={control}
                        name="region_code"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    mode='outlined'
                                    label="UF"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.region_code}
                                />
                                {errors.region_code && <HelperText type="error">{errors.region_code.message}</HelperText>}
                            </>
                        )}
                    />
                </>
            )}
        </Surface>
    );
}

export default AddressInfoForm;