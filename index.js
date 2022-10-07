let index, unbroken, streak, best, correct, time, splits, bestSplits;
const decimals =
  "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882";
const inp = document.getElementById("decimal");
const pi = document.getElementById("pi");
const log = document.getElementById("log");
const strk = document.getElementById("streak");
const strkText = strk.innerText;
const splts = document.getElementById("splits");
const history = document.getElementById("history");

((p) => (p.innerText = p.innerText.replace("%d%", decimals.length)))(
  document.querySelector(".content main p span")
);

timeString = (t) => {
  const m = Math.floor(t / 1000 / 60);
  const s = Math.floor((t / 1000) % 60);
  const ms = ("" + t).slice(-3);
  return `${m < 10 ? "0" : ""}${m}.${s < 10 ? "0" : ""}${s}.${ms}`;
};

setText = (elemType, text, classes) => {
  const elem = document.createElement(elemType);
  elem.textContent = text;
  classes && classes.forEach((c) => c && elem.classList.add(c));
  return elem;
};

renderHistory = () => {
  bestSplits = JSON.parse(localStorage.getItem("bestSplits")) || {};
  history.innerHTML = "";

  Object.keys(bestSplits).forEach((s) =>
    history.prepend(setText("li", `streak ${s}: ${timeString(bestSplits[s])}`))
  );
};

reset = () => {
  streak = 0;
  time = undefined;
  unbroken = true;
  index = 0;
  pi.innerHTML = "";
  pi.appendChild(setText("span", "3."));
  log.innerHTML = "";
  splts.innerHTML = "";
  renderHistory();
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

handleInput = (e) => {
  const registerTime = () => {
    if (!time) time = new Date();
    if (!(streak % 10)) {
      const split = new Date() - time;
      const bestSplit = bestSplits[streak];
      const splitTime = timeString(split);

      if (!bestSplit || bestSplit > split) {
        bestSplits[streak] = split;
        localStorage.setItem("bestSplits", JSON.stringify(bestSplits));
        splts.prepend(
          setText(
            "li",
            `streak ${streak}: ${splitTime} new best!${
              bestSplit ? ` (${-timeString(bestSplit - split)})` : ""
            }`,
            ["success"]
          )
        );
        return;
      }

      splts.prepend(
        setText(
          "li",
          `streak ${streak}: ${splitTime}, best: ${timeString(bestSplit)}`
        )
      );
    }
  };

  const registerStreak = () => {
    streak++;
    strk.innerText = strkText.replace(
      "%d%",
      `${streak} ${streak > best ? "new best!" : ""}`
    );
  };

  if (e == decimals.charAt(index)) {
    inp.classList.remove("error");
    document
      .querySelectorAll("button.error")
      .forEach((el) => el.classList.remove("error"));
    inp.classList.add("success");
    pi.appendChild(
      setText("span", e, [
        (index + 1) % 4 ? "digit" : "digitbreak",
        !correct && "wrong",
      ])
    );
    correct = true;
    index++;
    if (unbroken) {
      registerStreak();
      registerTime();
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
        "div",
        `Decimal ${index + 1} is not: ${e}; ${
          time ? timeString(new Date() - time) : ""
        }`
      )
    );
  }
  inp.value = "";
};

inp.addEventListener("keypress", (e) => /\d/.test(e.key) && handleInput(e.key));

handleKeyup = (ev) => {
  if (ev.key === "Escape") reset();
};

reset();
inp.focus();
