import { useRecoilState } from "recoil";
import { FormData } from "../store/atom/ServicesFormData";
import "../App.css";
export function FormInServices() {
  const [formData, setFormData] = useRecoilState(FormData);
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora numquam
        sequi similique culpa dignissimos, iure labore nulla eos alias explicabo
        veniam expedita! Labore sint blanditiis dicta, necessitatibus ipsum
        porro in. Impedit, dicta! Quaerat, necessitatibus dolorum quidem soluta
        at distinctio deleniti, explicabo, laboriosam amet officia labore
        perspiciatis accusantium officiis libero exercitationem itaque autem?
        Quibusdam possimus deserunt, blanditiis id excepturi rerum cumque. Esse
        nam, distinctio magnam laudantium sed quae velit unde repellat itaque
        sequi totam quia iure, nostrum illo ducimus eligendi quasi commodi natus
        delectus ipsa animi quisquam consequatur at harum. Consequatur.
        Cupiditate atque modi laboriosam sit nobis ipsa iure tempora dolores
        aliquam. Dolore nam, molestiae sint nemo consectetur aspernatur
        assumenda? Fugiat nemo aut fugit perferendis eos pariatur quo nesciunt,
        magni corporis.
      </p>
      <div className="formPage">
        <h2>Submit Your Request here:</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInput}
            required
          />
          <br />
          <br />
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInput}
            required
          />
          <br />
          <br />
          <label htmlFor="contactNumber">Contact Number :</label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleInput}
            required
          />
          <br />
          <br />
          <label htmlFor="Apt">Apt :</label>
          <input
            type="text"
            name="Apt"
            id="Apt"
            value={formData.Apt}
            onChange={handleInput}
            required
          />
          <br />
          <br />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
            required
          />
          <br />
          <br />
          <label htmlFor="problem">Problem :</label>
          <br />
          <textarea
            name="problem"
            value={formData.problem}
            id="problem"
            cols="30"
            rows="10"
            onChange={handleInput}
            required
          ></textarea>
          <br />
          <br />
          <button className="SubmitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
