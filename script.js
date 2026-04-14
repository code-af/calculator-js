let expression = ""
function clicked(val){
   /*expression += val */
    var text = document.getElementById('screen').value
    if (!isNaN(val)){
        document.getElementById('screen').value += val
    }else{
        if (expression != text){
            expression += text
        } // optional operator fix below
        if (text === "" && expression !== ""){
            expression = expression.slice(0, -1)   
        }
        expression += val
        document.getElementById('screen').value = ""
    }
}
function clearScreen(){
    document.getElementById('screen').value = ""
    expression = ""
}
function backSpace(){
    var text = document.getElementById('screen').value
    document.getElementById('screen').value = text.slice(0, -1)
}
function negativeVal(){
    var text = document.getElementById('screen').value
    if ((text != "") && (!isNaN(text))){
        document.getElementById('screen').value = text * -1
    }
}
function decimalSign(){
    var text = document.getElementById('screen').value
    // if empty text field then start with 0
    if (text === ""){
        document.getElementById('screen').value = "0."
        return
    }// if no decimal exists -> allow
    if (!text.includes(".")){
        document.getElementById('screen').value += "."
    }
}
function percentSign(){
    var text = document.getElementById('screen').value
    if(text !== "" && !isNaN(text)){
        document.getElementById('screen').value = text / 100
    }
}
function equalSign(){
    var text = document.getElementById('screen').value
    var result = eval(expression+text)
    document.getElementById('screen').value = result
    expression = result
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
  const btn = document.getElementById("modeToggle");

  if (document.body.classList.contains("light-mode")) {
    btn.innerText = "🌙 Mode";
  } else {
    btn.innerText = "☀️ Mode";
  }
}