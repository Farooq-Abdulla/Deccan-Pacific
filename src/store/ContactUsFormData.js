import { atom } from "recoil";

export const ContactUsFormData = atom({
  key: "ContactUsFormData",
  default: {
    name: "",
    email: "",
    subject: "",
    description: "",
  },
});
