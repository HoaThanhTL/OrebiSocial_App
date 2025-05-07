import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";
import SwapCameraButton from "./components/SwapCameraButton";
import TakePictureButton from "./components/TakePictureButton";
import UsePictureButton from "./components/UsePictureButton";
import TakeAgainButton from "./components/TakeAgainButton";
import ROUTES from "../../constants/routes";
import SavePitureButton from "./components/SavePictureButton";
import { useFocusEffect } from "@react-navigation/native";
import ImageButton from "./components/ImageButton";
export const ScreenWidth = Dimensions.get("window").width;
export const ScreenHeight = Dimensions.get("window").height;

const CameraScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [imageStorage, setImageStorage] = useState(null);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setImage(null);
    }, [])
  );

  const swapCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.5 });
      setImage(photo ?? null);
      console.log("photo: ", photo);
    }
  };
  const usePicture = async () => {
    if (cameraRef) {
      if (image?.uri) {
        try {
          const asset = await MediaLibrary.createAssetAsync(image?.uri);
          navigation.navigate(ROUTES.UPPOST, { selectedImage: asset });
        } catch (e) {
          console.error("Lỗi khi tải về file: ", e);
        }
      }
    }
  };

  const savePicture = async () => {
    if (image?.uri) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image?.uri);
        // await MediaLibrary.saveToLibraryAsync(asset);
        if (asset) {
          alert("Lưu ảnh thành công");
        }
      } catch (e) {
        console.error("Lỗi khi tải về file: ", e);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Spinner visible={false} />
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ratio="16:9"
          // flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <SwapCameraButton onPress={swapCamera} />

            <TakePictureButton onPress={takePicture} />

            <ImageButton onPress={() => navigation.navigate("Thư viện")} />
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: image?.uri || "" }}
            style={{ flex: 1, width: ScreenWidth }}
            resizeMode="cover"
          />
          <View
            style={[
              styles.buttonContainer,
              { marginTop: 10, marginBottom: 20 },
            ]}
          >
            <TakeAgainButton onPress={() => setImage(null)} />
            <UsePictureButton onPress={usePicture} />
            <SavePitureButton onPress={savePicture} />
          </View>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: Platform.OS === "ios" ? 40 : 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
