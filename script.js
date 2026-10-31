const box = document.querySelectorAll(".box");
const statusText = document.querySelector("#playing");
const restartButton = document.querySelector("#restart");
const resetButton = document.querySelector("#reset");
const report = document.querySelector("#report");
let stat=[0,0,0];
const winCond = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let opt = ["","","","","","","","",""];
let player = "X";
let running = true;

start()
function start(){
    box.forEach(box => box.addEventListener("click", boxChoose));
    restartButton.addEventListener("click", restart);
    resetButton.addEventListener("click", reset);
    statusText.textContent = `${player} 's Turn`;
    report.textContent=`X:${stat[0]}pts , O:${stat[1]}pts , Round:${stat[2]}`;
}
function boxChoose(){
    const cellIndex = this.getAttribute("cellIndex");
    if (opt[cellIndex] != ""  || !running){
        return;
    }
    updateBox(this,cellIndex);
    checkWinner();
}
function updateBox(box,index){
    opt[index]= player;
    box.textContent=player;
}
function changePlayer(){
    player = (player == "X")? "O" : "X";
    statusText.textContent = `${player} 's Turn`;
}
function checkWinner(){
    let won = false;
    for(let i=0;i < winCond.length;i++){
        const cond = winCond[i];
        const boxA=opt[cond[0]];
        const boxB=opt[cond[1]];
        const boxC=opt[cond[2]];
        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }
        if(boxA == boxB && boxB== boxC){
            won=true;
            break;
        }
    }
    if(won){
        statusText.textContent=`${player} wins!!`;
        if(player=="X"){
            stat[0]++;
        }else{
            stat[1]++;
        }
        running = false;
        stat[2]++;
    }
    else if(!opt.includes("")){
        statusText.textContent = `Draw!`
        running=false;
        stat[2]++;
    }
    else{
        changePlayer();
    }
    report.textContent=`X:${stat[0]}pts , O:${stat[1]}pts , Round:${stat[2]}`;
}
function restart(){
    player="X";
    opt = ["","","","","","","","",""];
    statusText.textContent=`${player} 's Turn`;
    box.forEach(box => box.textContent ="");
    running = true;
    start();
}
function reset(){
    stat=[0,0,0];
    report.textContent=`X:${stat[0]}pts , O:${stat[1]}pts , Round:${stat[2]}`;
    restart();
}