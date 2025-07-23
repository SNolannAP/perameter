// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type RegisterScreenProps = {
  setRegisteredMobile: (mobile: string) => void;
  setRegisteredPinCode: (pinCode: string) => void;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  setRegisteredMobile,
  setRegisteredPinCode,
}) => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pinCode, setPinCode] = useState('');

  const handleRegister = async () => {
    if (!fullName || !mobile || !email || !pinCode) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (mobile.length !== 11) {
      Alert.alert('Invalid Phone Number');
      return;
    }

    await AsyncStorage.setItem('user', JSON.stringify({ mobile, pinCode }));

    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number (e.g. 09123456789)"
        value={mobile}
        onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
        maxLength={11}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Pin Code"
        value={pinCode}
        onChangeText={(text) => setPinCode(text.replace(/[^0-9]/g, ''))}
        secureTextEntry
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
        <Text style={styles.linkDesc}>Already have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#00ba41ff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00ba41ff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00ba41ff',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  linkText: {
    color: '#00ba41ff',
    textAlign: 'center',
    marginTop: 10,
  },
  linkDesc: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});
