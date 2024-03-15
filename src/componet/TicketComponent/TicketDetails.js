import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import './../../styles/TicketDetails.css'

function TicketDetails({ selectedDepartment }) {
  const userDetails = useSelector((state) => state.user.userDetails);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (userDetails.role === "admin") {
      axios
        .get(
          `http://localhost:8080/getTicketsByAdmin?departmentName=${selectedDepartment}`
        )
        .then((response) => {
          setTickets(response.data);
          console.log(response.data);
        })

        .catch((error) => {
          alert("Error fetching tickets for admin");
        });
    } else if (userDetails.role === "user") {
      axios
        .get(
          `http://localhost:8080/getTicketByUser/${userDetails.userId}?departmentName=${selectedDepartment}`
        )
        .then((response) => {
          setTickets(response.data);
          console.log(response.data);
        })

        .catch((error) => {
          alert("Error fetching tickets for user");
        });
    }
  }, [selectedDepartment, userDetails]);

  return (
    <div>
      <div className="ticketButton">
        <Button>craete ticket</Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th> Ticket ID </th>
            <th> Subject </th>
            <th>Description</th>
            <th> Created Date </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td> {ticket.tickedId}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TicketDetails;
