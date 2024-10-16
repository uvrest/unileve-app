import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useMachineContext } from '@/components/contexts/MachineContext';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

export default function QRScanner() {

    const { fetchMachineData, machine, isLoading, error } = useMachineContext();
    const router = useRouter();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasScanned, setHasScanned] = useState(false);  // Estado para controlar se já foi escaneado

    const handleBarCodeScanned = ({ type, data }) => {
        if (!hasScanned) {
            setHasScanned(true);
            Vibration.vibrate();
            fetchMachineData(data);
        }
    };

    useEffect(() => {
        if (machine) {
            setHasScanned(true);
            Alert.alert(
                'Máquina Escaneada',
                'Deseja prosseguir para o pagamento?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => setHasScanned(false),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => router.push('/payment'),  // Redireciona para a rota /payment
                    },
                ]
            );
        }
    }, [machine]);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>A Unileve precisa de acesso à câmera do seu celular.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Conceder Permissão de Acesso</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        fontSize: 18,
        padding: 20,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        gap: 1,
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#fff',
        margin: 20,
        width: '90%',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    buttonText: {
        fontSize: 16,
        color: 'blue',
    },
});