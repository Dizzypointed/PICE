let index, unbroken, streak, best;
const decimals =
  "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481";
const inp = document.getElementById("decimal");
const pi = document.getElementById("pi");
const log = document.getElementById("log");
const strk = document.getElementById("streak");
const strkText = strk.innerText;

setText = (elem, text) => {
  elem.textContent = text;
  return elem;
};

reset = () => {
  streak = 0;
  unbroken = true;
  index = 0;
  pi.innerText = "3.";
  log.innerHTML = "";
  inp.classList.remove("success");
  inp.classList.remove("error");
  strk.classList.remove("success");
  inp.value = "";
  strk.innerText = strkText.replace("%d%", streak);
  best = localStorage.getItem("streak");
};

((p) => (p.innerText = p.innerText.replace("%d%", decimals.length)))(
  document.querySelector("p span")
);

inp.addEventListener("keypress", (e) => {
  if (e.key === decimals.charAt(index)) {
    inp.classList.remove("error");
    inp.classList.add("success");
    pi.innerText += `${e.key}${(index + 1) % 4 ? "" : " "}`;
    index++;
    if (unbroken) {
      streak++;
      strk.innerText = strkText.replace(
        "%d%",
        `${streak} ${streak > best ? "new best!" : ""}`
      );
      if (streak > best) {
        strk.classList.add("success");
        localStorage.setItem("streak", streak);
      }
    }
  } else {
    unbroken = false;
    inp.classList.add("error");
    inp.classList.remove("success");
    log.appendChild(
      setText(
        document.createElement("div"),
        `Decimal ${index + 1} is not: ${e.key}`
      )
    );
  }
  inp.value = "";
});

reset();
inp.focus();
