import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, RadioButton, List } from 'react-native-paper';

const ServiceSelection = ({ machineInfo, services, onSelectService }) => {
    
    const [selectedService, setSelectedService] = useState(null);

    const handleSelectService = (value) => {
        setSelectedService(value);
        onSelectService(value);
    };

    return (
        <Surface style={styles.container}>
            
            <Text style={styles.title}>Máquina: {machineInfo.machineName}</Text>
            <Text style={styles.subtitle}>Selecione o serviço desejado:</Text>

            <RadioButton.Group onValueChange={handleSelectService} value={selectedService}>
                {services.map((service, index) => (
                    <View key={index} style={styles.radioRow}>
                        <RadioButton value={service} />
                        <List.Item
                            title={service.name}
                            description={`aprox. ${service.duration} - R$ ${service.price}`}
                        />
                    </View>
                ))}
            </RadioButton.Group>
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
