import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AdminMarkedInfoAtom } from "../store/atom/AdminMarkedInfoAtom";
import "../App.css";

export default function AdminSideMarkedInfo() {
  const [showAllDb, setShowAllDb] = useRecoilState(AdminMarkedInfoAtom);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Admin Side Home</h1>

      <div>
        <div className="Table-top">
          <h2
            id="PendingQueries"
            className="allQueries"
            onClick={() => navigate("/admin/info")}
          >
            Go Back to Pending Queries
          </h2>
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
