import {Request, Response, Router} from "express";
import {app} from "../Videos";
import {VideosRepository} from "../repositories/Videos-repository";
import {body, validationResult} from "express-validator";


export const videosRouter = Router({})

// export {body} from 'express-validator'

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

type Param = {
    id: number
}

const AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']


type RequestWithBody<B> = Request<unknown, unknown, B, unknown>

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

// Middlelewer
const checkValidationTitle = body('title').isLength({min:3, max: 40})


videosRouter.get ('/', (req: Request, res: Response) => {
    res.send(videos)
})


// Занес в репозиторий---------------------------------
videosRouter.get('/:id', (req: Request<Param>, res: Response) => {

    let FoundedVideos = VideosRepository.FindVideosByID(+req.params.id)

    if (!FoundedVideos) {
        res.sendStatus(404)
        return
    } else {
        res.status(200).send(FoundedVideos)
    }
})


// Занес в репозиторий-----------------------------------
videosRouter.post('/',
    checkValidationTitle,
    body('author').trim().isLength({min:3, max: 20}),
    // можно это все вынести в конст потому что такая же проверка будет в других методах пример сверху
    (req: RequestWithBody<createVideoType>, res: Response) => {

    const errors: errorType = {
        errorsMessages: []
    }

    let {author, title, availableResolutions } = req.body
    let PostVideo = VideosRepository.PostNewVideo(req.body.author,req.body.title, req.body.availableResolutions)

    // @ts-ignore
        const missConduction = validationResult(req)
    if (!missConduction.isEmpty()) {
        return res.status(400).json('missConduction')
    }

    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40){
        errors.errorsMessages.push({message: 'Incorrect title', field: 'title'} )
    }

    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20){
        errors.errorsMessages.push({message: 'Incorrect author', field: 'author'} )
    }

    if(Array.isArray(availableResolutions)) {
        availableResolutions.map(r => {
            !AvailableResolution.includes(r) && errors.errorsMessages.push({
                message : "Invalid availableResolutions",
                field : 'availableResolutions'
            })
        })
    } else {
        availableResolutions = [];
    }
    if (errors.errorsMessages.length){
        res.status(400).send(errors)
        return
    }
    res.send(PostVideo)
    videos.push(PostVideo)
    // videos.push(PostVideo)
    //
    // const createdAt = new Date()
    // const publicationData = new Date()
    // publicationData.setDate(createdAt.getDate()+1)
    // const newVideo: VideoType = {
    //     id: +(new Date()),
    //     canBeDownloaded: false,
    //     minAgeRestriction: null,
    //     createdAt: createdAt.toISOString(),
    //     publicationDate: publicationData.toISOString(),
    //     title,
    //     author,
    //     availableResolutions
    //
    // }
    // videos.push(newVideo)
    // res.status (201).send(newVideo)

})

videosRouter.put(`/:id`,(req: Request, res : Response) => {

    const  id: number = +req.params.id

    let error : errorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        error.errorsMessages.push({message:'Incorrect title', field: 'title'})}


    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        error.errorsMessages.push({message:'Incorrect author', field: 'author'})
    }

    if(Array.isArray(availableResolutions)) {
        availableResolutions.map(r => {
            !AvailableResolution.includes(r) && error.errorsMessages.push({
                message : "Invalid availableResolutions",
                field : 'availableResolutions'
            })
        })
    } else {
        availableResolutions = [];
    }



    if (typeof canBeDownloaded === 'undefined' ) {
        canBeDownloaded = false;
    }
    if(typeof canBeDownloaded != "boolean") {
        error.errorsMessages.push({
            message : "Invalid canBeDownloaded",
            field : 'canBeDownloaded'
        })
    }

    const dateInspection: boolean = (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gi).test(publicationDate);
    if (typeof publicationDate != "undefined" && !dateInspection ) {
        error.errorsMessages.push({
            message : "Invalid publicationDate",
            field : 'publicationDate'
        })
    }


    if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === "number" ) {
        minAgeRestriction < 1 || minAgeRestriction > 18  &&  error.errorsMessages.push({
            message : "Invalid minAgeRestriction",
            field : 'minAgeRestriction'
        })
    } else {
        minAgeRestriction = null;
    }

    if (error.errorsMessages.length) {
        res.status(400).send(error)
        return
    }


    const videoIndex : number = videos.findIndex(v => v.id == id);
    const video : VideoType | undefined = videos.find(v =>  v.id === id );

    if (!video) {

        res.sendStatus(404)
        return;
    }

    const updateItems : VideoType = {
        ...video,
        canBeDownloaded,
        minAgeRestriction,
        title,
        author,
        publicationDate : publicationDate ? publicationDate : video.publicationDate,
        availableResolutions
    }

    videos.splice(videoIndex, 1, updateItems)
    res.sendStatus(204)

})


videosRouter.delete('/:id', (req, res) => {

    const targetVideos = videos.findIndex(v => v.id === +req.params.id)
    videos = videos.filter(v => v.id !== +req.params.id);

    if (targetVideos === -1) {
        res.send(404);
        return;
    } else {
        res.sendStatus(204);
    }
});
