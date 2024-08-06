import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useAsyncEffect from 'use-async-effect';
import '../App.css';
import { AdminMarkedInfoAtom } from '../store/atom/AdminMarkedInfoAtom';
import { config } from './configUrl';
const URL = config.url;

function useDebounce(searchFilter, dTime) {
  const [value, setValue] = useState(searchFilter);
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(searchFilter);
    }, dTime);
    return () => {
      clearTimeout(handler);
    };
  }, [dTime, searchFilter]);
  return value;
}
export default function AdminSideMarkedInfo() {
  const [showAllDb, setShowAllDb] = useRecoilState(AdminMarkedInfoAtom);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchFilter, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/admin/markedInfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setShowAllDb(response.data);
      } catch (error) {
        navigate('/admin');
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setShowAllDb, fetchTrigger]);
  useEffect(() => {
    setFetchTrigger((prev) => !prev);
  }, []);
  useAsyncEffect(async () => {
    try {
      const res = await axios.get(
        `${URL}/admin/getMarkedInfo?filter=` + debouncedValue,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setShowAllDb(res.data.queries);
    } catch (error) {
      alert('Some Error in Searching Data');
      navigate('/admin/markedInfo');
    }
  }, [debouncedValue]);
  return (
    <div>
      <h1>Admin Side Home</h1>

      <div>
        <div className="PendingQTable">
          <h2
            id="PendingQueries"
            className="allQueries"
            onClick={() => navigate('/admin/info')}
          >
            Go Back to Pending Queries
          </h2>

          <div>
            <input
              type="text"
              name="searchTag"
              placeholder="Search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          {/* <p
            className="allQueries"
            onClick={() => navigate("/admin/markedInfo")}
          >
            Show All Queries
          </p> */}
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
            {Array.isArray(showAllDb) &&
              showAllDb.map((item, index) => (
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
                      defaultChecked={item.markAsDone}
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
