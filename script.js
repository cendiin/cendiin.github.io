document.getElementById("button").addEventListener("click", () => {
  correct = true;
  while (correct) {
    let code = prompt(
      "Please provide the code given by the person on the phone."
    );
    if (code == null) {
        break
    } else {
        code = code.toLowerCase();
    }  if (code == "help") {
        window.location.href = "support.html";
        correct = false;
    } else {
        alert("Please put in the correct code.");
    }
  }
});
