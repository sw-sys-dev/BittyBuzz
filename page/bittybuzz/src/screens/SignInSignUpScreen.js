import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleAuthAction = () => {
    if (isSignIn) {
      console.log('Signing in with:', email, password);
      navigation.navigate('MainTabs');
    } else {
      console.log('Signing up with:', name, email, password);
      navigation.navigate('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/bittybuzz.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Middle Image Section */}
      <View style={styles.middleImageContainer}>
        <Image
          source={require('../assets/images/bee.png')} 
          style={styles.middleImage}
          resizeMode="contain"
        />
      </View>
      C:\GitHub\BittyBuzz\page\bittybuzz\src\assets\images\자산 1.png
      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isSignIn ? 'Welcome back!' : 'Join the club—register now!'}</Text>

        {/* Conditionally render Name field for Sign Up */}
        {!isSignIn && (
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
          <Text style={styles.buttonText}>{isSignIn ? 'LOG IN' : 'SIGN UP'}</Text>
        </TouchableOpacity>

        {/* Toggle between Sign In and Sign Up */}
        <Text style={styles.toggleText} onPress={() => setIsSignIn(!isSignIn)}>
          {isSignIn
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  middleImageContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10, 
  },
  middleImage: {
    width: 150, 
    height: 150, 
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#0174DF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    color: '#0174DF',
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
