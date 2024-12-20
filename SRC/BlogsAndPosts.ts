// Settings---------------------------------------------------------------

import express from 'express'
import {blogsRouter} from "./routes/Blog-router";
import bodyParser from "body-parser";
import {runDb} from "./db/db";
import {PostsRouter} from "./routes/Post-router";
import {DeleteAllDataRouter} from "./routes/Delete-All-Data-router";
import {usersRouter} from "./routes/User-router";
import {authRouter} from "./routes/Auth-router";
import {feedbackRouter} from "./routes/feedback-router";
import cookieParser from "cookie-parser";
import {securityDevicesRouter} from "./routes/Security-Device_router";
import {assBlockRouter, inspObjRouter, mobAppRouter, photosRouter} from "./routes/Mobile-Application-Router";

export const app = express()
app.use(express.json())
app.use(bodyParser())
app.use(cookieParser())
app.set('trust proxy', true)
const port = 3000


app.use('/blogs', blogsRouter)
app.use('/posts', PostsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/comments', feedbackRouter)
app.use('/security', securityDevicesRouter)
app.use('/', DeleteAllDataRouter)


app.use('/mobileAppData', mobAppRouter)
app.use('/assBlock', assBlockRouter)
app.use('/inspObj', inspObjRouter)
app.use('/photos', photosRouter)




app.listen(port, async () => {
    console.log('Server started...........' + port)
await runDb()
})
