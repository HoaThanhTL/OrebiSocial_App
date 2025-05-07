import axiosClient from "./axiosClient";

export const accountService = {
  updatePassword: (data) => {
    const url = `/odata/Accounts/${data.key}/Update`;
    return axiosClient.put(url, data.requestBody);
  },
  getAccountWithPostList: (username) => {
    const url = `/odata/Accounts/SearchByUserName?username=${username}`;
    return axiosClient.get(url);
  },
  getSuggestionAccount: () => {
    const url = `/odata/Accounts/GetSuggestionAccount`;
    return axiosClient.get(url);
  },
  followOneAccount: (accountId) => {
    const url = `/odata/Users/Follower?AccountId=${accountId}`;
    return axiosClient.post(url);
  },
  getSuggestionAccountByAccountId: (accountId) => {
    const url = `/odata/Accounts/GetSuggestionAccountId?accountId=${accountId}`;
    return axiosClient.get(url);
  },
  getFollowingAccountWithPosts: () => {
    const url = `/odata/GetPost/User/Follow`;
    return axiosClient.get(url);
  },
  getFollowerAndFollowingByAccountId: (accountId) => {
    const url = `/odata/AccountProfile/Follow?AccountId=${accountId}`;
    return axiosClient.get(url);
  },
};
