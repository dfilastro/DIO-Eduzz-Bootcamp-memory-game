"use strict";

let order = [];
let clickedOrder = [];
let score = 0;
let high_score = 0;

//0 - Verde
//1 - Vermelho
//2 - Amarelo
//3 - Azul

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const highScore = document.querySelector(".high-score");
const currentScore = document.querySelector(".current-score");
const buttonStart = document.querySelector(".btn");

buttonStart.addEventListener("click", function (e) {
  e.preventDefault();
  let shuffleOrder = function () {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
      let elementColor = createColorElement(order[i]);
      lightColor(elementColor, Number(i) + 1);
    }
  };

  let lightColor = function (element, number) {
    number = number * 600;
    setTimeout(() => {
      element.classList.add("selected");
    }, number - 300);
    console.log(number);
    setTimeout(() => {
      element.classList.remove("selected");
    }, number + 200);
  };

  let checkOrder = function () {
    for (let i in clickedOrder) {
      if (clickedOrder[i] != order[i]) {
        gameOver();
        break;
      }
    }
    if (clickedOrder.length == order.length) {
      currentScore.textContent = score;
      nextLevel();
    }
  };

  let click = function (color) {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add("selected");

    setTimeout(() => {
      createColorElement(color).classList.remove("selected");
      checkOrder();
    }, 250);
  };

  let createColorElement = function (color) {
    if (color == 0) {
      return green;
    } else if (color == 1) {
      return red;
    } else if (color == 2) {
      return yellow;
    } else if (color == 3) {
      return blue;
    }
  };

  let nextLevel = function () {
    shuffleOrder();
    score++;
  };

  let gameOver = function () {
    alert(
      `Your total score is: ${
        score - 1
      }!\nYou Lose, better lucky next time!\nClick on "ok" to start a new game.`
    );
    order = [];
    clickedOrder = [];
    currentScore.textContent = 0;

    if (score > high_score) {
      high_score = score - 1;
      highScore.textContent = high_score;
    }
    score = 0;

    buttonStart.addEventListener("click", function (e) {
      e.preventDefault();
      playGame();
    });
  };

  let playGame = function () {
    //   alert("Welcome! Are you ready?");
    score = 0;
    order = [];

    nextLevel();
  };

  green.addEventListener("click", click(0));
  red.addEventListener("click", click(1));
  yellow.addEventListener("click", click(2));
  blue.addEventListener("click", click(3));

  green.onclick = () => click(0);
  red.onclick = () => click(1);
  yellow.onclick = () => click(2);
  blue.onclick = () => click(3);

  playGame();
});
