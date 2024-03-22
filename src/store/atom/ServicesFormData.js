import { atom } from "recoil";

export const FormData = atom({
  key: "FormData",
  default: {
    name: "",
    address: "",
    contactNumber: "",
    Apt: "",
    email: "",
    problem: "",
  },
});
