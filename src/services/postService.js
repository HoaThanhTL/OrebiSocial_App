import axiosClient from "./axiosClient";

export const postService = {
  createnewpost: ({ Content, Image, Hashtags }) => {
    const formData = new FormData();

    formData.append("Content", Content);
    formData.append("Image", Image);
    Hashtags.forEach((hashtag) => {
      formData.append("Hashtags", hashtag);
    });

    const url = "/odata/Post/AddNewPost";
    return axiosClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updatePost: ({ key, Content, Image, Hashtags }) => {
    const formData = new FormData();

    formData.append("Content", Content);
    formData.append("Image", Image);
    Hashtags.forEach((hashtag) => {
      formData.append("Hashtags", hashtag);
    });

    const url = `/Post/${key}/UpdatePost`;
    return axiosClient.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getDetailHashtag: () => {
    const url = `/odata/Hashtags/GetHashTag`;
    return axiosClient.get(url);
  },
  getHashtagById: (key) => {
    const url = `/odata/Hashtags/${key}/GetHashtagById`;
    return axiosClient.get(url);
  },

  searchPostByHashtag: (hashtag) => {
    const url = `/odata/HashTags/SearchByHashTagName?hashtag=${hashtag}`;
    return axiosClient.get(url);
  },
};
