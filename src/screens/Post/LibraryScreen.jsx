import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../constants/routes';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native-elements';

const LibraryScreen = () => {

  const navigation = useNavigation();

  const [libraryImages, setLibraryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchLibraryImages = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Permission to access media library not granted');
      }

      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 20,
      });

      setLibraryImages(assets);
    } catch (error) {
      console.error('Error fetching library images:', error.message);
    }
  };

  useEffect(() => {
    fetchLibraryImages();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };
  const handleImagePress = (item) => {
    setSelectedImage(selectedImage === item ? null : item);
  };
  const handleNextPress = () => {
    if (selectedImage) {
      navigation.navigate(ROUTES.UPPOST, { selectedImage });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPress} disabled={!selectedImage}>
          <Text style={[styles.nextButton, { color: selectedImage ? 'black' : 'gray' }]}>
            Tiếp theo
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={libraryImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <Image
              source={{ uri: item.uri }}
              style={[styles.image, { opacity: selectedImage === item ? 0.5 : 1 }]}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
  nextButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LibraryScreen;