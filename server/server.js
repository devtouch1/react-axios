const express = require('express')
const app = express()
const axios = require('axios')

const api = axios.create({
  baseURL: "https://doubtful-lamb-gown.cyclic.app/",
});


app.get("/api", (req, res)=>{
	api.get('uploads/ordenado/')
	.then((response) => {console.log(response.data)
		res.json(response.data)
	})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
})

app.post('/api', (req, res) => {
	const { respostas, contador, id, description } = req.query;
	console.log("//////////////////QUERY"+req.query);
  
	api
	  .post('/update', null, {
		params: { respostas, contador, id, description },
	  })
	  .then((response) => {
		console.log(req);
		console.log(response.data);
		res.json(response.data);
	  })
	  .catch((err) => {
		console.error('Ops! Ocorreu um erro: ' + err + "request: "+ req);
		res.status(500).json({ error: 'Erro ao fazer a solicitação para a API' });
	  });
  });

app.listen(5000, ()=>{
	console.log("server is running on 5000")
})