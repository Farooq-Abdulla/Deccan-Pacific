import axios from "axios";
import { atom, selector } from "recoil";

export const SQDbAtom = atom({
  key: "SQDbAtom",
  // default: selector({
  //   key: "SQDbAtomSelector",
  //   get: async () => {
  //     const res = await axios.get("http://localhost:8000/admin/info", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     return res.data;
  //   },
  // }),
  default: [],
});
