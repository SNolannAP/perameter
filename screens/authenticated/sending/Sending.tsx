import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sending = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Sending Method</Text>
      <TouchableOpacity
        style={styles.methodBtn}
        onPress={() => navigation.navigate('SendToNumber')}
      >
        <Text style={styles.methodText}>Send to Mobile Number</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodBtn}
        onPress={() => navigation.navigate('QRSendProcess')}
      >
        <Text style={styles.methodText}>Send via QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sending;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f5ea', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#27ae60', marginBottom: 40 },
  methodBtn: {
    backgroundColor: '#27ae60',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  methodText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
