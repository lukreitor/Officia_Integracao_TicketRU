import { Spinner } from "react-bootstrap";

const SpinnerComponent = ({ color }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
      }}
    >
      <Spinner animation="border" role="status" variant={color}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
