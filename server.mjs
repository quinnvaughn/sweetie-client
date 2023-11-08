import { createRequestHandler } from "@remix-run/express"
import { broadcastDevReady } from "@remix-run/node"
import express from "express"

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js"

const app = express()
app.use(express.static("public"))

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }))

const port = process.env.PORT || 3000

const host = process.env.HOST || "localhost"

app.listen(port, host, () => {
	if (process.env.NODE_ENV === "development") {
		broadcastDevReady(build)
	}
	console.log(`App listening on http://${host}:${port}`)
})
