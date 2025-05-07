import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { imageUrlTest } from "../../utils/testData";
import { Icon } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  followOneAccount,
  getSuggestionAccount,
  getSuggestionAccountByAccountId,
} from "../../app/Account/actions";
import ROUTES from "../../constants/routes";
const HeaderFriend = ({ navigation }) => {
  // const navigation = useNavigation();
  const SettingFriends = () => {
    // Chuyển đến trang Setting khi người dùng nhấn vào icon Setting
    navigation.navigate("SettingFriends");
  };
  const accountSuggestion = useSelector(
    (state) => state.account.accountSuggestion
  );
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const fetchAllAccountSuggestion = async () => {
    await dispatch(getSuggestionAccount()).then((res) => {
      // console.log("res", JSON.stringify(res, null, 2));
    });
  };

  const fetchAccountSuggestion = async () => {
    await dispatch(
      getSuggestionAccountByAccountId(accountSuggestion?.accountId)
    );
  };

  const followOneAccountById = async (accountId) => {
    try {
      await dispatch(followOneAccount(accountId)).then(async (res) => {
        console.log(res?.payload?.isfollow === true ? "Following" : "Unfollow");
        if (res?.meta?.requestStatus === "fulfilled") {
          await fetchAccountSuggestion();
          await fetchAllAccountSuggestion();
        }
      });
    } catch (error) {}
  };

  function navigateToFollower() {
    navigation.push(ROUTES.FOLLOWER, { account: accountSuggestion });
  }

  function navigateToFollowing() {
    navigation.push(ROUTES.FOLLOWING, { account: accountSuggestion });
  }

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon source={"chevron-left"} size={40} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 0 }}>
          <TouchableOpacity>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="share-social-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={SettingFriends}>
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <View style={styles.topRow}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: accountSuggestion?.user?.avatar || imageUrlTest }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>
              {accountSuggestion?.username || "user"}
            </Text>
            <Text style={styles.account}>
              {"@" + accountSuggestion?.username || "user"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 15, gap: 10 }}>
          <Text>{"NAM" + " | " + accountSuggestion?.user?.height + " cm"}</Text>
          <Text>
            Đây chỉ là user story fix cứng, vì Database làm gì có khúc này nên
            tự sửa nhé~
          </Text>
          {/* <TouchableOpacity>
            <Text style={{ textDecorationLine: "underline" }}>
              www.uniqlo.com/ph/en/
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.bioContainer}>
          <TouchableOpacity
            onPress={navigateToFollower}
            style={styles.bioColumn}
          >
            <Text style={styles.bioCount}>
              {accountSuggestion?.follower || 0}
            </Text>
            <Text style={styles.bioText}>Người theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToFollowing}
            style={styles.bioColumn}
          >
            <Text style={styles.bioCount}>
              {accountSuggestion?.following || 0}
            </Text>
            <Text style={styles.bioText}>Đang theo dõi</Text>
          </TouchableOpacity>
          <View>
            {!accountSuggestion?.isfollow || authenticated === false ? (
              <TouchableOpacity
                onPress={() =>
                  followOneAccountById(accountSuggestion?.accountId)
                }
                style={styles.addBioButton}
              >
                <Text style={styles.addBioButtonText}>Theo dõi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  followOneAccountById(accountSuggestion?.accountId)
                }
                style={styles.addBioButton2}
              >
                <Text style={styles.addBioButtonText2}>Đang theo dõi</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    marginTop: 50,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 15,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  userInfo: {
    flex: 1,
    gap: 0,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  account: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
  },
  icon: {
    marginLeft: 20,
  },
  bioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bioColumn: {
    alignItems: "center",
  },
  bioCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bioText: {
    fontSize: 14,
    color: "gray",
  },
  addBioButton: {
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 1,
  },
  addBioButtonText: {
    color: "white",
    fontSize: 13,
  },
  addBioButton2: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  addBioButtonText2: {
    color: "black",
    fontSize: 13,
  },
  bioContent: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default HeaderFriend;
