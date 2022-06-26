const express = require('express');
const { default: simpleGit } = require('simple-git');
const { exec } = require("child_process");
const dotEnv = require("dotenv");
const repos = require("./repositories.json");

dotEnv.config();

const app = express()
const port = 3000

repos.forEach(repo => {
	app.post(`/${repo.id}`, (req, res) => {
		if(req.headers.authorization !== process.env.SECRET)
			return res.status(401).json({error: "Unauthorized"})

		simpleGit(repo.path).pull()
			.then(()=>{
				exec(repo.command, {
					cwd: repo.path
				}, (error, stdout, stderr) =>{
					if(error) return res.status(500).json({error})
					return res.json({success:true})
				})
			})
			.catch(error=>{
				return res.status(500).json({error})
			})
	})
})


app.listen(port, () => {
  console.log(`Autodeploy started`)
})