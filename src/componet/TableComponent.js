import React from "react";
import { Button, Table } from "react-bootstrap";
function TableComponent({ userid, username, email }) {
  return (
    <div>
      <Table striped bordered hover id="mytab">
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <td>{userid}</td>
          <td>{username}</td>
          <td>{email}</td>

          <Button>Delete</Button>
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
