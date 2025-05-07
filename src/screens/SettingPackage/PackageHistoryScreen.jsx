import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

const transactionsData = [
  {
    id: "1",
    packageType: "Vip",
    date: "2024-01-30",
    status: "success",
    price: 99.99,
  },
  {
    id: "2",
    packageType: "Premium",
    date: "2024-01-28",
    status: "failed",
    price: 79.99,
  },
];

const PackageHistoryScreen = () => {
  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionType}>{item.packageType} Package</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
      <View style={styles.additionalInfo}>
        <Text
          style={[
            styles.status,
            { color: item.status === "success" ? "green" : "red" },
          ]}
        >
          {item.status === "success" ? "Successful" : "Failed"}
        </Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.searchIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Package History</Text>
      </View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.searchBackground,
    height: 60,
  },
  icon: {
    marginRight: 10,
    color: theme.colors.black,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  transactionItem: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transactionDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  additionalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
  },
});

export default PackageHistoryScreen;
