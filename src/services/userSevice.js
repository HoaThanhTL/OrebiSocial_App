import axiosClient from "./axiosClient";

export const userService = {
  login: ({ userName, passwordHash }) => {
    const url = "/odata/authentications/login";
    return axiosClient.post(url, { ...{ userName, passwordHash } });
  },
  loginGoogle: (googleToken) => {
    const url = "/google-sign-in";
    return axiosClient.post(url, { ...{ googleToken } });
  },
  getProfile: (key) => {
    const url = `/odata/Users/${key}/GetUserByAccountId`;
    return axiosClient.get(url);
  },
  updateProfile: async (key, City, Address, Height, Phone, Gender, Dob, Avatar) => {
    const formData = new FormData();

    formData.append("accountId", key);
    formData.append("City", City);
    formData.append("Address", Address);
    formData.append("Gender", Gender);
    formData.append("Phone", Phone);
    formData.append("Dob", Dob);
    formData.append("Height", Height);

    if (Avatar) {
      formData.append("Avatar", {
        uri: Avatar,
        name: "avatar.jpg",
        type: "image/jpg",
      });
    }

    const url = `/User/${key}/UpdateUser`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axiosClient.put(url, formData, config);
      return response.data;
    } catch (error) {

      throw error;
    }
  },
  resetPassword: (email) => {
    const url = `/odata/Accounts/ResetPassword?email=${email}`;
    return axiosClient.put(url);
  },

};
