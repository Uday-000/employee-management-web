import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./../../styles/TicketModal.css";
import axios from "axios";

function TicketModal({
  show,
  handleClose,
  ticket,
  handleSubmit,
  selectedDepartment,
}) {
  const [ticketDetails, setTicketDetails] = useState({
    status: "",
    updatedBy: "",
    updatedDate: "",
    assignedTo: "",
  });

  const [comment, setComment] = useState({
    comment: "",
    commentDate: "",
  });

  const [userNames, setUserNames] = useState([]);

  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (ticket) {
      setTicketDetails({
        status: ticket.status,
        updatedBy: ticket.updatedBy,
        updatedDate: ticket.updatedDate,
        assignedTo: ticket.assignedTo,
      });
    }
  }, [ticket]);

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(
          `http://localhost:8080/getUserNames?departmentName=${selectedDepartment}`
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

  console.log("the status list", statusOptions);

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
      ...ticketDetails,
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
          <Form.Group controlId="formSubject" className="formField">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              Value={ticket ? ticket.subject : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="formField">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={ticket ? ticket.description : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formCreatedDate" className="formField">
            <Form.Label>Created Date</Form.Label>
            <Form.Control
              type="date"
              Value={ticket ? ticket.createdDate : ""}
              readOnly
            />
            </Form.Group>
            
            <Form.Group controlId="formStatus" className="formField">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={ticketDetails.status}
              onChange={handleChange}
            >
              <option value={ticketDetails.status}>{ticketDetails.status}</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAssignedTo" className="formField">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              as="select"
              name="assignedTo"
              value={ticketDetails.assignedTo}
              onChange={handleChange}
            >
              <option value={ticketDetails.assignedTo}> {ticketDetails.assignedTo}</option>

              {userNames.map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formUpdatedBy" className="formField">
            <Form.Label>Updated By</Form.Label>
            <Form.Control
              type="text"
              name="updatedBy"
              value={ticketDetails.updatedBy}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUpdatedDate" className="formField">
            <Form.Label>Updated Date</Form.Label>
            <Form.Control
              type="date"
              name="updatedDate"
              value={ticketDetails.updatedDate}
              onChange={handleChange}
            />
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
                      <td>{comment.commentDate}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>

          <Form.Group controlId="formComments" className="formField">
            <Form.Label>Add Comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              value={comment.comment}
              onChange={handleCommentChange}
            />
            {/* <Button onClick={handleAddComment}>Add Comment</Button> */}
          </Form.Group>

          <Form.Group controlId="formCommentDate" className="formField">
            <Form.Label>Commented Date</Form.Label>
            <Form.Control
              type="date"
              name="commentDate"
              value={comment.commentDate}
              onChange={handleCommentChange}
            />
          </Form.Group>

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
