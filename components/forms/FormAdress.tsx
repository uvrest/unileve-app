import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function FormAddress({ formTitle, onAddressChange }) {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [hasAddress, setHasAddress] = useState(false);
    const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);

    onAddressChange({ cep, logradouro, bairro, localidade, uf, numero, complemento });

    const buscarCep = async () => {
        setIsLoadingZipCode(true);
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            setLogradouro(logradouro);
            setBairro(bairro);
            setLocalidade(localidade);
            setUf(uf);
            setHasAddress(true);
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP. Tente novamente.');
        }
        setIsLoadingZipCode(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formTitle ?? 'Endereço'}</Text>
            <View style={styles.row}>
                <TextInput
                    value={cep}
                    onChangeText={setCep}
                    placeholder="Digite o CEP do endereço"
                    keyboardType="numeric"
                />
                {isLoadingZipCode ? (
                    <ActivityIndicator size="small" color="#0a7ea4" />
                ) : (
                    <Button
                        title="Buscar CEP"
                        onPress={buscarCep}
                        color="#0AB8B6"  // Você pode customizar a cor do botão
                    />
                )}
            </View>
            {hasAddress && (
                <>
                    <TextInput
                        style={styles.input}
                        value={logradouro}
                        onChangeText={setLogradouro}
                        placeholder="Logradouro"
                    />
                    <TextInput
                        style={styles.input}
                        value={bairro}
                        onChangeText={setBairro}
                        placeholder="Bairro"
                    />
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            value={localidade}
                            onChangeText={setLocalidade}
                            placeholder="Cidade"
                        />
                        <TextInput
                            style={styles.input}
                            value={uf}
                            onChangeText={setUf}
                            placeholder="UF"
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            value={numero}
                            onChangeText={setNumero}
                            placeholder="Número"
                        />
                        <TextInput
                            style={styles.input}
                            value={complemento}
                            onChangeText={setComplemento}
                            placeholder="Complemento"
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',  // Alinha os itens na horizontal
        justifyContent: 'space-between',  // Distribui espaço uniformemente
        alignItems: 'center',  // Alinha itens verticalmente ao centro
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        flex: 1,  // Faz o TextInput expandir para ocupar o espaço disponível
        marginRight: 10,  // Adiciona margem à direita do TextInput
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
