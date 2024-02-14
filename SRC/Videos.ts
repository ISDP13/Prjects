
// DATA  ---------------------------------------

import express, {Request, Response, Router} from 'express'
import {videosRouter} from "./routes/Videos-router";
import {body} from "express-validator";
export const app = express()


app.use(express.json())

const AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: typeof AvailableResolution

}

const port = 5000

app.listen(port,() => {
    console.log(`Server Starts ${port}`)
})

let videos: VideoType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-02-03T10:07:33.179Z",
        publicationDate: "2024-02-03T10:07:33.179Z",
        availableResolutions: [
            "P144"]
    }, {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-02-03T10:07:33.179Z",
        publicationDate: "2024-02-03T10:07:33.179Z",
        availableResolutions: [
            "P144"]
    }
    ];


// script ----------------------------------------------------

type RequestWithBody<B> = Request<unknown, unknown, B, unknown>

type Param = {
    id: number
}

type createVideoType = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolution
}

type errorMessageType = {
    field: string
    message: string
}

type errorType = {
    errorsMessages: errorMessageType[]
}


app.use('/videos', videosRouter)


app.delete ('/testing/all-data', (req: Request, res: Response) => {
        videos.length = 0;
        res.sendStatus(204);
    })


