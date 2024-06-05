const list=document.getElementById("list_agence");
const list_agences=document.getElementById("AGENCES");
const list_opera=document.getElementById("list_opera");
const recup_formulaire=document.getElementById("formulaire");

function agence(){
    fetch("http://localhost:3000/agences")
.then(function (reponse ){
    return reponse.json();
        
} )
.then( function (data){
    console.log(data);
    const mes_agences = data.forEach((agence)=>{
        const item_agences=document.createElement("div");
        item_agences.setAttribute("class","border");
        const titre=document.createElement("h3");
        titre.textContent=agence.name;
        item_agences.appendChild(titre);
        const deviseusd=document.createElement("h4");
        const devisecdf=document.createElement("h4");
        const count= document.createElement("h5");
        deviseusd.textContent=agence.usd+" USD";
        devisecdf.textContent=agence.cdf+" CDF";
        count.textContent=agence.count;
        item_agences.appendChild(deviseusd);
        item_agences.appendChild(devisecdf);
        list.appendChild(item_agences); 
        const option_item=document.createElement("option");
        option_item.setAttribute("value",agence.name);
        option_item.textContent=agence.name;
        list_agences.appendChild(option_item);
    }        
        
    ); 
    return mes_agences;
}
    )
.catch(error => console.log(error));
}
function operations(){
    fetch("http://localhost:3000/operations")
    .then(reponse=>reponse.json())
    .then(data=>
        
     data.forEach(operations=>{
        const item_operations=document.createElement("div");
              item_operations.setAttribute("class","border");
        const lien_item=document.createElement("a");
              lien_item.setAttribute("href","operations");
              item_operations.appendChild(lien_item);
        const titre_item=document.createElement("h3");
              titre_item.textContent=operations.agence;
              lien_item.appendChild(titre_item) 
              list_opera.appendChild(item_operations);
              
     })
    )
    .then().catch(error=>console.log(error))
}  
function ajouts_operations(event){
    event.preventDefault()
const recup_exp=document.getElementById("EXPEDITEUR");
const recup_ben=document.getElementById("DESTINATEUR");
const recup_montant=document.getElementById("MONTANT").value;
const recup_agence=document.getElementById("AGENCES").value;
const recup_devise=document.getElementById("box_devise");
let _devise;
recup_devise.querySelectorAll('input[type=radio]').forEach((function(radio){
    if (radio.checked){
         _devise=radio.id;
    }
}))

        fetch('http://localhost:3000/operations',{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({
                'expediteur': recup_exp.value,
                'destinateur':recup_ben.value,
                "montant":recup_montant,
                "devise":_devise,
                "agence":recup_agence
            })
        })
        .then(reponse=>reponse.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error));
        fetch('http://localhost:3000/agences')
        .then(reponse=>reponse.json())
        .then(data=> data
            .filter(agence=>agence.name===recup_agence)
            .find(agence=>modif_agence(agence,{devise:_devise, montant:recup_montant})))
        .catch(error=>console.log(error))
        
        list_opera.replaceChildren;
        operations()

}


recup_formulaire.addEventListener("submit",ajouts_operations);
operations();
agence();
function modif_agence(agence,opera){
    
    const {id, name, code, usd, cdf, count}=agence;
    const {devise, montant}=opera;
    if(devise==="usd"){
        fetch("http://localhost:3000/agences/"+id,{
                method:'PUT',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    code,
                    usd:parseInt(usd)+parseInt(montant),
                    cdf,
                    count:count+1,                   
                })
            }).then(reponse=>reponse.json())
            .then(data=>console.log(data))
            .catch(error=>console.log(error));
    }else{
        fetch("http://localhost:3000/agences/"+id,{
                method:'PUT',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    code,
                    usd,
                    cdf:parseInt(cdf)+parseInt(montant),
                    count:count+1,                   
                })
            }).then(reponse=>reponse.json())
            .then(data=>console.log(data))
            .catch(error=>console.log(error));
    }
            
       
    
    
    fetch("http://localhost:3000/agences/"+_id,{
        method:'PUT',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            count:1,
            usd:montant
        })
    }).then(reponse=>reponse.json())
    .then(data=>console.log(data))
    .catch(error=>console.log(error));
}

function delete_opera (_id){
    fetch('http://localhost:3000/operations/'+_id,{
        method:'DELETE'        
    }).then(()=>alert("operation supprimer"))
    .catch((err)=>console.log("error: "+err))
}

delete_opera("d72d");