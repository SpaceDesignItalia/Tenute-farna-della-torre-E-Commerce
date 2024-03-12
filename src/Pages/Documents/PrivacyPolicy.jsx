import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Informativa sulla Privacy
        </h1>

        <p className="mt-6 text-lg leading-8">
          La tua privacy è importante per noi. Di seguito, ti forniamo
          informazioni su quali dati raccogliamo, come li utilizziamo e
          conserviamo.
          {/* Inserisci qui l'intera Informativa sulla Privacy */}
        </p>
        {/* Inserisci qui l'intera Informativa sulla Privacy */}
        <div className="mt-10 max-w-2xl flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Dati Raccolti
            </h2>
            <p>
              Durante l'utilizzo dei nostri servizi, potremmo raccogliere le
              seguenti informazioni:
            </p>
            <p>
              1.1. Informazioni personali: Potremmo raccogliere informazioni
              personali come nome, indirizzo, numero di telefono e indirizzo
              email per gestire il tuo account e fornirti supporto.
            </p>
            <p>
              1.2. Dati relativi alle spedizioni: Potremmo raccogliere
              informazioni riguardanti gli indirizzi di spedizione per garantire
              che i tuoi ordini vengano recapitati correttamente.
            </p>
            <p>
              1.3. Documenti identificativi: Potremmo richiedere foto di
              documenti identificativi (come carta d'identità, passaporto,
              patente di guida) per motivi legali e per la verifica dei profili.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Utilizzo dei Dati
            </h2>
            <p>Utilizziamo i dati raccolti per i seguenti scopi:</p>
            <p>
              2.1. Gestione dell'account: Utilizziamo le informazioni personali
              per gestire il tuo account e fornirti assistenza personalizzata..
            </p>
            <p>
              2.2. Spedizioni: Utilizziamo le informazioni sulle spedizioni per
              garantire che i tuoi ordini vengano consegnati correttamente e
              tempestivamente.
            </p>
            <p>
              2.3. Verifica dei profili: Utilizziamo le foto dei documenti
              identificativi per la verifica dei profili e per garantire la
              sicurezza e l'integrità del nostro servizio.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Conservazione dei Dati
            </h2>
            <p>
              I dati personali raccolti verranno conservati per un periodo
              massimo di 60 giorni, a meno che non sia richiesta una
              conservazione più lunga per rispettare obblighi legali o per altri
              scopi legittimi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Condivisione dei Dati
            </h2>
            <p>
              Non condividiamo le tue informazioni personali con terze parti
              senza il tuo consenso, tranne nei seguenti casi:
            </p>

            <p>
              4.1. Con i nostri fornitori di servizi: Possiamo condividere le
              tue informazioni con terze parti che ci forniscono servizi di
              supporto operativo.
            </p>
            <p>
              4.2. Per conformità legale: Possiamo condividere le tue
              informazioni personali se richiesto dalla legge o se riteniamo in
              buona fede che tale divulgazione sia necessaria per conformarsi a
              una procedura legale o per proteggere i nostri diritti, la tua
              sicurezza o quella degli altri.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Diritti dell'Utente
            </h2>
            <p>
              Hai il diritto di accedere, correggere o cancellare i tuoi dati
              personali. Puoi anche opporsi al trattamento dei tuoi dati
              personali o richiedere la limitazione del trattamento. Per
              esercitare i tuoi diritti o per qualsiasi domanda riguardante
              questa Informativa sulla Privacy, ti preghiamo di contattarci
              all'indirizzo [inserire l'indirizzo email o postale].
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Modifiche all'Informativa sulla Privacy
            </h2>
            <p>
              Ci riserviamo il diritto di apportare modifiche a questa
              Informativa sulla Privacy in qualsiasi momento. Le modifiche
              verranno pubblicate su questa pagina con una data di
              aggiornamento.
            </p>
          </div>

          <p>
            Accettando questi Termini e Condizioni, confermi di aver letto,
            compreso e accettato di essere vincolato da essi.
          </p>
          <p>Data dell'ultimo aggiornamento: 01/03/2024</p>
        </div>
      </div>
    </div>
  );
}
