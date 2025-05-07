import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HeaderFriend from "../components/Friends/HeaderFriend";
import CartFriends from "../components/Friends/CartFriends";
import products from "../data/Products";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowerAndFollowingByAccountId,
  getSuggestionAccountByAccountId,
} from "../app/Account/actions";

const FriendScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item } = route?.params;
  console.log("item:", item);

  const accountSuggestion = useSelector(
    (state) => state.account.accountSuggestion
  );
  const accountFollowInfo = useSelector(
    (state) => state.account.accountFollowInfo
  );

  const fetchAccountSuggestion = async () => {
    await dispatch(getSuggestionAccountByAccountId(item?.accountId));
  };

  const fetchFollowerAndFollowingByAccountId = async () => {
    await dispatch(getFollowerAndFollowingByAccountId(item?.accountId));
  };

  useEffect(() => {
    fetchFollowerAndFollowingByAccountId();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderFriend navigation={navigation} />
      <View style={styles.hr} />
      {/* <CartFriends /> */}

      <FlatList
        data={accountSuggestion?.posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity>
            <CartFriends item={item} index={index} />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});

export default FriendScreen;
