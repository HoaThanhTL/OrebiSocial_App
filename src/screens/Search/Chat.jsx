import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';

const Chat = () => {
  const data = [
    { id: '1', content: 'Chat 1' },
    { id: '2', content: 'Chat 2' },
    { id: '3', content: 'Chat 3' },
    // Thêm dữ liệu chat khác nếu cần
  ];

  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Text>{item.content}</Text>
    </View>
  );

  const HeaderComponent = () => (
    <View style={styles.header}>
      <IconButton icon="home" onPress={() => console.log('Home button pressed')} />
      <Text style={styles.headerText}>Chat</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={HeaderComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#99A1E8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Chat;
