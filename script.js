document.addEventListener('click',function(e){
    if(e.target.classList.contains('edit')){
 let x=prompt("enter the new value",e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
 
 axios.post('/update-item',{text:x,id:e.target.getAttribute('data-id')}).then(function(){
e.target.parentElement.parentElement.querySelector('.item-text').innerHTML= x
 }).catch(function(){
    console.log("error,try again")
 })
    }
})
//delete
document.addEventListener('click',function(d){
   if(d.target.classList.contains('delete')){
      confirm("Are You really want to delete?")
  axios.post('/delete-item',{id:d.target.getAttribute('data-id')}).then(function(){
   d.target.parentElement.parentElement.remove()
}).catch(function(){
   console.log("error,try again")
})
}
})
