// components/StarRating.jsx
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const StarRating = ({ value, onChange, readOnly }) => {
  return (
    <div className="pt-1">
      <Rating
        style={{ maxWidth: 120 }}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default StarRating;
