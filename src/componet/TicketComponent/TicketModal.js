import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "./../../styles/TicketModal.css";
import axios from "axios";
import { useSelector } from "react-redux";

function TicketModal({
  show,
  handleClose,
  ticket,
  handleSubmit,
  selectedDepartment,
}) {
  const [ticketDetails, setTicketDetails] = useState({
    status: "",
    assignedTo: "",
    createdDate: "",
    updatedDate: "",
  });

  const [comment, setComment] = useState({
    comment: "",
  });

  const [userNames, setUserNames] = useState([]);

  const [assignedToUsername, setAssignedToUsername] = useState("");

  const [statusOptions, setStatusOptions] = useState([]);

  const userDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (ticket) {
      //   const assignedUser = userNames.find(
      //     (user) => user.userId === ticket.assignedTo

      setTicketDetails({
        status: ticket.status,
        updatedBy: ticket.updatedBy,
        updatedDate: formatDate(ticket.updatedDate),
        assignedTo: ticket.assignedTo,
        // assignedTo:assignedUser.userName,
        createdDate: formatDate(ticket.createdDate),
      });
    }
  }, [ticket, userNames]);

  const formatDate = (datetime) => {
    return datetime ? new Date(datetime).toLocaleString() : "";
  };

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(
          `http://localhost:8080/getUserByDepartment?departmentName=${selectedDepartment}`
        )
        .then((response) => {
          if (response.status === 200) {
            setUserNames(response.data);
          }
        })
        .catch((error) => {
          alert("error");
        });
    }
  }, [selectedDepartment]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/status`)
      .then((response) => {
        setStatusOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching status options:", error);
      });
  }, []);

  // console.log("the status list", statusOptions);

  useEffect(() => {
    if (ticketDetails.assignedTo && userNames.length > 0) {
      const assignedUser = userNames.find(
        (user) => user.userId === ticketDetails.assignedTo
      );
      if (assignedUser) {
        setAssignedToUsername(assignedUser.userName);
      }
    }
  }, [ticketDetails.assignedTo, userNames]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({
      ...ticketDetails,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    let data;
    data = {
      status: ticketDetails.status,
      assignedTo: ticketDetails.assignedTo,
      commentsDtos: [comment],
    };
    if (data) {
      handleSubmit(data);
    } else {
      alert("data can't be null");
    }
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    const updatedComment = { ...comment, [name]: value };
    setComment(updatedComment);
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Update Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitForm}>
          <Form.Group as={Row} controlId="formSubject" className="formField">
            <Form.Label column sm="3">
              Subject
            </Form.Label>

            <Col>
              <Form.Control
                type="text"
                Value={ticket ? ticket.subject : ""}
                readOnly
                className="input-box"
                sm="9"
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formDescription"
            as={Row}
            className="formField"
          >
            <Form.Label column sm="3">
              Description
            </Form.Label>
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                value={ticket ? ticket.description : ""}
                readOnly
                sm="9"
              />
            </Col>
          </Form.Group>
          <Form.Group
            controlId="formCreatedDate"
            as={Row}
            className="formField"
          >
            <Form.Label column sm="3">
              Created Date
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={ticketDetails.updatedDate}
                readOnly
                sm="9"
              />
            </Col>
          </Form.Group>

          <Form.Group controlId="formStatus" as={Row} className="formField">
            <Form.Label column sm="3">
              Status
            </Form.Label>
            <Col>
              <Form.Control
                as="select"
                name="status"
                value={ticketDetails.status}
                onChange={handleChange}
                sm="9"
              >
                <option value={ticketDetails.status}>
                  {ticketDetails.status}
                </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId="formAssignedTo" as={Row} className="formField">
            <Form.Label column sm="3">
              Assigned To
            </Form.Label>
            <Col>
            {userDetails.role === "admin" ? (
              <Form.Control
                as="select"
                name="assignedTo"
                value={ticketDetails.assignedTo}
                onChange={handleChange}
                sm="9"
              >
                <option value={assignedToUsername}>
                  {""}
                  Select Option
                </option>
                {userNames.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </Form.Control>
            ):(
              <Form.Control
                  type="text"
                  value={assignedToUsername}
                  readOnly
                  sm="9"
                />
              )}

            </Col>
          </Form.Group>

          <Form.Group controlId="formUpdatedBy" as={Row} className="formField">
            <Form.Label column sm="3">
              Updated By
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                name="updatedBy"
                value={ticketDetails.updatedBy}
                readOnly
                sm="9"
                // onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            controlId="formUpdatedDate"
            as={Row}
            className="formField"
          >
            <Form.Label column sm="3">
              Updated Date
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={ticketDetails.updatedDate}
                readOnly
                sm="9"
              />
            </Col>
          </Form.Group>

          <Table striped bordered className="formField">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-scrollable">
              {ticket &&
                ticket.commentsDtos
                  .slice()
                  .sort(
                    (a, b) => new Date(b.commentDate) - new Date(a.commentDate)
                  )
                  .map((comment, index) => (
                    <tr key={index}>
                      <td>{comment.comment}</td>
                      <td>
                        {new Date(comment.commentDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>

          <Form.Group as={Row} controlId="formComments" className="formField">
            <Form.Label column sm="3">
              Add Comment
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                name="comment"
                value={comment.comment}
                onChange={handleCommentChange}
                sm="9"
              />
            </Col>
          </Form.Group>

          {/* <Form.Group controlId="formCommentDate" className="formField">
            <Form.Label>Commented Date</Form.Label>
            <Form.Control
              type="date"
              name="commentDate"
              value={comment.commentDate}
              onChange={handleCommentChange}
            />
          </Form.Group> */}

          {/* Add other form fields */}
          {ticket && (
            <Button variant="primary" type="submit">
              Update
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TicketModal;
