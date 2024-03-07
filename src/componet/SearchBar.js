import React from "react";
import { Button, Form } from "react-bootstrap";
// import { useDispatch } from 'react-redux'
// import { FiltersActions } from '../actions/FiltersActions';

export const SearchBar = ({ setSearchTerm,searchInput, setSearchInput }) => {
  // const dispatch=useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    //     dispatch(FiltersActions({search,selectedDepartment}))
    //       .then((response) => {
    //          console.log(response)
    //         if (response.status === 200) {
    //         //   console.log("Registration success");
    //           setData(response)

    //           alert("register success")
    //         }

    //       })
    //       .catch((error) => {
    //         alert(error.response.data.message);
    //       })

    //   };
    //   console.log(data,'dfrr')

    setSearchTerm(searchInput);
   
  };

  return (
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
  );
};
