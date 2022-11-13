const inputEl = document.getElementById("input-el")
const saveBtn = document.querySelector("#save-btn")
const delBtn = document.querySelector("#delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.querySelector("#ul-el")


const leadsStringFromLocalStorage = localStorage.getItem("savedLeads")
let myLeads = []

if (leadsStringFromLocalStorage) {
	myLeads = JSON.parse(leadsStringFromLocalStorage)
	renderLeads(myLeads)
}


saveBtn.addEventListener("click",function() {
	myLeads.push(inputEl.value) 
	localStorage.setItem("savedLeads",JSON.stringify(myLeads))
	inputEl.value = ""
	renderLeads(myLeads)
})

tabBtn.addEventListener("click",function() {
	chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
//	ulEl.innerHTML = `<li>${myLeads[0]}</li>`
	myLeads.push(tabs[0].url)
	renderLeads(myLeads)
	localStorage.setItem("savedLeads",JSON.stringify(myLeads))
		})
})

delBtn.addEventListener("dblclick",function() {
	myLeads=[]
	localStorage.clear()
	renderLeads(myLeads)
})

function renderLeads(leads) {
	let listItems = ""
	for (let i = 0; i < leads.length; i++) {
	//ulEl.innerHTML += "<li>" + leads[i] + "</>"
	//const li = document.createElement("li")
	//li.textContent = leads[i]
	//ulEl.append(li)
	//listItems += "<li><a  target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>"
	listItems += `
		<li>
			<a target='_blank' href='${leads[i]}'>
				${leads[i]}
			</a>
		</li>		
	`
}
ulEl.innerHTML = listItems
}  