let points = 1000
let wager = 0

let deck = []
let player = []
let dealer = []

let gameActive = false
let insuranceBet = 0

function updatePoints(){
document.getElementById("points").innerText = "Points: " + points
}

function createDeck(){
deck=[]
let suits=["♠","♥","♦","♣"]
let ranks=["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

for(let s of suits){
for(let r of ranks){
deck.push({rank:r,suit:s})
}
}

deck.sort(()=>Math.random()-0.5)
}

function cardValue(card){
if(card.rank==="A") return 11
if(["K","Q","J"].includes(card.rank)) return 10
return parseInt(card.rank)
}

function handValue(hand){
let total=0
let aces=0

for(let c of hand){
total+=cardValue(c)
if(c.rank==="A") aces++
}

while(total>21 && aces>0){
total-=10
aces--
}

return total
}

function draw(){
return deck.pop()
}

function render(){
document.getElementById("playerCards").innerText =
player.map(c=>c.rank+c.suit).join(" ")

document.getElementById("dealerCards").innerText =
dealer.map(c=>c.rank+c.suit).join(" ")

document.getElementById("playerTotal").innerText =
"Total: "+handValue(player)

document.getElementById("dealerTotal").innerText =
"Total: "+handValue(dealer)

updatePoints()
}

function placeWager(){

if(gameActive) return

wager=parseInt(document.getElementById("wagerInput").value)

createDeck()

player=[draw(),draw()]
dealer=[draw(),draw()]

gameActive=true
insuranceBet=0

render()

if(dealer[0].rank==="A"){
document.getElementById("message").innerText="Dealer shows Ace. Insurance available."
}else{
document.getElementById("message").innerText=""
}

}

function hit(){

if(!gameActive) return

player.push(draw())

if(handValue(player)>21){
endRound()
}

render()
}

function stand(){

if(!gameActive) return

while(handValue(dealer)<17){
dealer.push(draw())
}

endRound()

render()
}

function doubleDown(){

if(!gameActive) return

wager*=2

player.push(draw())

stand()

}

function split(){

if(!gameActive) return

if(player.length!==2) return
if(player[0].rank!==player[1].rank) return

player=[player[0],draw()]

render()
}

function insurance(){

if(!gameActive) return

insuranceWager=wager/2
points-=insuranceWager

document.getElementById("message").innerText="Insurance placed"

updatePoints()

}

function endRound(){

gameActive=false

let playerTotal=handValue(player)
let dealerTotal=handValue(dealer)

if(playerTotal>21){
bankroll-=bet
document.getElementById("message").innerText="Bust! You lose."
}

else if(dealerTotal>21 || playerTotal>dealerTotal){
bankroll+=bet
document.getElementById("message").innerText="You win!"
}

else if(playerTotal<dealerTotal){
bankroll-=bet
document.getElementById("message").innerText="Dealer wins."
}

else{
document.getElementById("message").innerText="Push."
}

updatePoints()
}

function rebuy(){
points+=1000
updatePoints()
}

updatePoints()
