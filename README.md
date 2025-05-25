1.	Introducere
My BookShelf este o aplicație web intuitivă care le permite utilizatorilor să își creeze o bibliotecă virtuală personalizată. Proiectul permite adăugarea, editarea și ștergerea cărților, cu detalii precum titlu, autor, gen, data citirii, rating și comentariu personal. Scopul aplicației este de a ajuta utilizatorii să-și organizeze lecturile și să revină oricând asupra lor.

2.	Descriere problemă
Într-un context în care cititorii moderni alternează între lecturi fizice, digitale sau audio, devine din ce în ce mai dificil să menții o evidență coerentă a cărților parcurse. Majoritatea aplicațiilor existente oferă soluții comerciale, aglomerate de funcționalități sau bazate pe recomandări algoritmice care distrag de la esența simplă: urmărirea propriei experiențe de lectură. My BookShelf propune o alternativă minimală și eficientă, oferind o platformă simplă pentru a înregistra manual fiecare carte citită, a evalua experiența printr-un rating și a adăuga note personale sau comentarii. În plus, utilizatorul poate filtra cărțile în funcție de gen sau poate căuta rapid în colecție, ceea ce transformă aplicația într-un spațiu personalizat de reflecție și organizare literară.

3.	Descriere API
Pentru a permite interacțiunea cu datele, aplicația folosește un API REST construit direct în Next.js. Prin acest API, aplicația trimite și primește informații despre cărți, utilizând metodele HTTP standard: GET pentru a obține lista cărților, POST pentru a adăuga o carte nouă, PUT pentru a actualiza detaliile unei cărți existente și DELETE pentru a o elimina. Rutele sunt implementate în pages/api/books.js, iar datele sunt stocate și accesate prin MongoDB. 
 
API-ul oferă un mediu sigur și scalabil de comunicare între interfață și bază de date, facilitând un flux de date constant și fiabil.
Aplicația utilizează și un al doilea API extern – Open Library Covers API, care permite afișarea automată a imaginilor de copertă pe baza unui identificator (cover_id) sau a unei chei de ediție. Pentru fiecare carte, aplicația formează adresa imaginii după structura:
 
Acest API este interogat indirect, prin includerea linkului în obiectul cărții, fără a fi necesară autentificarea sau token-uri speciale.

4.	Flux de date
Utilizatorul interacționează cu aplicația printr-o interfață intuitivă. Atunci când adaugă o carte, completează un formular cu titlul, autorul, genul, data citirii, ratingul și un comentariu opțional. Aceste date sunt trimise către API printr-un request de tip POST.

 La afișarea cărților, aplicația face un request GET pentru a prelua toate înregistrările din bază de date și le afișează într-un grid responsive. Pentru a edita o carte, se trimite un PUT cu noile valori, iar la ștergere se face un DELETE, care include un pas intermediar de confirmare din partea utilizatorului.
 
5.	Servicii cloud utilizate
•	MongoDB – serviciu de baze de date NoSQL, unde sunt stocate toate informațiile despre cărți.
•	Open Library Covers API – serviciu public pentru preluarea imaginilor coperților în format optimizat.
•	Vercel – platformă cloud folosită pentru hostingul aplicației frontend și backend (Next.js).
6.	Capturi ecran aplicație
 
Pagina principala a aplicatiei
 
Bara de căutare și filtrul de gen

 
Confirmarea la ștergere
7. Referințe
https://openlibrary.org/developers/api
https://www.mongodb.com/cloud/atlas
https://vercel.com/docs
https://nextjs.org/docs/api-routes/introduction
