import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
const initialState = {
  sanPhamYeuThich: [],
  loading: true,
  loadingOrder: true,
  gioHang: [],
  cacDonDatHang: [],
  user: null,
  isAuthenticated: false,
  errorCart: null,
  orderId: null,
};

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const response = await axios.get(
    `${API_URL}/api/v1/khach-hang/${localStorage.getItem("userId")}`
  );
  const data = response.data;
  return data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  const response = await axios.post(`${API_URL}/api/v1/khach-hang/login`, user);
  const data = response.data;
  return data;
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user) => {
    const response = await axios.post(
      `${API_URL}/api/v1/khach-hang/register`,
      user
    );
    const data = response.data;
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userUpdate) => {
    const response = await axios.put(
      `${API_URL}/api/v1/khach-hang/${localStorage.getItem("userId")}`,
      userUpdate
    );
    const data = response.data;
    return data;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (passwordState) => {
    const response = await axios.put(
      `${API_URL}/api/v1/khach-hang/${localStorage.getItem(
        "userId"
      )}/change-password`,
      passwordState
    );
    const data = response.data;
    return data;
  }
);

export const removeFromFavourite = createAsyncThunk(
  "user/removeFromFavourite",
  async (request) => {
    const response = await axios.delete(
      `${API_URL}/api/v1/khach-hang/${request.userId}/yeu-thich/${request.pid}`
    );
    const data = response.data;
    return { data, pid: request.pid };
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removeFromCart",
  async (request) => {
    await axios.delete(
      `${API_URL}/api/v1/khach-hang/${request.userId}/gio-hang/${request.pid}`
    );
    return { pid: request.pid };
  }
);

export const addToFavourite = createAsyncThunk(
  "user/addToFavourite",
  async (request) => {
    const response = await axios.put(
      `${API_URL}/api/v1/khach-hang/${request.userId}/yeu-thich/${request.product.maSp}`
    );
    const data = response.data;
    return { data, product: request.product };
  }
);

export const addToCart = createAsyncThunk("user/addToCart", async (request) => {
  const response = await axios.post(
    `${API_URL}/api/v1/khach-hang/${request.userId}/gio-hang/${request.product.maSp}`,
    {
      soLuong: request.soLuong ? request.soLuong : 1,
    }
  );
  const data = response.data;
  return { data, product: request.product, soLuong: request.soLuong };
});

//ma gh, ma sp, so luong
export const updateQuantityInCart = createAsyncThunk(
  "user/updateQuantityInCart",
  async (request) => {
    const response = await axios.put(
      `${API_URL}/api/v1/khach-hang/${request.cartId}/gio-hang/${request.product.maSp}`,
      {
        soLuong: request.soLuong,
      }
    );
    const data = response.data;
    return {
      data,
      product: request.product,
      soLuong: request.soLuong,
      cartId: request.cartId,
    };
  }
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (request) => {
    const response = await axios.post(`${API_URL}/api/v1/don-dat-hang`, {
      maKH: request.maKH,
      hoTen: request.hoTen,
      noiNhan: request.noiNhan,
      soDt: request.soDt,
      tongTien: request.tongTien,
      email: request.email,
      phuongThucThanhToan: request.phuongThucThanhToan,
      trangThai: "Ch??a x??? l??",
    });
    const data = response.data;
    return data;
  }
);

export const addProductToOrder = createAsyncThunk(
  "user/addProductToOrder",
  async (request) => {
    const response = await axios.post(
      `${API_URL}/api/v1/chi-tiet-don-hang/${request.maSp}`,
      {
        maDDH: request.maDDH,
        soLuong: request.soLuong,
      }
    );
    const data = response.data;
    return { data, product: request.product, soLuong: request.soLuong };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    addCart: (state, action) => {
      state.carts.push(action.payload);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("userId");
    },
  },
  extraReducers: {
    [loadUser.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [loadUser.fulfilled]: (state, action) => {
      const { payload } = action;
      state = {
        ...state,
        user: {
          diaChi: payload.diaChi,
          email: payload.email,
          username: payload.username,
          soDt: payload.soDt,
          hoTen: payload.hoTen,
          maKh: payload.maKh,
          vaiTro: payload.vaiTro,
        },
        isAuthenticated: payload ? true : false,
        cacDonDatHang: payload.cacDonDatHang,
        sanPhamYeuThich: payload.sanPhamYeuThich,
        gioHang: payload.gioHang,
        loading: false,
      };
      return { ...state };
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      return state;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { payload } = action;
      state = {
        ...state,
        user: {
          diaChi: payload.diaChi,
          email: payload.email,
          username: payload.username,
          soDt: payload.soDt,
          hoTen: payload.hoTen,
          maKh: payload.maKh,
          ngayTao: payload.ngayTao,
          vaiTro: payload.vaiTro,
        },
        isAuthenticated: true,
        cacDonDatHang: payload.cacDonDatHang,
        sanPhamYeuThich: payload.sanPhamYeuThich,
        gioHang: payload.gioHang,
      };
      localStorage.setItem("userId", payload.maKh);
      state.loading = false;
      return state;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      toast.error("Sai t??n ????ng nh???p ho???c m???t kh???u");
      // alert("Th??ng tin kh??ch h??ng sai");
      return state;
    },

    [registerUser.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { payload } = action;
      state = {
        ...state,
        user: {
          diaChi: payload.diaChi,
          email: payload.email,
          username: payload.username,
          soDt: payload.soDt,
          hoTen: payload.hoTen,
          maKh: payload.maKh,
          ngayTao: payload.ngayTao,
          vaiTro: payload.vaiTro,
        },
        isAuthenticated: true,
        cacDonDatHang: payload.cacDonDatHang,
        sanPhamYeuThich: payload.sanPhamYeuThich,
        gioHang: payload.gioHang,
      };
      localStorage.setItem("userId", payload.maKh);
      state.loading = false;
      return state;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      toast.error("T??n ????ng nh???p ???? t???n t???i");
      return state;
    },
    [changePassword.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success("?????i password th??nh c??ng, m???i ????ng nh???p l???i");
      //logout
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("userId");
      return state;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      toast.error("Th??ng tin m???t kh???u sai");
      return state;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [updateUser.fulfilled]: (state, action) => {
      const { payload } = action;
      state = {
        ...state,
        loading: false,
        user: {
          diaChi: payload.diaChi,
          email: payload.email,
          soDt: payload.soDt,
          hoTen: payload.hoTen,
          maKh: payload.maKh,
          username: payload.username,
          password: payload.password,
          vaiTro: payload.vaiTro,
        },
      };
      toast.success("C???p nh???t th??ng tin th??nh c??ng");
      return state;
    },

    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      return state;
    },
    [removeFromFavourite.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [removeFromFavourite.fulfilled]: (state, action) => {
      const { pid } = action.payload;
      state.loading = false;
      state.sanPhamYeuThich = state.sanPhamYeuThich.filter(
        (item) => item.maSp !== pid
      );
      toast.success("X??a s???n ph???m y??u th??ch th??nh c??ng");
      return state;
    },
    [removeFromFavourite.rejected]: (state, action) => {
      state.loading = false;
      return state;
    },
    [addToFavourite.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [addToFavourite.fulfilled]: (state, action) => {
      const { product } = action.payload;
      state.loading = false;
      state.sanPhamYeuThich.push(product);
      toast.success("Th??m v??o m???c y??u th??ch th??nh c??ng");
      return state;
    },
    [addToFavourite.rejected]: (state, action) => {
      state.loading = false;
      toast.warning("S???n ph???m ???? c?? trong m???c y??u th??ch");

      return state;
    },
    [addToCart.pending]: (state, action) => {
      state.loading = false;
      return state;
    },
    [addToCart.fulfilled]: (state, action) => {
      const { product, soLuong } = action.payload;
      state.loading = false;
      state.gioHang.chiTietGioHang.push({
        sanPham: product,
        soLuong: soLuong ? soLuong : 1,
      });
      toast.success("Th??m v??o gi??? h??ng th??nh c??ng");
      return state;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      toast.warning("S???n ph???m ???? c?? trong gi??? h??ng");
      return state;
    },
    [removeFromCart.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      const { pid } = action.payload;
      state.loading = false;
      state.gioHang.chiTietGioHang = state.gioHang.chiTietGioHang.filter(
        (item) => item.sanPham.maSp !== pid
      );
      // toast.success("X??a s???n ph???m kh???i gi??? h??ng th??nh c??ng");
      // alert("X??a s???n ph???m kh???i gi??? h??ng th??nh c??ng");
      return state;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.loading = false;
      toast.error("S???n ph???m kh??ng c?? trong gi??? h??ng");
      return state;
    },
    [updateQuantityInCart.pending]: (state, action) => {
      state.loading = false;
      return state;
    },
    [updateQuantityInCart.fulfilled]: (state, action) => {
      const { product, soLuong } = action.payload;
      state.loading = false;
      state.gioHang.chiTietGioHang = state.gioHang.chiTietGioHang.map(
        (item) => {
          if (item.sanPham.maSp === product.maSp) {
            item.soLuong = soLuong;
          }
          return item;
        }
      );
      return state;
    },
    [updateQuantityInCart.rejected]: (state, action) => {
      state.loading = false;
      return state;
    },
    [createOrder.pending]: (state, action) => {
      state.loadingOrder = true;
      return state;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.cacDonDatHang.push(action.payload);
      state.orderId = action.payload.maDDH;
      return state;
    },
    [createOrder.rejected]: (state, action) => {
      state.loadingOrder = false;
      toast.error("?????t h??ng th???t b???i");
      return state;
    },
    [addProductToOrder.pending]: (state, action) => {
      state.loadingOrder = true;
      return state;
    },
    [addProductToOrder.fulfilled]: (state, action) => {
      const { data, product, soLuong } = action.payload;
      state.loadingOrder = false;
      state.cacDonDatHang = state.cacDonDatHang.map((item) => {
        if (item.maDonHang === data.maDonHang) {
          item.chiTietDonHang.push({
            sanPham: product,
            soLuong: soLuong,
          });
        }
        return item;
      });
      return state;
    },
    [addProductToOrder.rejected]: (state, action) => {
      state.loadingOrder = false;
      return state;
    },
  },
});

export const { addFavourite, addCart, logOut } = userSlice.actions;
export default userSlice.reducer;
