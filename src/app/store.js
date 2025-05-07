import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userSlice from "../features/userSlice";
import activePostReducer from "../app/ActivePost/slice";
import commentPostReducer from "../app/CommentPost/slice";
import addCommentPostReducer from "../app/AddComment/slice";
import packageRegisterReducer from "../app/PackageRegister/slice";
import listFollowReducer from "../app/ListFollow/slice";
import postReducer from "../features/postSlice";
import likePostReducer from "../app/LikePost/slice";
import followFriendReducer from "../app/Button/slice";
import MyPostSliceReducer from "../app/MyPost/slice";
import accountReducer from "../app/Account/slice";
import momoPaymentReducer from "../app/MomoPay/slice";
import zaloPaymentReducer from "../app/ZaloPay/slice";
import updatePaymentReducer from "../app/UpdatePayment/slice";
import saveReducer from "../app/SavePost/slice";
import listSaveReducer from "../app/ListSave/slice";
import deleteCommentReducer from "../app/DeleteComment/slice";
import hiddenPostReducer from "../app/HidePosts/slice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
  reducer: {
    post: postReducer,
    user: userSlice,
    activePost: activePostReducer,
    commnentPost: commentPostReducer,
    addCommentPost: addCommentPostReducer,
    packageRegister: packageRegisterReducer,
    followFriend: followFriendReducer,
    fetchMyPost: MyPostSliceReducer,
    listFollow: listFollowReducer,
    likePost: likePostReducer,
    account: accountReducer,
    fetchMomoPay: momoPaymentReducer,
    fetchZaloPay: zaloPaymentReducer,
    updatePayment: updatePaymentReducer,
    save: saveReducer,
    listSave: listSaveReducer,
    deleteComment: deleteCommentReducer,
    hiddenPost: hiddenPostReducer,
  },
});
