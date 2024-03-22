import { useRecoilState } from "recoil";
import { FormData } from "../store/atom/ServicesFormData";
import "../App.css";
import { FormInServices } from "./FormInServices";
export default function Services() {
  return (
    <div>
      <FormInServices />
    </div>
  );
}
