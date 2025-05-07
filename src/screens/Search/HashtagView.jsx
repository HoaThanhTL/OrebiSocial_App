import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import products from '../../data/Products';
import Cart from '../../components/Home/Cart';

const HashtagView = () => {
  const navigation = useNavigation();

  const goBack = () => {
    // Sử dụng navigation.goBack() để quay lại trang trước
    navigation.goBack();
  };

  const navigateToCartDetail = (item) => {
    // Chuyển đến màn hình CartDetail và truyền postId
    navigation.navigate('CartDetail', { item });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.hashtagContainer}>
            <Text style={styles.hashtag}>{`${products[0].hashtag}`}</Text>
          </View>
        </View>
      </View>
      {/* Phần Bộ lọc và Sắp xếp */}
      <View style={styles.filterSortContainer}>
        {/* Thêm các thành phần bộ lọc và sắp xếp tại đây */}
        {/* Ví dụ: Nút Bộ lọc và Nút Sắp xếp */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>Bộ lọc(3)</Text>
        </TouchableOpacity>
        <Icon name="tune" size={20} color="black" style={styles.icon} />
        <Text style={styles.separatorText}> | </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Sắp xếp</Text>
        </TouchableOpacity>
        <Icon name="sort" size={20} color="black" style={styles.icon} />
      </View>

      <View style={styles.bottomHorizontalLine} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.postContainerScrollView}
      >
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
            <Cart item={item} />
          </TouchableOpacity>}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
};

export default HashtagView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hashtagContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtag: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomHorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 3,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
