import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const SendToNumber = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [amount, setAmount] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSend = () => {
  };

  const handleConsent = () => {
    setConsent(!consent);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Send to Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient's Phone Number"
        keyboardType="phone-pad"
        maxLength={11}
        value={phone}
        onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        style={styles.input}
        placeholder="PIN Code"
        secureTextEntry
        value={pin}
        onChangeText={text => setPin(text.replace(/[^0-9]/g, ''))}
        maxLength={6}
      />
      <View style={styles.amountContainer}>
        <Text style={styles.pesoSign}>₱</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setAmount(text.replace(/[^0-9.]/g, ''))}
        />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
        <Text style={styles.sendBtnText}>Send</Text>
      </TouchableOpacity>
      {/* <View style={styles.consentContainer}>
        <Text style={styles.consentText}>
          By confirming, you authorize this transaction.
        </Text>
      </View> */}
    </KeyboardAvoidingView>
  );
};

export default SendToNumber;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f5ea', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#27ae60', marginBottom: 30 },
  input: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#27ae60',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27ae60',
    width: '85%',
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pesoSign: { fontSize: 24, color: '#27ae60', marginRight: 8, fontWeight: 'bold' },
  amountInput: {
    flex: 1,
    fontSize: 24,
    color: '#27ae60',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  sendBtn: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 14,
    width: '85%',
    alignItems: 'center',
    marginBottom: 16,
  },
  sendBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    marginTop: 10,
  },
  consentText: {
    color: '#27ae60',
    fontSize: 14,
    marginRight: 10,
    flex: 1,
    textAlign: 'right',
  },
  confirmBtn: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#27ae60',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
