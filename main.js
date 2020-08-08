const reelItems = [
  {
    name: "oneBar",
    value: "o",
    position: "-1050",
  },
  {
    name: "empty_1",
    value: "e",
    position: "-37.5",
  },
  {
    name: "doubleBar",
    value: "d",
    position: "-150",
  },
  {
    name: "empty_2",
    value: "e",
    position: "-262.5",
  },
  {
    name: "seven",
    value: "s",
    position: "-375",
  },
  {
    name: "empty_3",
    value: "e",
    position: "-487.5",
  },
  {
    name: "trippleBar",
    value: "t",
    position: "-600",
  },
  {
    name: "empty_4",
    value: "e",
    position: "-712.5",
  },
  {
    name: "cherry",
    value: "c",
    position: "-825",
  },
  {
    name: "empty_5",
    value: "e",
    position: "-937.5",
  },
  {
    name: "oneBar",
    value: "o",
    position: "-1050",
  },
  {
    name: "empty_1",
    value: "e",
    position: "-37.5",
  },
  {
    name: "doubleBar",
    value: "d",
    position: "-150",
  },
];
let balanceArea = document.querySelector("#balanceArea");
let totalScore = 5000;

let tl = gsap.timeline({ repeat: -1, paused: true });
tl.fromTo(
  ".reel",
  0.3,
  { y: "-37.5" },
  {
    ease: "none",
    y: "-=1050",
    modifiers: {
      y: gsap.utils.unitize((y) => parseFloat(y) % 1050),
    },
    repeat: -1,
    stagger: 0.2,
  }
);
let mode = "random";

changeMode = (slotMode) => {
  mode = slotMode;
  if (mode === "random") {
    gsap.to(".fixMode", 1, { y: 400, ease: "power4.out" });
    // document.querySelector(".fixMode").style.display = "none";
  } else {
    gsap.to(".fixMode", 1, { y: 0, ease: "power4.out" });
    // document.querySelector(".fixMode").style.display = "block";
  }
};

getRndInteger = (min = 1, max = 10) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
getInteger = (position, symbol) => {
  let value;
  switch (symbol) {
    case "bar":
      value = 10;
      break;
    case "2xbar":
      value = 2;
      break;
    case "3xbar":
      value = 6;
      break;
    case "7":
      value = 4;
      break;
    case "cherry":
      value = 8;
      break;
    default:
      break;
  }
  switch (position) {
    case "top":
      return value + 1;
    case "center":
      return value;
    case "bottom":
      return value - 1;
    default:
      break;
  }
};
calculateScore = (lineResults, line) => {
  console.log(lineResults);
  console.log(lineResults.includes("e"));
  let score = 0;
  if (lineResults.includes("e")) {
    return score;
  } else {
    switch (lineResults.join("")) {
      case "ccc":
        // 3 CHERRY symbols on top line 2000
        // 3 CHERRY symbols on center line 1000
        // 3 CHERRY symbols on bottom line 4000
        score = line === "top" ? 2000 : line === "center" ? 1000 : 4000;
        return score;
      case "sss":
        // 3 7 symbols on any line 150
        score = 150;
        return score;
      case "ttt":
        // 3 3xBAR symbols on any line 50
        score = 50;
        return score;
      case "ddd":
        // 3 2xBAR symbols on any line 20
        score = 20;
        return score;
      case "ooo":
        // 3 BAR symbols on any line 10
        score = 10;
        return score;
      default:
        // Combination of any BAR symbols on any line 5
        let bars = 0;
        lineResults.forEach((item) => {
          if (item === "o" || item === "d" || item === "t") {
            bars = bars + 1;
          }
        });
        if (bars > 1) {
          score = 5;
          return score;
        }
        // Any combination of CHERRY and 7 on any line 75
        else if (lineResults.includes("c") && lineResults.includes("s")) {
          score = 75;
          return score;
        }
        return score;
    }
  }
};

initialPositions = () => {
  let reel_left_rnd = getRndInteger();
  let reel_center_rnd = getRndInteger();
  let reel_right_rnd = getRndInteger();
  spinTo(reel_left_rnd, reel_center_rnd, reel_right_rnd);
};
blinkLine = (lineClass, score) => {
  setTimeout(() => {
    let blink = gsap.timeline({ repeat: 4 });
    blink.fromTo(`.${lineClass}`, 0.2, { opacity: 1 }, { opacity: 0 });
    let balanceBlink = gsap.timeline({ repeat: 4 });
    balanceBlink.fromTo(".balance", 0.2, { opacity: 0 }, { opacity: 1 });
    switch (score) {
      case 4000:
        let cherryBottomPayRowBlink = gsap.timeline({ repeat: 4 });
        cherryBottomPayRowBlink.fromTo(
          ".paytable__row--cherryBottom",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "null" }
        );
        break;
      case 2000:
        let cherryTopPayRowBlink = gsap.timeline({ repeat: 4 });
        cherryTopPayRowBlink.fromTo(
          ".paytable__row--cherryTop",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 1000:
        let cherryCenterPayRowBlink = gsap.timeline({ repeat: 4 });
        cherryCenterPayRowBlink.fromTo(
          ".paytable__row--cherryCenter",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 150:
        let sevenPayRowBlink = gsap.timeline({ repeat: 4 });
        sevenPayRowBlink.fromTo(
          ".paytable__row--seven",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 75:
        let sevenCherryPayRowBlink = gsap.timeline({ repeat: 4 });
        sevenCherryPayRowBlink.fromTo(
          ".paytable__row--sevenCherry",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 50:
        let trippleBarsPayRowBlink = gsap.timeline({ repeat: 4 });
        trippleBarsPayRowBlink.fromTo(
          ".paytable__row--trippleBars",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 20:
        let doubleBarsPayRowBlink = gsap.timeline({ repeat: 4 });
        doubleBarsPayRowBlink.fromTo(
          ".paytable__row--doubleBars",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 10:
        let oneBarsPayRowBlink = gsap.timeline({ repeat: 4 });
        oneBarsPayRowBlink.fromTo(
          ".paytable__row--oneBars",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;
      case 5:
        let barsPayRowBlink = gsap.timeline({ repeat: 4 });
        barsPayRowBlink.fromTo(
          ".paytable__row--bars",
          0.4,
          { opacity: 0, background: "white" },
          { opacity: 1, background: "#220718cc" }
        );
        break;

      default:
        break;
    }
  }, 1000);
};

spinResults = (slotMode) => {
  let reel_left_rnd;
  let reel_center_rnd;
  let reel_right_rnd;
  if (slotMode === "random") {
    reel_left_rnd = getRndInteger();
    reel_center_rnd = getRndInteger();
    reel_right_rnd = getRndInteger();
  } else {
    let leftReelPosition = document.querySelector("#leftReelPosition").value;
    let leftReelSymbol = document.querySelector("#leftReelSymbol").value;
    let centerReelPosition = document.querySelector("#centerReelPosition")
      .value;
    let centerReelSymbol = document.querySelector("#centerReelSymbol").value;
    let rightReelPosition = document.querySelector("#rightReelPosition").value;
    let rightReelSymbol = document.querySelector("#rightReelSymbol").value;
    reel_left_rnd = getInteger(leftReelPosition, leftReelSymbol);
    reel_center_rnd = getInteger(centerReelPosition, centerReelSymbol);
    reel_right_rnd = getInteger(rightReelPosition, rightReelSymbol);
    console.log(reel_left_rnd, reel_center_rnd, reel_right_rnd);
  }
  spinTo(reel_left_rnd, reel_center_rnd, reel_right_rnd);
  let topLineResults = [
    reelItems[reel_left_rnd - 1]["value"],
    reelItems[reel_center_rnd - 1]["value"],
    reelItems[reel_right_rnd - 1]["value"],
  ];
  let centerLineResults = [
    reelItems[reel_left_rnd]["value"],
    reelItems[reel_center_rnd]["value"],
    reelItems[reel_right_rnd]["value"],
  ];
  let bottomLineResults = [
    reelItems[reel_left_rnd + 1]["value"],
    reelItems[reel_center_rnd + 1]["value"],
    reelItems[reel_right_rnd + 1]["value"],
  ];
  let topLineScore = calculateScore(topLineResults, "top");
  if (topLineScore) {
    blinkLine("reelHighlightBox--top", topLineScore);
  }
  console.log("Top line score = " + topLineScore);
  let centerLineScore = calculateScore(centerLineResults, "center");
  if (centerLineScore) {
    blinkLine("reelHighlightBox--center", centerLineScore);
  }
  console.log("Center line score = " + centerLineScore);
  let bottomLineScore = calculateScore(bottomLineResults, "bottom");
  if (bottomLineScore) {
    blinkLine("reelHighlightBox--bottom", bottomLineScore);
  }
  console.log("Bottom line score = " + bottomLineScore);
  totalScore = totalScore + topLineScore + centerLineScore + bottomLineScore;
  balanceArea.value = totalScore;
};

spinTo = (reel_left_rnd, reel_center_rnd, reel_right_rnd) => {
  gsap.to(".reel__left", 1, {
    y: reelItems[reel_left_rnd]["position"],
    ease: "elastic.inOut(1, 0.3)",
  });
  gsap.to(".reel__center", 1, {
    y: reelItems[reel_center_rnd]["position"],
    ease: "elastic.inOut(1, 0.3)",
  });
  gsap.to(".reel__right", 1, {
    y: reelItems[reel_right_rnd]["position"],
    ease: "elastic.inOut(1, 0.3)",
  });
};
change = () => {
  console.log("changed");
};
spin = () => {
  if (totalScore > 0) {
    //disable the spin button
    let spinBut = document.querySelector(".spinBut");
    if (!spinBut.disable) {
      totalScore = totalScore - 1;
      balanceArea.value = totalScore;
      spinBut.classList.toggle("disable");
      spinBut.disable = true;
      gsap.fromTo(
        "#spinIcon",
        2,
        { rotation: 0 },
        { rotation: 720, ease: "elastic.out(1, 0.3)" }
      );
      tl.resume();
      setTimeout(() => {
        tl.pause();
        spinResults(mode);
        spinBut.disable = false;
        spinBut.classList.toggle("disable");
      }, 2000);
    }
  }
};
changeScore = () => {
  totalScore = document.querySelector("#balanceArea").value;
};

initialPositions();

// Additional animations
rotateButtonArrow = () => {};
