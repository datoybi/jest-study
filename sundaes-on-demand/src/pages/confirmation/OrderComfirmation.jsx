import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

export default function OrderConfirmation({ setOrderPhase }) {
  return (
    <Container
      className="d-flex mt-5 d-flex text-center"
      style={{ flexDirection: "column" }}
    >
      <h1>Thank you!</h1>
      <h2 className="mt-5">Your order number is 1234567890</h2>
      <p>as per your terms and conditions, nothing will happen now</p>
      <Button
        className="w-25 mx-auto"
        type="submit"
        onClick={() => setOrderPhase("inProgress")}
      >
        Create new order
      </Button>
    </Container>
  );
}
