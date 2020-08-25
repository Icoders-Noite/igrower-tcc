let api=new ApiRequester("https://cors-anywhere.herokuapp.com/https://apiproducts.rj.r.appspot.com")
$("#teste").click(function(){

let a = api.get("/products","")
console.log(a)
})

