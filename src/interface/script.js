"use strict";

// DOM Element references
const attackTypeSelectElement = document.getElementById("attackType");
const crackFromSubmitElement = document.getElementById("crackFromSubmit");
const alertErrorElement = document.getElementById("alertError");
const resultFieldElement = document.getElementById("resultField");
const actionTypeElement = document.getElementById("actionType");
const genHashFromElement = document.getElementById("genHashFrom");
const crackFromElement = document.getElementById("crackFrom");

const setProperFrom = (selectedAction = actionTypeElement.value) => {
  resultFieldElement.innerText = "";

  if (selectedAction === "1") {
    crackFromElement.style.display = "none";
    genHashFromElement.style.display = "block";
  } else {
    genHashFromElement.style.display = "none";
    crackFromElement.style.display = "block";
  }
};

actionTypeElement.addEventListener("change", (e) => {
  const selectedAction = e.target.value;
  setProperFrom(selectedAction);
});

// HASH PASSWORD FORM
// Send data to API and handle response
const hashPassword = async (body) => {
  resultFieldElement.innerText = "";
  resultFieldElement.innerText = "loading...";

  try {
    const response = await fetch("http://localhost:3333/hash-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const { hash } = await response.json();

    resultFieldElement.innerText = hash || "";
  } catch (e) {
    resultFieldElement.innerText = e.message;
  }
};

// Logic after hash form submitting
genHashFromElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = e.target.password.value;
  const hashMode = e.target.hashMode.value;

  hashPassword({
    password,
    hashMode,
  });
});

// CRACK HASH FORM
// Send data to API and handle response
const crackHash = async (body) => {
  resultFieldElement.innerText = "";
  resultFieldElement.innerText = "loading...";
  try {
    const response = await fetch("http://localhost:3333/crack-hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const { cracked } = await response.json();

    resultFieldElement.innerText = cracked || "";
  } catch (e) {
    resultFieldElement.innerText = e.message;
  }
};

// Logic after crack hash form submitting
crackFromElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const hash = e.target.hash.value;
  const methodType = e.target.methodType.value;
  const attackType = e.target.attackType.value;

  crackHash({
    hash,
    methodType,
    attackType,
  });
});

// Set initial form type
setProperFrom();
