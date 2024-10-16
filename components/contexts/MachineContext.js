import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

const MachineContext = createContext(null);

// Provedor do contexto
export const MachineProvider = ({ children }) => {
    
    const [machine, setMachine] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMachineData = useCallback(async (url) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(url);
            const machineData = response.data.data;
            setMachine(machineData);
        } catch (error) {
            setError('Erro ao buscar dados da máquina');
            Alert.alert('Erro ao buscar dados da máquina');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <MachineContext.Provider value={{ machine, fetchMachineData, isLoading, error }}>
            {children}
        </MachineContext.Provider>
    );
};

// Hook para acessar o contexto facilmente
export const useMachineContext = () => {
    return useContext(MachineContext);
};