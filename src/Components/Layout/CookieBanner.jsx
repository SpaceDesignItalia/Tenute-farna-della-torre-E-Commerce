import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

const CookieBanner = () => {
  const [isDeclined, setIsDeclined] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(
    localStorage.getItem("cookieConsent") === "true"
  );

  const handleConsent = () => {
    setCookieConsent(true);
    localStorage.setItem("cookieConsent", "true");
  };

  const handleDecline = () => {
    setCookieConsent(false);
    localStorage.setItem("cookieConsent", "false");
    setIsDeclined(true);
  };

  useEffect(() => {
    // Your logic for handling cookie consent status
    if (cookieConsent) {
      // Code to run when the user consents to cookies
      console.log("User consents to cookies");
    } else {
      // Code to run when the user declines cookies or has not consented yet
      console.log("User has not consented to cookies");
    }
  }, [cookieConsent]);

  return (
    <AnimatePresence>
      {!cookieConsent && !isDeclined && (
        <motion.div
          key="cookie-banner"
          className="z-50 max-w-screen-lg mx-auto fixed bg-white inset-x-5 p-5 bottom-5 rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0, transition: { duration: 2 } }}
          transition={{ duration: 2, type: "spring", bounce: 0.25, delay: 1 }}
        >
          <div className="w-full">
            Questo sito utilizza i cookie per migliorare l'esperienza di
            navigazione. Continuando a utilizzare il sito, accetti l'uso dei
            cookie. Per maggiori dettagli, consulta la nostra{" "}
            <a
              href="/privacy-policy"
              className="text-primary whitespace-nowrap hover:underline"
            >
              Politica sui cookie
            </a>
            .
          </div>
          <div className="flex gap-4 items-center flex-shrink-0">
            <Button color="primary" variant="light" onClick={handleDecline}>
              Rifiuta
            </Button>
            <Button
              className="text-white"
              color="primary"
              radius="sm"
              onClick={handleConsent}
            >
              Acconsenti
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
