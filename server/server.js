const express = require('express')
const app = express()
const axios = require('axios')

const api = axios.create({
  baseURL: "https://doubtful-lamb-gown.cyclic.app/",
});


app.get("/api", (req, res)=>{
	api.get('uploads/')
	.then((response) => {console.log(response.data)
		res.json(response.data)
	})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
})

app.listen(5000, ()=>{
	console.log("server is running on 5000")
})