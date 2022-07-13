import "bootstrap/dist/css/bootstrap.min.css";
import { query } from "cantil";

let form = query("form");

form.query("button").addEventListener("click", (event) => {
  event.preventDefault();

  // validate form
  if (!form.checkValidity()) {
    return form.reportValidity();
  }

  // get form values
  let cost = Number(form.query("#cost").value);
  let volume = Number(form.query("#volume").value);
  let weekdays = Number(form.query("#days").value);
  let proporcion = Number(form.query("#proporcion").value) / 100;
  let population = Number(form.query("#population").value);

  let currencyFormat = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' });
  let affectedDays = proporcion * weekdays;
  let affectedCapacity = affectedDays / (weekdays === 5 ? 250 : 365);
  let costEstimated = affectedCapacity * cost;
  let costPerPerson = costEstimated / population;

  query("[affected-days]").innerText = affectedDays;
  query("[affected-capacity]").innerText = affectedCapacity;
  query("[cost-estimated]").innerText = currencyFormat.format(costEstimated);
  query("[cost-per-person]").innerText = currencyFormat.format(costPerPerson);

  // show results
  query(".alert").classList.remove("d-none");
});
