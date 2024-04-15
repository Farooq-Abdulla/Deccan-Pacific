import { useRecoilState, useRecoilValue } from "recoil";
import { SQDbAtom } from "../store/atom/SQDbAtom";
import { useCallback, useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";

function useDebounce(searchFilter, dTime){
  const [value, setValue]=  useState(searchFilter);
  useEffect(()=>{
      const handler = setTimeout(()=>{
          setValue(searchFilter);
      }, dTime);
      return ()=>{
          clearTimeout(handler);
      }
  },[dTime, searchFilter]);
  return value;
}
export default function AdminSideHome() {
  const [SQDbData, setSQDbData] = useRecoilState(SQDbAtom);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [ searchFilter, setSearchFilter] = useState('');
  const navigate = useNavigate();

  

const debouncedValue= useDebounce(searchFilter,500);

  // useAsyncEffect(async()=>{
  //   try {
  //     const res= await axios.get("http://localhost:8000/admin/info", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
    
  //   // console.log("In Admin Side Home.jsx 2nd useEffect , trying to get token:", localStorage.getItem("token"));
  //   } catch (error) {
  //     navigate('/admin');
  //     // console.log("Error fetching data:", error);
      
  //   }

  // },[])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/info", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        // console.log("In Admin Side Home.jsx 1st useEffect , trying to get token:", localStorage.getItem("token"));

        const sortedData = response.data.info.sort(
          (a, b) => b.queryRank - a.queryRank
        );
        setSQDbData(sortedData);
        
      } catch (error) {
        navigate('/admin');
        // console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setSQDbData, fetchTrigger]);

  useAsyncEffect(async()=>{
    try {
      
      const res= await axios.get("http://localhost:8000/admin/getInfo?filter="+debouncedValue,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const sortedData = res.data.queries.sort(
        (a, b) => b.queryRank - a.queryRank
      );
      setSQDbData(sortedData);
    } catch (error) {
      alert("Some error in Searching Data");
      navigate("/admin/Info");
    }
  },[debouncedValue]);

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <div className="SearchDiv">
  <input className="SearchTag" type="text" name="searchTag" placeholder="Search" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
</div>


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
