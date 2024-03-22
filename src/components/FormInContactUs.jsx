import { useRecoilState } from "recoil";
import { ContactUsFormData } from "../store/ContactUsFormData";
import "../App.css";

export function FormInContactUs() {
  const [ContactUsForm, setContactUsFrom] = useRecoilState(ContactUsFormData);
  const handleInput = (e) => {
    setContactUsFrom({ ...ContactUsForm, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ContactUsForm);
  };
  return (
    <div className="formPage">
      <h2>Contact Us</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={ContactUsForm.name}
          onChange={handleInput}
          required
        />
        <br />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={ContactUsForm.email}
          onChange={handleInput}
          required
        />
        <br />
        <br />
        <label htmlFor="subject">Subject: </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={ContactUsForm.subject}
          onChange={handleInput}
          required
        />
        <br />
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={ContactUsForm.description}
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
  );
}
