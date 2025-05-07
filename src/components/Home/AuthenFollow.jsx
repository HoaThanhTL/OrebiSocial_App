import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";

const AuthenFollow = ({ toAuth, setToAuth }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <View
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#dfe1e6",
            borderRadius: 100,
          }}
        >
          <Icon source={"account"} color="grey" size={80} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "grey", fontWeight: 500, textAlign: "center" }}>
            Theo dõi người dùng khác và xem nội dung của họ ở đây. Để bắt đầu,
            đăng nhập hoặc đăng kys
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AUTH_NAVIGATOR")}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 90,
              backgroundColor: "black",
            }}
          >
            <Text style={{ color: "white" }}>Đăng nhập hoặc đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthenFollow;

const styles = StyleSheet.create({});
