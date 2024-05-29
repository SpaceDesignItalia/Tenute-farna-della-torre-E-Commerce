import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { useParams } from "react-router-dom";
import { Image } from "@nextui-org/react";

export default function ProductDetail() {
  const [productLabel, setProductLabel] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(API_URL + "/Products/GetProductLabelById/" + id).then((res) => {
      if (res.status === 200) {
        setProductLabel(res.data[0].path);
      }
    });
  }, [productLabel]);

  return (
    <div className="flex justify-center items-center">
      <Image src={API_URL + "/uploads/" + productLabel} width={500} />
    </div>
  );
}
