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
}) {
  const userDetails = useSelector((state) => state.user.userDetails);

  const [tickets, setTickets] = useState([]);
  // const [searchInput, setSearchInput] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTableRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };
  
  console.log(selectedTicket)
  const handleFormSubmit = (newTicketDetails) => {
    console.log(newTicketDetails)
    let url = `http://localhost:8080/updateIncident/${selectedTicket.incidentId}`;


    axios.put(url, newTicketDetails).then((res) => {
      // console.log(res);
      if (res === 200) {
        alert("updated successfully");
      }
    })
    .catch((error)=>{
      // console.log(error)
      alert("error")
    })

    setShowModal(false);
    setSelectedTicket(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails.role === "admin") {
      axios
        .get(
          `http://localhost:8080/getTicketsByAdmin?departmentName=${selectedDepartment}&searchDescription=${searchTerm}`
        )
        .then((response) => {
          setTickets(response.data);
          dispatch(setTicketDetails(response.data));
          // console.log(response.data);
        })

        .catch((error) => {
          // console.log(error);
          alert("Error fetching tickets for admin", error);
        });
    } else if (userDetails.role === "user") {
      axios
        .get(
          `http://localhost:8080/getTicketByUser/${userDetails.userId}?departmentName=${selectedDepartment}&searchDescription=${searchTerm}`
        )
        .then((response) => {
          setTickets(response.data);
          dispatch(setTicketDetails(response.data));
          // console.log(response.data);
          // setSearchTerm("")
        })

        .catch((error) => {
          alert("Error fetching tickets for user", error);
        });
    }
  }, [selectedDepartment, userDetails, searchTerm, dispatch]);

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
        <Button>craete ticket</Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              <Row lg={12}>
                <Col lg={9}>
                  <center>Ticket Id</center>
                </Col>
                <Col lg={3}>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("asc", "tickedId");
                      }}
                    >
                      ▲
                    </button>
                  </Row>
                  <Row>
                    <button
                      id="upbutton"
                      onClick={() => {
                        handleSortAscending("desc", "tickedId");
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
            <th> Created Date </th>
            <th> Status </th>
            <th> Comments </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.incidenttId}
              onClick={() => handleTableRowClick(ticket)}
            >
              <td> {ticket.incidentId}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.createdDate}</td>
              <td>{ticket.status}</td>
              <td>{ticket.comments}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TicketModal
        show={showModal}
        handleClose={handleModalClose}
        ticket={selectedTicket}
        handleSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default TicketDetails;
