import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { useParams } from "react-router-dom";
import { Button, Link } from "@nextui-org/react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

export default function ProductDetail() {
  const [productLabel, setProductLabel] = useState("");
  const [product, setProduct] = useState("");
  const { id, productName } = useParams();

  useEffect(() => {
    axios.get(API_URL + "/Products/GetProductLabelById/" + id).then((res) => {
      if (res.status === 200) {
        setProductLabel(res.data[0].path);
      }
    });
    axios
      .get(
        API_URL + "/Products/GetProductByNameAndId/" + id + "/" + productName
      )
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data[0].productName);
        }
      });
  }, [id, product]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-5">
      <div className="flex flex-col md:flex-row justify-start w-full gap-5">
        <Button
          startContent={<KeyboardBackspaceOutlinedIcon />}
          className="lg:ml-5 lg:z-50"
          variant="light"
          color="primary"
          as={Link}
          href={"../" + product}
          radius="sm"
        >
          Vai a {product}
        </Button>

        <h1 className="text-2xl sm:text-3xl font-bold md:absolute text-center w-full tracking-tight text-gray-900">
          Valori nutrizionali {product}
        </h1>
      </div>

      {productLabel !== "" ? (
        <div style={{ maxWidth: "500px", position: "relative" }}>
          <img src={API_URL + "/uploads/" + productLabel} alt="Product" />
        </div>
      ) : (
        <div className="h-full">Nessun dettaglio disponibile</div>
      )}
    </div>
  );
}
