import { atom } from "recoil";

export const AdminLoginFormData = atom({
  key: "AdminLoginFormData",
  default: {
    email: "",
    password: "",
  },
});
