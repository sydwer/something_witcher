const main = document.getElementById('main')
const enter_button = document.createElement('button')
const contractBoard = document.createElement('div')
const banner = document.createElement('img')
banner.className = "banner"
contractBoard.className = "contract_board"


fetch("http://127.0.0.1:3000/monsters")
.then(response => response.json())
.then(storeResponse)
.then(startGame)

function storeResponse(data){
    monsters = data
    console.log(monsters)
}
function startGame(){
    enter_button.textContent = "ENTER"
    enter_button.className = "enter_button"
    enter_button.addEventListener("click",loadContracts)
    banner.src= "something_witcher_this_way_comes.png"
    main.append(banner, enter_button)
    console.log("it worked")
    // loadContracts(monsters)
}

function loadContracts(){
    main.removeChild(enter_button)
    banner.style.height = "10rem"
    monsters.map(monster =>{
        contract = document.createElement('div')
        title = document.createElement('h1')
        image = document.createElement('img')
        place = document.createElement('h3')
        info = document.createElement('p')
        reward = document.createElement('h2')

        contract.className = "contract"

        title.textContent = monster.name 
        console.log(monster.name)
        image.src =  monster.img_src
        place.textContent = monster.place.name
        info.textContent = monster.description
        reward.textContent = monster.reward_amount 

        contract.append(title,image,place,reward)
        contractBoard.appendChild(contract)
    })
   main.appendChild(contractBoard)
}