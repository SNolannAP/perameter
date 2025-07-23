import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  registeredMobile: string | null;
  registeredPinCode: string | null;
  setIsLoggedIn: (val: boolean) => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({
  registeredMobile,
  registeredPinCode,
  setIsLoggedIn,
}) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useContext(AuthContext);

  const [mobile, setMobile] = useState('');
  const [pinCode, setPinCode] = useState('');

  const handleLogin = async () => {
    if (!mobile || !pinCode) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (mobile.length !== 11) {
      Alert.alert('Error', 'Invalid Mobile Number');
      return;
    }

    const userStr = await AsyncStorage.getItem('user');
    if (!userStr) {
      Alert.alert('Error', 'No account found. Please register first.');
      return;
    }
    const user = JSON.parse(userStr);
    if (mobile !== user.mobile || pinCode !== user.pinCode) {
      Alert.alert('Error', 'Incorrect mobile number or password.');
      return;
    }

    login();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to PERAmeter</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
        maxLength={11}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pinCode}
        onChangeText={(text) => setPinCode(text.replace(/[^0-9]/g, ''))}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

        <Text style={styles.linkDesc}>Don't have an account?</Text> 
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00ba41ff',
    marginBottom: 40,
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
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
