import Image from "next/image";
import React from "react";
import digiCartLogo from "../../img/DigicartLogo.png";

export default function LoginLogo() {
  return (
    <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-500 text-white p-10">
      <div className="text-center max-w-md">
        <Image
          width={180}
          priority
          src={digiCartLogo}
          alt="Digicart Logo"
          className="mx-auto mb-6"
        />

        <h2 className="text-4xl font-bold mb-4">Benvenuto in Digicart</h2>
        <p className="text-lg font-light text-gray-300">
          Connetti. Collabora. Cresci. <br />
          La piattaforma che unisce aziende e prodotti.
        </p>
      </div>
    </div>
  );
}
