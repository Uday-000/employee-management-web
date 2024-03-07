import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const UserTable = ({
  data,
  handleSortAscending,
  deleteUser,
  handleShow,
  setid,
  setemail,
  setname,
  setpassword,
  setYourImageFile,
  selectedDepartment
}) => {
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              <Row lg={12}>
                <Col lg={9}>
                  <center>Id</center>
                </Col>
                <Col lg={3}>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("asc", "userId");
                      }}
                    >
                      ▲
                    </button>
                  </Row>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("desc", "userId");
                      }}
                    >
                      ▼
                    </button>{" "}
                  </Row>
                </Col>
              </Row>
            </th>
            <th>Image</th>
            <th>
              <Row lg={12}>
                <Col lg={9}>
                  <center>User Name</center>
                </Col>
                <Col lg={3}>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("asc", "userName");
                      }}
                    >
                      ▲
                    </button>
                  </Row>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("desc", "userName");
                      }}
                    >
                      ▼
                    </button>{" "}
                  </Row>
                </Col>
              </Row>
            </th>

            <th>
              <center>Email</center>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No users available in {selectedDepartment}
              </td>
            </tr>
          )}

          {data.map((item) => (
            <tr key={item.userId}>
              <td>{item.userId}</td>
              <td>
                {" "}
                <img
                  style={{ width: "40px" }}
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt=""
                />{" "}
              </td>
              <td>{item.userName}</td>
              <td>{item.email}</td>

              <td>
                <center>
                  <Button
                    className="btn btn-danger outline"
                    onClick={() => deleteUser(item.userId)}
                  >
                    🗑️ {/* Trash Can Emoji */}
                  </Button>
                </center>
              </td>
              <td>
                <center>
                  <Button
                    className="btn btn-warning outline"
                    onClick={() => {
                      setid(item.userId);
                      handleShow();
                      setemail(item.email);
                      setname(item.userName);
                      setpassword(item.password);
                      setYourImageFile(
                        <img
                          style={{ width: "40px" }}
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt=""
                        />
                      );
                    }}
                  >
                    🔄 {/* Refresh Emoji */}
                  </Button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
