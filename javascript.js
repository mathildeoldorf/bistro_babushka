 let retter = [];

 let menuKategori = "menu";

 document.addEventListener("DOMContentLoaded", sidenErLoadet);

 function sidenErLoadet() {
     hentJson();
 }

 async function hentJson() {
     let jsonData = await fetch("json/menu.json");
     retter = await jsonData.json();

     //Sortering af af retterne - alfabetisk
     retter.sort((a, b) => a.navn.localeCompare(b.navn));
     sorterRetter(console.log("Sortering"));
     // sorterRetterTo(console.log("Sortering 2")); // sorterRetterTre(console.log("Sortering 3"));

     //Vis retter med filtrering i nye arrays
     ///////find tekst på klikket knap
     filtrerRetter();

     // Burgermenu-funktion
     burgermenu();

     vis(retter, "Menu");
 }

 function vis(retter, overskrift) {
     console.log(retter);

     let template = document.querySelector("[data-template]");
     let liste = document.querySelector("[data-liste]");

     liste.innerHTML = "";
     document.querySelector("[data-overskrift]").textContent = overskrift;

     retter.forEach(ret => {
         let klon = template.cloneNode(true).content;
         klon.querySelector("[data-navn]").textContent = ret.navn;
         klon.querySelector("[data-billede]").src = "imgs/medium/" + ret.billede + "-md.jpg";
         klon.querySelector("[data-billede]").alt = "billede af" + " " + ret.billede;

         klon.querySelector("[data-ret]").setAttribute("data-id", ret.id);
         klon.querySelector("[data-ret]").addEventListener("click", openPopup);
         // setattribute tager to parametre - tildele et navn og en værdi - på den måde tildeles deres unikke id fra Json filen som en data-attribut --> På den måde kan man lagre informationer i data-attributter

         liste.appendChild(klon); +
         "<br>" + "<br>";
     });
 }

 // BURGERMENU

 function burgermenu() {

     document.querySelector(".burgermenu").addEventListener("click", toggleBurgermenu);
     document.querySelector("#knapper").addEventListener("click", toggleBurgermenu);

     function toggleBurgermenu() {
         document.querySelector(".burgermenu").classList.toggle("change");
         document.querySelector("#knapper").classList.toggle("show");

         document.querySelector("#sortering").classList.toggle("show");
     }
 }


 function filtrerRetter() {
     //Vis retter med filtrering i nye arrays
     console.log("Filtrering");

     ///////find tekst på klikket knap
     document.querySelector("#knapper").addEventListener("click", () => {
         ///tager fat i det element som har udløst eventet = target
         console.log(event.target.textContent.toLowerCase());

         let kategori = event.target.textContent.toLowerCase();
         menuKategori = kategori;

         //Hvis kategorien er alt andet end menu/alle
         if (kategori != "menu") {

             let kat = retter.filter(ret => ret.kategori == kategori);
             vis(kat, kategori);

         } else {
             vis(retter, kategori);
         }
     })
 }

 //Sortering
 /// Med drop down
 function sorterRetter() {
     console.log("Sortering");

     document.querySelector("select").addEventListener("change", sorteringDropdown);

     function sorteringDropdown() {
         if (this.value == "alfa") {
             retter.sort((a, b) => a.navn.localeCompare(b.navn));
         } else if (this.value == "pris-stigende") {
             retter.sort((a, b) => a.pris - b.pris);
         } else if (this.value == "pris-faldende") {
             retter.sort((a, b) => b.pris - a.pris);
         }
         vis(retter, menuKategori);
     }
 }


 /// Med knapper
 // function sorterRetterTo() { // document.querySelector(".alfa").addEventListener("click", alfabetiskKnap); // document.querySelector(".pris-stigende").addEventListener("click", prisStigendeKnap); // document.querySelector(".pris-faldende").addEventListener("click", prisFaldendeKnap); // // function alfabetiskKnap() { // retter.sort((a, b) => a.navn.localeCompare(b.navn)); // vis(retter, menuKategori); // sletMarkering(); // this.classList.add("markeret"); // } // // function prisStigendeKnap() { // retter.sort((a, b) => a.pris - b.pris); // vis(retter, menuKategori); // sletMarkering(); // this.classList.add("markeret"); // } // // function prisFaldendeKnap() { // retter.sort((a, b) => b.pris - a.pris); // vis(retter, menuKategori); // sletMarkering(); // this.classList.add("markeret"); // } // // function sletMarkering() { // document.querySelector(".alfa").classList.remove("markeret"); // document.querySelector(".pris-stigende").classList.remove("markeret"); // document.querySelector(".pris-faldende").classList.remove("markeret"); // }; // }

 /// Med radio-buttons

 //        function sorterRetterTre() {
 //            document.querySelector(".radio-alfa").addEventListener("change", radioAlfabetisk);
 //
 //            function radioAlfabetisk() {
 //                retter.sort((a, b) => a.navn.localeCompare(b.navn));
 //                vis(retter, menuKategori);
 //            }
 //            document.querySelector(".radio-stigende").addEventListener("change", radioStigende);
 //
 //            function radioStigende() {
 //                retter.sort((a, b) => a.pris - b.pris);
 //                vis(retter, menuKategori);
 //            }
 //            document.querySelector(".radio-faldende").addEventListener("change", radioFaldende);
 //
 //            function radioFaldende() {
 //                retter.sort((a, b) => b.pris - a.pris);
 //                vis(retter, menuKategori);
 //            }
 //        }

 //Åben modal/popup

 function openPopup() {
     // direkte selektion af det klikkede element - skal ikke i [] fordi vi blot henter en attribut og ikke selekterer den i html'en
     let popupId = this.getAttribute("data-id");
     console.log(popupId);
     //Hvis popupId = ret.id, så vis dens indhold

     let singleView = retter.find(ret => {
         if (popupId == ret.id) {
             document.querySelector(".popup").style.visibility = "visible";
             // igen bruges class istedet for data-, da man skal ændre stylingen
             document.querySelector("[data-overskrift]").textContent = ret.kategori;
             document.querySelector("[data-navn]").textContent = ret.navn;
             document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
             document.querySelector("[data-pris]").textContent = "Pris:" + " " + ret.pris + " " + "kr.";
             document.querySelector("[data-billede]").src = "imgs/medium/" + ret.billede + "-md.jpg";
             document.querySelector("[data-billede]").alt = "billede af" + " " + ret.billede;
         }
     })
 }

 document.querySelector("[data-close-button]").addEventListener("click", closePopup);
 //        document.querySelector("[data-popup]").addEventListener("keydown", closePopup(Event));
 function closePopup() {
     document.querySelector(".popup").style.visibility = "hidden";
 }
