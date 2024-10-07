import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import { Link } from 'expo-router';

export default function QRScanner() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const handleBarCodeScanned = ({ type, data }) => {
        Vibration.vibrate();
        alert(`QR code with type ${type} and data ${data} has been scanned!`);
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera.</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
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
            >
                <View style={styles.buttonContainer}>
                    <Link href={'/payment'} asChild>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Simular pagamento</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </CameraView>
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