import { useEffect, useState, useRef } from "react";
import {
  Tabs,
  Tab,
  Spinner,
  Input,
  Button,
  Image,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import axios from "axios";
import { API_URL } from "../../../API/API";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountInfo() {
  const tabs = [
    { name: "Account", content: <GeneralSettings /> },
    { name: "Password", content: <ManagePassword /> },
    { name: "Documenti", content: <ManageDocument /> },
  ];

  return (
    <div>
      <div className="py-10 p-10 lg:pl-unit-80">
        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl">
            <div className="pb-16 pt-10">
              <div className="px-4 sm:px-6 lg:px-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Impostazioni
                </h1>
              </div>
              <div className="px-4 sm:px-6 lg:px-0">
                <div className="py-6">
                  {/* Tabs */}
                  <Tabs variant="underlined" color="primary" size="lg">
                    {tabs.map((tab) => (
                      <Tab key={tab.name} title={tab.name}>
                        {tab.content}
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function GeneralSettings() {
  const [data, setData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [oldData, setOldData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
  });
  const [alertData, setAlertData] = useState({
    isOpen: false,
    variant: "",
    title: "",
    message: "",
  });
  const [isUpdatingData, setIsUpdatingData] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/GetCustomerData", { withCredentials: true })
      .then((res) => {
        setData({
          ...data,
          id: res.data.customer.id,
          name: res.data.customer.name,
          surname: res.data.customer.surname,
          email: res.data.customer.email,
          phone: res.data.customer.phone,
        });
        setOldData({
          ...oldData,
          name: res.data.customer.name,
          surname: res.data.customer.surname,
          email: res.data.customer.email,
          phone: res.data.customer.phone,
        });
        console.log(res.data);
      });
  }, []);

  function handleResetData(value) {
    setIsEditing({ ...isEditing, [value]: false });
    setData({ ...data, [value]: oldData[value] });
  }

  function handleChangeName(value) {
    const sanitizedValue = value.replace(/[0-9]/g, ""); // Rimuove tutti i numeri dall'input
    const capitalizedValue =
      typeof sanitizedValue === "string" && sanitizedValue.trim() !== ""
        ? sanitizedValue.trim().charAt(0).toUpperCase() +
          sanitizedValue.trim().slice(1)
        : "";
    setData({ ...data, name: capitalizedValue });
  }

  function handleChangeSurname(value) {
    const sanitizedValue = value.replace(/[0-9]/g, ""); // Rimuove tutti i numeri dall'input
    const capitalizedValue =
      typeof sanitizedValue === "string" && sanitizedValue.trim() !== ""
        ? sanitizedValue.trim().charAt(0).toUpperCase() +
          sanitizedValue.trim().slice(1)
        : "";
    setData({ ...data, surname: capitalizedValue });
  }

  function handleChangePhone(value) {
    const numericInput = value.replace(/\D/g, ""); // Rimuove tutti i caratteri non numerici
    if (numericInput.length <= 10) {
      // Controllo della lunghezza della stringa
      setData({ ...data, phone: numericInput });
    } else {
      setData({ ...data, phone: oldData.phone });
    }
  }

  function handleChangeEmail(value) {
    if (value === "") {
      setData({ ...data, email: oldData.email });
    } else {
      setData({ ...data, email: value });
    }
  }

  const handleClose = (event, reason) => {
    setAlertData({
      ...alertData,
      isOpen: false,
      variant: "",
      title: "",
      message: "",
    });
  };

  function enableSubmit() {
    if (
      data.name !== oldData.name ||
      data.surname !== oldData.surname ||
      data.email !== oldData.email ||
      data.phone !== oldData.phone
    ) {
      return false;
    }
    return true;
  }

  const handleUpdateData = async () => {
    try {
      const response = await axios.put(
        API_URL + "/Customer/UpdateCustomerData",
        {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
        },
        { withCredentials: true }
      );
      setIsUpdatingData(true);
      if (response.status === 200) {
        setAlertData({
          ...alertData,
          isOpen: true,
          variant: "success",
          title: "Dati aggiornati",
          message: "I dati sono stati aggiornati correttamente",
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta del prodotto", error);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert size="lg" severity={alertData.variant} sx={{ width: "100%" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>{alertData.title}</AlertTitle>
          {alertData.message}
        </Alert>
      </Snackbar>

      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profilo
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Modifica le tue impostazioni personali.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 items-center">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                {isEditing.name ? (
                  <>
                    <span className="flex-grow">
                      <Input
                        variant="bordered"
                        placeholder="Inserisci il nuovo nome"
                        size="sm"
                        radius="sm"
                        className="w-full lg:w-1/2"
                        value={data.name}
                        onChange={(e) => handleChangeName(e.target.value)}
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-danger hover:text-danger"
                        onClick={() => handleResetData("name")}
                      >
                        Annulla
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">
                      {data.name ? data.name : <Spinner />}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-primary hover:text-primary"
                        onClick={() =>
                          setIsEditing({ ...isEditing, name: true })
                        }
                      >
                        Aggiorna
                      </button>
                    </span>
                  </>
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Cognome</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                {isEditing.surname ? (
                  <>
                    <span className="flex-grow">
                      <Input
                        variant="bordered"
                        placeholder="Inserisci il nuovo cognome"
                        size="sm"
                        radius="sm"
                        className="w-full lg:w-1/2"
                        value={data.surname}
                        onChange={(e) => handleChangeSurname(e.target.value)}
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-danger hover:text-danger"
                        onClick={() => handleResetData("surname")}
                      >
                        Annulla
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">
                      {data.surname ? data.surname : <Spinner />}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-primary hover:text-primary"
                        onClick={() =>
                          setIsEditing({ ...isEditing, surname: true })
                        }
                      >
                        Aggiorna
                      </button>
                    </span>
                  </>
                )}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                {isEditing.email ? (
                  <>
                    <span className="flex-grow">
                      <Input
                        type="email"
                        variant="bordered"
                        placeholder="Inserisci la nuova email"
                        size="sm"
                        radius="sm"
                        className="w-full lg:w-1/2"
                        onChange={(e) => handleChangeEmail(e.target.value)}
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-danger hover:text-danger"
                        onClick={() => handleResetData("email")}
                      >
                        Annulla
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">
                      {data.email ? data.email : <Spinner />}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-primary hover:text-primary"
                        onClick={() =>
                          setIsEditing({ ...isEditing, email: true })
                        }
                      >
                        Aggiorna
                      </button>
                    </span>
                  </>
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">Telefono</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                {isEditing.phone ? (
                  <>
                    <span className="flex-grow">
                      <Input
                        variant="bordered"
                        placeholder="Inserisci il nuovo numero di telefono"
                        size="sm"
                        radius="sm"
                        className="w-full lg:w-1/2"
                        value={data.phone}
                        onChange={(e) => handleChangePhone(e.target.value)}
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-danger hover:text-danger"
                        onClick={() => handleResetData("phone")}
                      >
                        Annulla
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">
                      {data.phone ? data.phone : <Spinner />}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md bg-white font-medium text-primary hover:text-primary"
                        onClick={() =>
                          setIsEditing({ ...isEditing, phone: true })
                        }
                      >
                        Aggiorna
                      </button>
                    </span>
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center lg:justify-end gap-x-6">
        <Button
          color="primary"
          className="text-white"
          radius="sm"
          isDisabled={enableSubmit()}
          onClick={handleUpdateData}
          isLoading={isUpdatingData}
        >
          {isUpdatingData ? "Aggiornamento in corso" : "Salva modifiche"}
        </Button>
      </div>
    </>
  );
}

function ManagePassword() {
  const [data, setData] = useState({
    id: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [alertData, setAlertData] = useState({
    isOpen: false,
    variant: "",
    title: "",
    message: "",
  });
  const [isUpdatingData, setIsUpdatingData] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL + "/Customer/GetCustomerData", { withCredentials: true })
      .then((res) => {
        setData({ ...data, id: res.data.customer.id });
      });
  }, []);

  function handleChangeOldPassword(e) {
    setData({ ...data, oldPassword: e.target.value });
  }
  function handleChangeNewPassword(e) {
    setData({ ...data, newPassword: e.target.value });
  }
  function handleChangeConfirmPassword(e) {
    setData({ ...data, confirmPassword: e.target.value });
  }

  const handleClose = (event, reason) => {
    setAlertData({
      ...alertData,
      isOpen: false,
      variant: "",
      title: "",
      message: "",
    });
  };

  function equalPassword() {
    if (data.oldPassword !== "" && data.newPassword !== "") {
      if (data.oldPassword === data.newPassword) {
        return true;
      }
      return false;
    }
  }

  function enableSubmit() {
    if (data.oldPassword !== "" && data.newPassword === data.confirmPassword) {
      return false;
    }
    return true;
  }

  const handleUpdateData = async () => {
    try {
      const response = await axios.put(
        API_URL + "/Customer/UpdateCustomerPassword",
        {
          id: data.id,
          oldPassword: data.oldPassword,
          password: data.newPassword,
        },
        { withCredentials: true }
      );
      setIsUpdatingData(true);
      if (response.status === 200) {
        setAlertData({
          ...alertData,
          isOpen: true,
          variant: "success",
          title: "Dati aggiornati",
          message: "I dati sono stati aggiornati correttamente",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } catch (error) {
      setAlertData({
        ...alertData,
        isOpen: true,
        variant: "error",
        title: "Aggiornamento Password Fallito",
        message: "La vecchia password inserita non è corretta.",
      });

      console.error("Errore durante l'aggiunta del prodotto", error);
    }
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert size="lg" severity={alertData.variant} sx={{ width: "100%" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>{alertData.title}</AlertTitle>
          {alertData.message}
        </Alert>
      </Snackbar>

      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Password
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Modifica la tua password.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">
                Vecchia password
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                <span className="flex-grow">
                  <Input
                    type="password"
                    variant="bordered"
                    placeholder="Inserisci la vecchia password"
                    size="sm"
                    radius="sm"
                    className="w-full lg:w-1/2"
                    onChange={handleChangeOldPassword}
                  />
                </span>
              </dd>
              <dt className="text-sm font-medium text-gray-500">
                Nuova password
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                <span className="flex-grow">
                  <Input
                    type="password"
                    variant="bordered"
                    placeholder="Inserisci la nuova password"
                    size="sm"
                    radius="sm"
                    className="w-full lg:w-1/2"
                    onChange={handleChangeNewPassword}
                    color={equalPassword() ? "danger" : null}
                    errorMessage={
                      equalPassword()
                        ? "La nuova password non può essere uguale a quella vecchia"
                        : ""
                    }
                  />
                </span>
              </dd>
              <dt className="text-sm font-medium text-gray-500">
                Conferma password
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                <span className="flex-grow">
                  <Input
                    type="password"
                    variant="bordered"
                    placeholder="Conferma la nuova password"
                    size="sm"
                    radius="sm"
                    className="w-full lg:w-1/2"
                    onChange={handleChangeConfirmPassword}
                    isDisabled={equalPassword()}
                  />
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center lg:justify-end gap-x-6">
        <Button
          color="primary"
          className="text-white"
          radius="sm"
          isDisabled={enableSubmit()}
          onClick={handleUpdateData}
          isLoading={isUpdatingData}
        >
          {isUpdatingData ? "Aggiornamento in corso" : "Salva modifiche"}
        </Button>
      </div>
    </>
  );
}

function ManageDocument() {
  const [alertData, setAlertData] = useState({
    isOpen: false,
    variant: "",
    title: "",
    message: "",
  });
  const [newDocument, setNewDocument] = useState({
    idDocument: "",
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  function enableSubmit() {
    if (newDocument.idDocument !== "" && photos.length !== 0) {
      return false;
    }
    return true;
  }

  const handleAddProduct = async () => {
    const trimmedProductName = newProduct.productName.trim();
    const formData = new FormData();

    // Aggiungi i dati del nuovo prodotto
    formData.append("productName", trimmedProductName);
    formData.append("productDescription", newProduct.productDescription);
    formData.append("productAmount", newProduct.productAmount);
    formData.append("unitPrice", newProduct.unitPrice);
    formData.append("isDiscount", newProduct.isDiscount);

    // Aggiungi le immagini del prodotto
    photos.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, photo.file);
    });

    try {
      const response = await axios.post(
        API_URL + "/Products/CreateProduct",
        formData
      );
      setIsAddingProduct(true);
      if (response.status === 201) {
        setTimeout(() => {
          window.location.href = "/products";
        }, 1000);
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta del prodotto", error);
    }
  };

  const handleClose = (event, reason) => {
    setAlertData({
      ...alertData,
      isOpen: false,
      variant: "",
      title: "",
      message: "",
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    // Limit the number of selected files to 5
    const selectedFilesArray = Array.from(selectedFiles).slice(0, 5);

    // Convert each file to an object with additional properties if needed
    const photoObjects = selectedFilesArray.map((file) => ({
      file,
      // You can add more properties here, such as a caption or other metadata
    }));

    setPhotos((prevPhotos) => [...prevPhotos, ...photoObjects]);
  };

  const handleRemovePhoto = (index) => {
    // Rimuovi la foto corrispondente all'indice dall'array
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert size="lg" severity={alertData.variant} sx={{ width: "100%" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>{alertData.title}</AlertTitle>
          {alertData.message}
        </Alert>
      </Snackbar>

      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Documenti
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Inserisci una foto fronte retro del documento.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <dt className="text-sm font-medium text-gray-500">
                Tipo di documento
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 items-center">
                <span className="flex-grow">
                  <Select
                    label="Seleziona un tipo di documento"
                    className="max-w-xs"
                    size="sm"
                    radius="sm"
                    variant="bordered"
                  >
                    <SelectItem key={1} value={1}>
                      Carta di identità
                    </SelectItem>
                    <SelectItem key={2} value={2}>
                      Passaporto
                    </SelectItem>
                    <SelectItem key={3} value={3}>
                      Patente di guida
                    </SelectItem>
                  </Select>
                </span>
              </dd>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Foto del documento
              </label>
              <div className="flex flex-col gap-10">
                <Alert variant="outlined" severity="warning">
                  Dimensioni consigliate per l'immagine: <br /> 500x500 pixel.
                </Alert>
                {photos.map((photo, index) => (
                  <div key={index} className="flex flex-row gap-5 items-center">
                    <Image
                      isBordered
                      radius="sm"
                      size="lg"
                      width={200}
                      height={200}
                      src={URL.createObjectURL(photo.file)}
                    />
                    <Button
                      isIconOnly
                      className="bg-red-500 text-white"
                      radius="sm"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <DeleteRoundedIcon />{" "}
                    </Button>
                  </div>
                ))}

                {photos.length < 2 && (
                  <label className="relative inline-flex justify-center items-center bg-primary text-white px-4 py-2 rounded-md cursor-pointer w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <FileUploadRoundedIcon />
                    {photos.length === 0 ? (
                      <span>Carica fronte</span>
                    ) : (
                      <span>Carica retro {photos.length + "/" + 2}</span>
                    )}
                  </label>
                )}
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center lg:justify-end gap-x-6">
        <Button
          color="primary"
          className="text-white"
          radius="sm"
          isDisabled={enableSubmit()}
          onClick={handleAddProduct}
          isLoading={isAddingProduct}
        >
          {isAddingProduct ? "Aggiornamento in corso" : "Salva modifiche"}
        </Button>
      </div>
    </>
  );
}
