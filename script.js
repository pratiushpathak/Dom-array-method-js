const main=document.getElementById('main');
const addUserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const shomMillioners=document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculatewealthBtn=document.getElementById('calculate-wealth');



let data=[];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser()
{
 const res= await fetch('https://randomuser.me/api');
 const data= await res.json();
 //console.log(data);
 const user=data.results[0]
 const newUser={
  name:`${user.name.first} ${user.name.last}`,
  money:Math.floor(Math.random()*1000000)
 }
 //console.log(newUser);
 addData(newUser);
}
//doubles everyones money
function doubleMoney()
{
  data=data.map((user)=>{
   return{...user,money:user.money*2};
  //my code return{name:user.name,money:user.money*2};
  });
  updateDom();
}
//sort by richest
function  sortByRichest()
{
  data.sort((a,b)=>b.money-a.money)
  updateDom();
}
// filter only milliniours
function showMillinniours()
{
  data=data.filter((user)=>{
    return user.money>1000000
  })
  updateDom();
}
// calculate the total wealth
function calculatewealth()
{
  const wealth=data.reduce((acc,user)=>(acc+=user.money),0);
const wealthEl=document.createElement('div');
wealthEl.innerHTML=`<h3>Total Wealth :<strong>${formatMoney(wealth)} </strong> </h3>`;
main.appendChild(wealthEl);

}



//add new obj to data arr
function addData(obj)
{
  data.push(obj);
   updateDom();

}
//update dom
function updateDom(providedData=data)
{
  //clear the main div
  main.innerHTML=`<h2><strong>Person</strong> Wealth</h2>`;

providedData.forEach((item)=>{
  const element=document.createElement('div'); 
  element.classList.add('person');
  element.innerHTML=`<strong>${item.name} </strong>${formatMoney(item.money)}`
  main.appendChild(element);

})
}
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//event listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
shomMillioners.addEventListener('click',showMillinniours)
calculatewealthBtn.addEventListener('click',calculatewealth);