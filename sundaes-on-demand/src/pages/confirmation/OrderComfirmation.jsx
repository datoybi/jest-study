import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  const newOrderButton = (
    <Button className="w-25 mx-auto" type="submit" onClick={handleClick}>
      Create new order
    </Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <Container
        className="d-flex mt-5 d-flex text-center"
        style={{ flexDirection: "column" }}
      >
        <h1>Thank you!</h1>
        <h2 className="mt-5">Your order number is {orderNumber}</h2>
        <p>as per your terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
}
