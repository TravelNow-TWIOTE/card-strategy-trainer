let points = 1000
let wager = 0
let deck = []
let player = []
let dealer = []
let active = false

function update(){
document.getElementById("points").innerText = "Points: " + points
}

function deckBuild(){
deck = []
let suits = ["♠","♥","♦","♣"]
let ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

for(let s of suits){
for(let r of ranks){
deck.push({r,s})
}
}

deck.sort(()=>Math.random()-0.5)
}

function value(c){
if(c.r==="A") return 11
if(["K","Q","J"].includes(c.r)) return 10
return parseInt(c.r)
}

function total(hand){
let t = 0
let aces = 0

for(let c of hand){
t += value(c)
if(c.r==="A") aces++
}

while(t>21 && aces>0){
t -= 10
aces--
}

return t
}

function draw(){
return deck.pop()
}

function render(){

document.getElementById("player").innerText =
player.map(c=>c.r+c.s).join(" ")

if(active){
document.getElementById("dealer").innerText =
"?? " + dealer[1].r + dealer[1].s
document.getElementById("dealerTotal").innerText = "Total: ?"
}
else{
document.getElementById("dealer").innerText =
dealer.map(c=>c.r+c.s).join(" ")
document.getElementById("dealerTotal").innerText =
"Total: " + total(dealer)
}

document.getElementById("playerTotal").innerText =
"Total: " + total(player)

update()
}

function start(){

if(active) return

wager = parseInt(document.getElementById("bet").value)

if(isNaN(wager) || wager<=0){
document.getElementById("msg").innerText = "Enter valid points"
return
}

if(wager>points){
document.getElementById("msg").innerText = "Not enough points"
return
}

deckBuild()

player = [draw(),draw()]
dealer = [draw(),draw()]

active = true

render()

if(total(player)===21){
document.getElementById("msg").innerText = "Perfect 21!"
points += Math.floor(wager*1.5)
active = false
render()
update()
}
}

function hit(){

if(!active) return

player.push(draw())

if(total(player)>21){
finish()
}

render()
}

function stand(){

if(!active) return

while(total(dealer)<17){
dealer.push(draw())
}

finish()
}

function doublePlay(){

if(!active) return

wager *= 2
player.push(draw())
stand()
}

function finish(){

active = false

let p = total(player)
let d = total(dealer)

if(p>21){
points -= wager
document.getElementById("msg").innerText = "Bust"
}
else if(d>21 || p>d){
points += wager
document.getElementById("msg").innerText = "You win"
}
else if(p<d){
points -= wager
document.getElementById("msg").innerText = "Dealer wins"
}
else{
document.getElementById("msg").innerText = "Tie"
}

render()
update()
}

function add(){
points += 1000
update()
}

update()
