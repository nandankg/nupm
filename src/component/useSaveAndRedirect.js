import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useSaveAndRedirect = (saveAction) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to get the last parameter of the current URL
  const getLastParameter = () => {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  };

  const [slug, setSlug] = useState(getLastParameter().trim());

  // Save data and redirect
  const handleSaveAndRedirect = (id) => {
    dispatch(saveAction(id)); // Dispatch the provided save action
    navigate(`/list/${slug}`); // Navigate to the desired path using slug
  };

  return { handleSaveAndRedirect, slug };
};

export default useSaveAndRedirect;
