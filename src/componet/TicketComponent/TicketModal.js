import { debounce } from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function TicketModal({ show, handleClose, ticket, handleSubmit }) {
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
    status : ticketDetails.status,
    updatedBy : ticketDetails.updatedBy,
    updatedDate : ticketDetails.updatedDate,
    assignedTo : ticketDetails.assignedTo,
    commentsDtos :[ comment]
    }
    if(data){
        handleSubmit(data)
    }else{
        alert("data can't be null")
    }
    
  };

 
//   const handleCommentChange = (event) => {
//     const { name, value } = event.target;
//     setComment(prevComments => ({
//         ...prevComments,
//         [name]: value,
//       }));
//   };

// const debouncedHandleCommentChange = debounce((updatedComment) => {
//     setComment(updatedComment);
//   }, 300); // Adjust debounce delay as needed

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    const updatedComment = { ...comment, [name]: value };
    setComment(updatedComment)
    // debouncedHandleCommentChange(updatedComment); // Call debounced function
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitForm}>
          <Form.Group controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              Value={ticket ? ticket.subject : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={ticket ? ticket.description : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formCreatedDate">
            <Form.Label>Created Date</Form.Label>
            <Form.Control
              type="date"
              Value={ticket ? ticket.createdDate : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
            //   value={ticket ? ticket.status : ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAssignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUpdatedBy">
            <Form.Label>Updated By</Form.Label>
            <Form.Control
              type="text"
              name="updatedBy"
            //   value={ticket.updatedBy}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formUpdatedDate">
            <Form.Label>Updated Date</Form.Label>
            <Form.Control
              type="date"
              name="updatedDate"
            //   value={ticket.updatedDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              onChange={handleCommentChange}
            />
            {/* <Button onClick={handleAddComment}>Add Comment</Button> */}
          </Form.Group>


          <Form.Group controlId="formCommentDate">
            <Form.Label>Commented Date</Form.Label>
            <Form.Control
              type="date"
              name="commentDate"
            //   value={ticket.updatedDate}
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
