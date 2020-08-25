class ApiRequester {

    constructor(urlAPI) {
        this.enderecoApi = urlAPI

    }

   


    get(endpoit, params) {

        let url = `${this.enderecoApi}${endpoit}${params}`
        let xhr = new XMLHttpRequest()
       
        
        let response
        xhr.open('GET', url)
        xhr.setRequestHeader("x-requested-with" ,"xhr" )
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                }
            }
        };

        xhr.send();
        return response;

    }
}