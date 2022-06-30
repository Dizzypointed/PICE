let index, unbroken, streak, best, correct;
const decimals =
  "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006";
const inp = document.getElementById("decimal");
const pi = document.getElementById("pi");
const log = document.getElementById("log");
const strk = document.getElementById("streak");
const strkText = strk.innerText;

setText = (elem, text, classes) => {
  elem.textContent = text;
  classes && classes.forEach((c) => c && elem.classList.add(c));
  return elem;
};

reset = () => {
  streak = 0;
  unbroken = true;
  index = 0;
  pi.innerHTML = "";
  pi.appendChild(setText(document.createElement("span"), "3."));
  log.innerHTML = "";
  inp.classList.remove("success");
  inp.classList.remove("error");
  strk.classList.remove("success");
  inp.value = "";
  strk.innerText = strkText.replace("%d%", streak);
  best = localStorage.getItem("streak");
  correct = true;
  document
    .querySelectorAll("button.error")
    .forEach((el) => el.classList.remove("error"));
};

((p) => (p.innerText = p.innerText.replace("%d%", decimals.length)))(
  document.querySelector("p span")
);

handleInput = (e) => {
  if (e == decimals.charAt(index)) {
    inp.classList.remove("error");
    document
      .querySelectorAll("button.error")
      .forEach((el) => el.classList.remove("error"));
    inp.classList.add("success");
    pi.appendChild(
      setText(document.createElement("span"), e, [
        (index + 1) % 4 ? "digit" : "digitbreak",
        !correct && "wrong",
      ])
    );
    correct = true;
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
    correct = false;
    unbroken = false;
    inp.classList.add("error");
    document.querySelector(`#btn${e}`).classList.add("error");
    inp.classList.remove("success");
    log.appendChild(
      setText(
        document.createElement("div"),
        `Decimal ${index + 1} is not: ${e}`
      )
    );
  }
  inp.value = "";
};

inp.addEventListener("keypress", (e) => /\d/.test(e.key) && handleInput(e.key));

reset();
inp.focus();
