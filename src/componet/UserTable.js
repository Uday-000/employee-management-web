import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import IconButton from "@mui/material/IconButton";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { ImageAction } from "../actions/ImageActions";

const UserTable = ({
  data,
  handleSortAscending,
  deleteUser,
  handleShow,
  setid,
  selectedDepartment,
  setRefresh,
  userDetails,
  setUserDetails,
}) => {
  const formData = new FormData();

  const dispatch = useDispatch();
  const Image = (ItemId) => {
    dispatch(ImageAction({ ItemId, formData }))
      .then((response) => {
        if (response && response.status === 200) {
          setRefresh(true);
          alert("Profile updated successfully");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleAddImage = (ItemId) => {
    const fileInput = document.getElementById(`fileInput-${ItemId}`);
    fileInput.click();
    console.log(ItemId);
  };

  const uploadImage = (e, Item) => {
    formData.append("file", e.target.files[0]);
    console.log(formData);
    Image(Item);
  };

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
                {item.image == null ? (
                  <td>
                    <IconButton
                      variant="light"
                      style={{ borderRadius: "50px" }}
                      onClick={() => handleAddImage(item.userId)}
                    >
                      <MonochromePhotosIcon />
                    </IconButton>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id={`fileInput-${item.userId}`}
                      onChange={(e) => uploadImage(e, item.userId)}
                    ></input>
                  </td>
                ) : (
                  <td>
                    <IconButton onClick={() => handleAddImage(item.userId)}>
                      <td>
                        {" "}
                        <img
                          style={{ width: "40px" }}
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt=""
                        />{" "}
                      </td>
                    </IconButton>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id={`fileInput-${item.userId}`}
                      onChange={(e) => uploadImage(e, item.userId)}
                    ></input>
                  </td>
                )}
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
                    onClick={() => handleShow(item)}
                  >
                    ✏️ {/* Refresh Emoji */}
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
