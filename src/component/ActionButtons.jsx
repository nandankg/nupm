import React from "react";
import { Link } from "react-router-dom";

const ActionButtons = ({ item, user, slug, handleSave }) => {
  return (
    <div className="d-flex gap-3 m-3 justify-content-end">
      {(item.status === "0" || user?.role === "Admin") && (
        <div className="d-flex gap-3">
          <Link
            to={`/edit/${slug}`}
            state={{ id: item.id }}
            className="btn btn-primary align-content-center"
          >
            Edit
          </Link>
          <button
            type="submit"
            onClick={() => {
              handleSave(item.id);
            }}
            className="btn btn-secondary"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;