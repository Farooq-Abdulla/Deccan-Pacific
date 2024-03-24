import { useRecoilState, useRecoilValue } from "recoil";
import { SQDbAtom } from "../store/atom/SQDbAtom";
import { useCallback, useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminSideHome() {
  const [SQDbData, setSQDbData] = useRecoilState(SQDbAtom);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setSQDbData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setSQDbData, fetchTrigger]);

  // console.log(SQDbData);
  const checkBoxHandler = (e, index) => {
    setSQDbData((prevSQDbData) => {
      const newData = prevSQDbData.map((item, i) => {
        if (i === index) {
          // If this is the item to update, return a new object with markAsDone updated
          return { ...item, markAsDone: !item.markAsDone };
        }

        return item;
      });
      return newData; // Set the state to the new array
    });
  };

  // const RemoveDoneItems = useCallback(() => {
  //   setSQDbData((prevSQDbData) => {
  //     return prevSQDbData.filter((item) => item.markAsDone === false);
  //   });
  // }, [setSQDbData]);
  const RemoveDoneItems = async () => {
    try {
      const checkedItems = SQDbData.filter((item) => item.markAsDone);
      const res = await axios.post(
        "http://localhost:8000/admin/info/erase",
        { checkedItems },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSQDbData(res.data);
      setFetchTrigger((prev) => !prev);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Admin Side Home</h1>

      <div>
        <div className="Table-top">
          <h2>Pending Queries</h2>
          <p
            className="allQueries"
            onClick={() => navigate("/admin/markedInfo")}
          >
            Show All Queries
          </p>
          <p className="CheckedItemsButton" onClick={RemoveDoneItems}>
            Mark Checked Items As Done
          </p>
        </div>

        <table className="TableData">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Apt</th>
              <th>Email</th>
              <th>Date</th>
              <th>Problem</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(SQDbData) &&
              SQDbData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.Apt}</td>
                  <td>{item.email}</td>
                  <td>{item.date.toLocaleString()}</td>
                  <td>{item.problem}</td>
                  <td>
                    <input
                      type="checkbox"
                      name="markAsDone"
                      id="markAsDone"
                      checked={item.markAsDone}
                      // value={item.markAsDone}
                      onChange={(e) => checkBoxHandler(e, index)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
