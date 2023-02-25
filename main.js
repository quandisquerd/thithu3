import { render, router } from "./lib"
import project from "./page/project"
import "bootstrap/dist/css/bootstrap.min.css"

import edit from "./page/edit"
import add from "./page/add"

const app =document.querySelector("#app")
router.on("/project",()=>render(project,app))
router.on("/project/:id/edit", ({data}) => render(()=>edit(data), app))
router.on("/project/add", () => render(add, app))
router.resolve()