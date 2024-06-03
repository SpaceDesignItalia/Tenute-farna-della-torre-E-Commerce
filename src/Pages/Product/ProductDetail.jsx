import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [productLabel, setProductLabel] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(API_URL + "/Products/GetProductLabelById/" + id).then((res) => {
      if (res.status === 200) {
        setProductLabel(res.data[0].path);
      }
    });
  }, [id]);

  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)", // Puoi regolare il valore di scala per controllare il livello di zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ overflow: "hidden", width: "100vw" }}
    >
      {productLabel !== "" ? (
        <div style={{ width: "500px", position: "relative" }}>
          <img
            src={API_URL + "/uploads/" + productLabel}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              ...zoomStyle,
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      ) : (
        <div className="h-full">Nessun dettaglio disponibile</div>
      )}
    </div>
  );
}
