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
];
let totalScore = 0;

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
getRndInteger = (min = 1, max = 10) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
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
        if (!lineResults.includes("s") && !lineResults.includes("c")) {
          score = 5;
          return score;
        }
        // Any combination of CHERRY and 7 on any line 75
        else if (
          !lineResults.includes("o") &&
          !lineResults.includes("d") &&
          !lineResults.includes("t")
        ) {
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

spinResults = () => {
  let reel_left_rnd = getRndInteger();
  let reel_center_rnd = getRndInteger();
  let reel_right_rnd = getRndInteger();
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
  console.log("Top line score = " + topLineScore);
  let centerLineScore = calculateScore(centerLineResults, "center");
  console.log("Center line score = " + centerLineScore);
  let bottomLineScore = calculateScore(bottomLineResults, "bottom");
  console.log("Bottom line score = " + bottomLineScore);
  totalScore = totalScore + topLineScore + centerLineScore + bottomLineScore;
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
  tl.resume();
  setTimeout(() => {
    tl.pause();
    spinResults();
  }, 2000);
};

initialPositions();

// Additional animations
rotateButtonArrow = () => {};
