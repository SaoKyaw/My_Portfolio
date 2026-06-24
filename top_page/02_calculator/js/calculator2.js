// ワークエリア
var wkFirst = "1"; //初回FLG
var wkTotal = 0;  //合計
var wkInput = ""; //現在クリックされたボタンの値
var wkCalc = "+"; //初期値 "+"
var wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
const elementcalcLog = document.getElementById("calcLog");
const elementResult = document.getElementById("result");

const elementnum1 = document.getElementById("num1");
const elementnum2 = document.getElementById("num2");
const elementnum3 = document.getElementById("num3");
const elementnum4 = document.getElementById("num4");
const elementnum5 = document.getElementById("num5");
const elementnum6 = document.getElementById("num6");
const elementnum7 = document.getElementById("num7");
const elementnum8 = document.getElementById("num8");
const elementnum9 = document.getElementById("num9");
const elementnum0 = document.getElementById("num0");

const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mult");
const elementDiv = document.getElementById("div");

const elementEqual = document.getElementById("equal");
const elementCancel = document.getElementById("cancel");

// イベントを登録
elementnum1.addEventListener("click", function(){ edit(1); });
elementnum2.addEventListener("click", function(){ edit(2); });
elementnum3.addEventListener("click", function(){ edit(3); });
elementnum4.addEventListener("click", function(){ edit(4); });
elementnum5.addEventListener("click", function(){ edit(5); });
elementnum6.addEventListener("click", function(){ edit(6); });
elementnum7.addEventListener("click", function(){ edit(7); });
elementnum8.addEventListener("click", function(){ edit(8); });
elementnum9.addEventListener("click", function(){ edit(9); });
elementnum0.addEventListener("click", function(){ edit(0); });

elementAdd.addEventListener("click", function(){ update("+"); });
elementSub.addEventListener("click", function(){ update("-"); });
elementMult.addEventListener("click", function(){ update("*"); });
elementDiv.addEventListener("click", function(){ update("/"); });

elementEqual.addEventListener("click", dispResult);
elementCancel.addEventListener("click", clear);

/** 数字がクリックされたときの処理 */
function edit(wkInput) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
      elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); //入力値の結合（ゼロサプレスして結合）
  } 
  // １つ前の入力が、演算子
  else {
    elementResult.innerHTML = wkInput;
  }
  wkFirst = "0"; //初回FLG off
  wkBefore = "0";
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementResult.innerHTML) + calcType; //計算ログ
    calculator();
  } 
  // １つ前の入力が演算子（演算子 入力しなおし）
  else {
    // 初回入力
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType; //計算ログ
    }
    else {
      // 演算子 入力しなおし
      let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); //ログ最後の１文字
      if (["+","-","*","/"].includes(wkLogLastWord)) {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType; //計算ログ　末尾1文字（前回の演算子）を削除
      }
      // イコールの後の演算子
      else {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType; //計算ログ
      }
    }
  }
  wkCalc = calcType;  //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dispResult() {
  if (wkFirst === "0" && wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementResult.innerHTML);
    calculator();
    wkCalc = "=";
    wkBefore = "1";
  }
}

/** 計算結果をクリアします。(clear Result) */
function clear() {
  elementResult.innerHTML = 0;
  elementcalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}

// 計算
function calculator() {
  switch (wkCalc){
    case "+":
      wkTotal = Number(wkTotal) + Number(elementResult.innerHTML);
      break;
    case "-":
      wkTotal = Number(wkTotal) - Number(elementResult.innerHTML);
      break;
    case "*":
      wkTotal = Number(wkTotal) * Number(elementResult.innerHTML);
      break;
    case "/":
      wkTotal = Number(wkTotal) / Number(elementResult.innerHTML);
      break;
  }
  elementResult.innerHTML = wkTotal;
}

//Sample1 KeyboardEvent
document.body.addEventListener("keydown",
  event =>{
    if(event.key === "v" && encodeURIComponent.ctrlKey){
      alert("Ctrl + V が押されました")
    }
  });

//Sample2 KeyboardEvent
document.body.addEventListener("keydown",
    contorlV, false);

function contorlV(event){
  if(event.key === "v" && event.ctrlKey){
    alert("Ctrl + Vが押されました。")
  }
}

document.body.addEventListener("keydown",
  d, false);

function d(event){
  if(event.key === "d"){
    alert("d が押されました。" )
  }
}

document.body.addEventListener("keydown",
  ShiftD, false);

function ShiftD(event){
  if(event.key === "d" && event.ShiftKey){
    alert("D が押されました。" )
  }
}
document.body.addEventListener("keydown",
  One, false);

function One(event){
  if(event.key === "1"){
    alert("Digit 1 が押されました。" )
  }
}

document.body.addEventListener("keydown",
  Shift1, false);

function Shift1(event){
  if(event.key === "!" && event.ShiftKey){
    alert("! が押されました。" )
  }
}

document.body.addEventListener("keydown",
  Alt, false);

function Alt(event){
  if(event.key === event.AltKey){
    alert("Alt が押されました。" )
  }
}

document.body.addEventListener("keydown",
  ctrl, false);

function ctrl(event){
  if(event.key === event.ctrl){
    alert("ctrl が押されました。" )
  }
}

document.body.addEventListener("keydown",
  command, false);

function command(event){
  if(event.key === event.commandKey){
    alert("command が押されました。" )
  }
}

  