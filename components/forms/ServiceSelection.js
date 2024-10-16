import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, RadioButton, List } from 'react-native-paper';
import { Controller } from 'react-hook-form';

const ServiceSelection = ({ machine, control, name }) => {

    return (
        <Surface style={styles.container}>
            
            <Text style={styles.title}>Máquina: { machine.machine.name }</Text>
            <Text style={styles.subtitle}>Selecione o serviço desejado:</Text>

            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <RadioButton.Group onValueChange={onChange} value={value}>
                        {machine.functions.map((service, index) => (
                            <View key={index} style={styles.radioRow}>
                                <RadioButton value={service.machine_function.id.toString()} />
                                <List.Item
                                    title={service.machine_function.title}
                                    description={`aprox. ${service.machine_function.description} - R$ ${service.custom_price}`}
                                />
                            </View>
                        ))}
                    </RadioButton.Group>
                )}
            />
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default ServiceSelection;
