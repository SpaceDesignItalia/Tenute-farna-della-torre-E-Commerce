import React from "react";
import Cards from "./Cards";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold">Ciao, nome_utente</h1>
      <Cards />
    </div>
  );
}
