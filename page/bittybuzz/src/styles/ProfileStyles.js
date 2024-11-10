import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        color: '#ff99cc',
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