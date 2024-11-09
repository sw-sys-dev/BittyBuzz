// SignInScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


const handleSignIn = () => {
    console.log('Signing in with:', email, password);
    // 메인 스크린으로 이동
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Title */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Bitty Buzz</Text>
      </View>

      {/* SVG Wave */}
      <Svg height="30%" width="100%" viewBox="0 0 1440 320" style={styles.curve}>
        <Path
          fill="#000"
          d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,133.3C672,128,768,128,864,144C960,160,1056,192,1152,213.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>

      {/* Bottom Section with Sign In Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.signInText}>Sign In</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.toggleText}>Don't have an account? Sign Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff99cc', // Pink background for the top
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  curve: {
    position: 'absolute',
    bottom: '45%', // Adjust based on the desired curve placement
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#000', // Black background f
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#ff99cc',
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
    color: '#ff99cc',
    marginTop: 10,
    fontSize: 14,
  },
});
