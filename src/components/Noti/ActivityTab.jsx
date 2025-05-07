import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActivityTab = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.activityText}>
          <Text style={styles.boldText}>Bạn</Text> đã theo dõi Phú,
        </Text>
        <View style={styles.hr} />
      </View>

      <View>
        <Text style={styles.activityText}>
          <Text style={styles.boldText}>Bạn</Text> đã đăng bài thành công !
        </Text>
        <View style={styles.hr} />
      </View>

      <View>
        <Text style={styles.activityText}>
          Bài đã lưu bài viết: “Gió đưa cành trúc le đè....“
        </Text>
        <View style={styles.hr} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  activityText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  hr: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
});

export default ActivityTab;
