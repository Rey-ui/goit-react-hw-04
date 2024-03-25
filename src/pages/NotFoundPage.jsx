import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
const NotFoundPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <p>NotFoundPage</p>
    </div>
  );
};

export default NotFoundPage;
