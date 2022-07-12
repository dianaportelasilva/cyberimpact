import "bootstrap/dist/css/bootstrap.min.css";
import { query } from "cantil";

let form = query("form");

form.query("button").addEventListener("click", (event) => {
  event.preventDefault();

  let status = form.checkValidity();
  form.reportValidity();
  if (!status) {
    return false;
  }

  // get form values
  let cost = Number(form.query("#cost").value);
  let volume = Number(form.query("#volume").value);
  let weekdays = Number(form.query("#days").value);
  let proporcion = Number(form.query("#proporcion").value) / 100;
  let population = Number(form.query("#population").value);

  let affectedDays = proporcion * weekdays;
  let affectedCapacity = affectedDays / (weekdays === 5 ? 250 : 365);
  let costEstimated = affectedCapacity * cost;
  let costPerPerson = (costEstimated / population).toFixed(2);

  form.query("[affected-days]").innerText = affectedDays;
  form.query("[affected-capacity]").innerText = affectedCapacity;
  form.query("[cost-estimated]").innerText = costEstimated;
  form.query("[cost-per-person]").innerText = costPerPerson;

  // show results
  form.query(".alert").classList.remove("d-none");
});
