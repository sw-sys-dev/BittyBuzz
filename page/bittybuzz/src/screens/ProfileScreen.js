import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My account</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
         source={require('../assets/images/user-progress.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>ha yunji</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelText: {
    fontSize: 14,
    color: 'gray',
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
  },
  highlightedText: {
    color: 'orange',
    fontWeight: 'bold',
  },
  menuSection: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
  },
  menuText: {
    fontSize: 18,
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProfileScreen;
