let index = 0;
const decimals =
  "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481";
const inp = document.getElementById("decimal");
const pi = document.getElementById("pi");
const log = document.getElementById("log");

function setText(elem, text) {
  elem.textContent = text;
  return elem;
}

((p) => (p.innerText = p.innerText.replace("%d%", decimals.length)))(
  document.querySelector("p")
);

inp.addEventListener("keypress", (e) => {
  if (e.key === decimals.charAt(index)) {
    inp.classList.remove("error");
    inp.classList.add("success");
    pi.innerHTML += `${e.key}${(index + 1) % 4 ? "" : " "}`;
    index++;
  } else {
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
