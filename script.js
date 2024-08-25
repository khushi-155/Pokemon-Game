
let player1Score = 0;
let player2Score = 0;
function getDetails(){
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response)=>response.json())
    .then((data)=>{
    const pokemonArray =data.results;
    const index1 = Math.floor(Math.random()*pokemonArray.length);
    const index2 = Math.floor(Math.random()*pokemonArray.length);
    const card1 = pokemonArray[index1];
    const card2 = pokemonArray[index2];
        if(index1!=index2){
         aboutPokemon(card1,card2);
        }
        else{
           getDetails();  
        }
    });
    const divEle1 = document.getElementById('player1');
    const divEle2 = document.getElementById('player2');
    function aboutPokemon(card1,card2){
        fetch(card1.url).then((response)=>response.json()).then((card1data)=>{
         const result1 =   
         ` <div id="card_header">
            <span id="p1_name">${card1data.name}</span>
            <span id="p1_score">${player1Score}</span>
    
    </div>
    <div id="card1">
            <div id = "img">
              <img src = ${card1data.sprites.other['official-artwork'].front_default}>
            </div>
            <span id="name">${card1data.name}</span>
            <span id="experience">${card1data.base_experience}</span>
            <ul id="abilities">Abilities: ${card1data.abilities.map(ability => ability.ability.name).join(', ')}</ul>
    </div>`
      divEle1.innerHTML = result1;

        fetch(card2.url).then((response)=>response.json()).then((card2data)=>{
            const result2 = `  <div id="card_header">
                <span id="p2_name">${card2data.name}</span>
                <span id="p2_score">${player2Score}</span>
                </div>
                <!-- player2 -->
                <div id="card2">
                        <div id = "img">
                           <img src = ${card2data.sprites.other['official-artwork'].front_default}>
                        </div>
                        <span id="name">${card2data.name}</span>
                        <span id="experience">${card2data.base_experience}</span>
                        
                        <ul id="abilities">Abilities: ${card2data.abilities.map(ability => ability.ability.name).join(', ')}</ul>
                </div>`
            divEle2.innerHTML = result2;
            if (card1data.base_experience > card2data.base_experience) {
                player1Score++;
            } else if (card1data.base_experience < card2data.base_experience) {
                player2Score++;
            }


            document.getElementById('p1_score').textContent = player1Score;
             document.getElementById('p2_score').textContent = player2Score;
            
        })
    })        
    }
    }
    const fightBtn = document.getElementById('fight');
    fightBtn.addEventListener('click',getDetails);