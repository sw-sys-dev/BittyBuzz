import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/ProfileStyles';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Account</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/user-progress.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Ha Yunji</Text>
        <Text style={styles.levelText}>LV.7</Text>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceText}>
          Balance <Text style={styles.highlightedText}>$10.99</Text> | Coupons{' '}
          <Text style={styles.highlightedText}>15</Text>
        </Text>
      </View>
      <View style={styles.menuSection}>
        <TouchableOpacity><Text style={styles.menuText}>Home</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Profile</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Settings</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Help</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
      </View>
    </View>
  );
};



export default ProfileScreen;
