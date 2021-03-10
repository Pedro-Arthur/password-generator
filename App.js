import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';
import { Icon } from 'react-native-elements';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(10);

  function generatePassword() {
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    ToastAndroid.show('Copiado para a área de transferência', 2000);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.areaSlider}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      {size <= 8 && (
        <Text style={styles.passWeak}>Fraca</Text>
      )}
      {size > 8 && size <= 11 && (
        <Text style={styles.passMedium}>Média</Text>
      )}
      {size >= 12 && size <= 15 && (
        <Text style={styles.passStrong}>Forte</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password != '' && (
        <View style={styles.areaPassResult}>
          <Text style={styles.password}>{password}</Text>
          <TouchableOpacity style={styles.icon} onPress={copyPass}>
            <Icon name='content-copy' type='material-icons' size={20} color='#000' />
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    marginBottom: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  areaSlider: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7,
  },

  areaPassResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 7,
  },

  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },

  password: {
    padding: 10,
    fontSize: 20,
  },

  icon: {
    padding: 10,
  },

  passWeak: {
    color: '#FF0000',
    marginBottom: 15,
    fontSize: 17,
  },

  passMedium: {
    color: '#FFA200',
    marginBottom: 15,
    fontSize: 17,
  },

  passStrong: {
    color: '#008000',
    marginBottom: 15,
    fontSize: 17,
  },
});
