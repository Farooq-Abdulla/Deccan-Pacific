import { atom } from 'recoil';

export const AdminMarkedInfoAtom = atom({
  key: 'AdminMarkedInfoAtom',
  // default: selector({
  //   key: "AdminMarkedInfoAtomSelector",
  //   get: async () => {
  //     const res = await axios.get("http://localhost:8000/admin/markedInfo", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     return res.data;
  //   },
  // }),
  default: [],
});
