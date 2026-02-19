export default function Vendors() {
  return (
    <div className="card">
      <h2>Vendors List</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No vendors added yet...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}