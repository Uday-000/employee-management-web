import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTicketDetails } from "../../actions/ticketAction";

import "./../../styles/TicketDetails.css";
import TicketModal from "./TicketModal";

function TicketDetails({
  selectedDepartment,
  setSearchTerm,
  setSearchInput,
  searchInput,
  searchTerm,
  setRefresh,
  refresh,
}) {
  const userDetails = useSelector((state) => state.user.userDetails);

  // console.log(userDetails)

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (datetime) => {
    return datetime ? new Date(datetime).toLocaleString() : "";
  };

  const handleTableRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  const handleFormSubmit = (newTicketDetails) => {
    // console.log(newTicketDetails);
    let url = `http://localhost:8080/updateIncident/${selectedTicket.incidentId}?updatedBy=${userDetails.role}`;

    axios
      .put(url, newTicketDetails)
      .then((response) => {
        if (response.status === 200) {
          alert("updated successfully");
          setRefresh(true);
        }
      })
      .catch((error) => {
        // console.log(error)
        alert("error");
      });

    setShowModal(false);
    setSelectedTicket(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const dispatch = useDispatch();

  const assignedTo = userDetails.userId;
  // console.log(assignedTo);
  // const departmentName = userDetails.departmentDto.departmentName;
  // console.log(departmentName);

  useEffect(() => {
    if (selectedDepartment.length > 0) {
      let url;
      if (userDetails.role === "admin") {
        url = `http://localhost:8080/getTicketsByAdmin?departmentName=${selectedDepartment}&searchDescription=${searchTerm}`;
      } else if (userDetails.role === "user") {
        if (
          userDetails.departmentDto.departmentName === selectedDepartment &&
          userDetails.userId === assignedTo
        ) {
          url = `http://localhost:8080/getInicentsByAssignedTo?assignedTo=${assignedTo}&departmentName=${selectedDepartment}&searchTerm=${searchTerm}`;
        } else {
          url = `http://localhost:8080/getTicketByUser/${userDetails.userId}?departmentName=${selectedDepartment}&searchDescription=${searchTerm}`;
        }
      }
      axios
        .get(url)
        .then((response) => {
          setTickets(response.data);
          dispatch(setTicketDetails(response.data));
        })
        .catch((error) => {
          alert("Error fetching tickets: " + error);
        });
    }
  }, [selectedDepartment, userDetails, searchTerm, dispatch, assignedTo]);

  const handleSortAscending = (sortOrder, sortBy) => {
    let url;
    if (userDetails.role === "admin") {
      url = `http://localhost:8080/sortTickets?sortOrder=${sortOrder}&sortBy=${sortBy}&departmentName=${selectedDepartment}`;
    } else if (userDetails.role === "user") {
      url = `http://localhost:8080/sortTickets?sortOrder=${sortOrder}&sortBy=${sortBy}&userId=${userDetails.userId}&departmentName=${selectedDepartment}`;
    }
    axios
      .get(url)
      .then((response) => {
        setTickets(response.data);
        dispatch(setTicketDetails(response.data));
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <div>
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            name="name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              width: "500px",
            }}
          />
          <Button variant="info" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="ticketButton">
        <Button>create ticket</Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              <Row lg={12}>
                <Col lg={9}>
                  <center style={{width:"3px"}} >TicketId</center>
                </Col>
                <Col lg={3}>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("asc", "incidentId");
                      }}
                    >
                      ▲
                    </button>
                  </Row>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("desc", "incidentId");
                      }}
                    >
                      ▼
                    </button>{" "}
                  </Row>
                </Col>
              </Row>
            </th>

            <th>
              <Row lg={12}>
                <Col lg={9}>
                  <center>Subject</center>
                </Col>
                <Col lg={3}>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("asc", "subject");
                      }}
                    >
                      ▲
                    </button>
                  </Row>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("desc", "subject");
                      }}
                    >
                      ▼
                    </button>{" "}
                  </Row>
                </Col>
              </Row>
            </th>

            <th>Description</th>
            <th> updated Date </th>
            <th> Status </th>
            <th>Comment</th>
            {/* <th> Comments </th> */}
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.incidenttId}
              onClick={() => handleTableRowClick(ticket)}
            >
              <td>{ticket.incidentId}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{formatDate(ticket.updatedDate)}</td>
              <td>{ticket.status}</td>
              <td>{ticket.commentsDtos.length > 0 ? ticket.commentsDtos[0].comment : ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TicketModal
        show={showModal}
        handleClose={handleModalClose}
        ticket={selectedTicket}
        handleSubmit={handleFormSubmit}
        selectedDepartment={selectedDepartment}
      />
    </div>
  );
}

export default TicketDetails;
