import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";

const useFetchAndFilter = (reduxSelector, fetchAction, filename = "file.pdf") => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();

  // Redux data
  const reduxData = useSelector(reduxSelector);

  // State variables
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState(null);

  // PDF configuration
  const { toPDF, targetRef } = usePDF({
    filename,
  });

  // Fetch data and set items
  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  useEffect(() => {
    if (reduxData?.data?.data) {
      setItems(reduxData.data.data);
      setSlug(reduxData.slug);

      // Filter data based on the ID from location.state
      const filteredData = reduxData.data.data.filter((itm) => itm.id === id);
      setFilteredItem(filteredData[0] || null);
    }
  }, [reduxData, id]);

  return {
    navigate,
    location,
    slug,
    items,
    filteredItem,
    toPDF,
    targetRef,
  };
};

export default useFetchAndFilter;
