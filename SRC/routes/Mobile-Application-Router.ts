import {Request, Response, Router} from "express";
import {assBlockCollection, inspObjCollection, mobAppCollection, photosCollection} from "../db/db";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'SRC/Images'); // Destination folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.jpg'); // Save all files with .jpg extension
    }
});
export const upload = multer({storage})


export const mobAppRouter = Router()
export const assBlockRouter = Router()
export const inspObjRouter = Router()
export const photosRouter = Router({})

mobAppRouter.post('/login', async (req: Request, res: Response) => {

    const username =  req.body.username
    const password = req.body.password
    console.log(username, password)

    const user = await mobAppCollection.findOne({username: username, password: password})
    console.log(user)
    if(!user) return res.sendStatus(404)

    let result = {
        success: true,
        userId: user._id
    }

    res.status(200).json(result);

})
mobAppRouter.post('/addUser', async (req: Request, res: Response) => {

    let newUser = {
        _id: crypto.randomUUID(),
        username: req.body.username,
        password: req.body.password
    }

    await mobAppCollection.insertOne(newUser)

    res.sendStatus(200)
})
assBlockRouter.post('/addAssignmentBlock', async (req: Request, res: Response) => {

    let newAssBlock = {
        _id: crypto.randomUUID(),
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        loanAgreement: req.body.loanAgreement,
        loanAgreementDate: req.body.loanAgreementDate,
        pledgeAgreement: req.body.pledgeAgreement,
        pledgeAgreementDate: req.body.pledgeAgreementDate,
        status: req.body.status,
        assignmentId: req.body.assignmentId,
        inspectorId: req.body.inspectorId,
        contractId: req.body.contractId,
        customerId: req.body.customerId,
    }

    await assBlockCollection.insertOne(newAssBlock)

    res.sendStatus(200)
})
assBlockRouter.get('/getAssignmentBlocksById/:id', async (req: Request, res: Response) => {

    const userId = req.params.id

    const assBlocksById = await assBlockCollection.find({inspectorId: userId}).toArray()

    res.send(assBlocksById).status(200)
})
inspObjRouter.post('/addInspObj', async (req: Request, res: Response) => {

    let newInspObj = {
        _id: crypto.randomUUID(),
        inventoryNumber: req.body.inventoryNumber,
        address: req.body.address,
        assignmentBlockId: req.body.assignmentBlockId,
        description: req.body.description,
        name: req.body.name,
    }

    await inspObjCollection.insertOne(newInspObj)

    res.sendStatus(200)
})
inspObjRouter.get('/getInspObjectByBlockId/:id', async (req: Request, res: Response) => {

    const blockId = req.params.id

    const inspObject = await inspObjCollection.find({assignmentBlockId: blockId}).toArray()

    res.send(inspObject).status(200)
})
inspObjRouter.get('/getInspObjectById/:id', async (req: Request, res: Response) => {

    const objectId = req.params.id

    const inspObject = await inspObjCollection.findOne({_id: objectId})

    res.send(inspObject).status(200)
})
inspObjRouter.put('/:id', async (req: Request, res: Response) => {

    const objectId = req.params.id

    const inspObject = await inspObjCollection.updateOne({_id: objectId},{
        $set: {
            inventoryNumber: req.body.inventoryNumber,
            name: req.body.name,
            model: req.body.model,
            serialNumber: req.body.serialNumber,
            status: req.body.status,
        }
    })

    res.sendStatus(200)
})

photosRouter.post('/add', upload.single('photo'), async (req: Request, res: Response) => {

    const file = req.file
    if (!file && file === undefined) res.sendStatus(400)
    console.log(req.body)

    let newPhoto = {
        _id: crypto.randomUUID(),
        inspectionObjectId: req.body.inspectionObjectId,
        description: req.body.description,
        fieldName: req.file!.filename,
        originalName: req.file!.originalname,
        encoding: req.file!.encoding,
        mimetype: req.file!.mimetype,
        destination: req.file!.destination,
        filename: req.file!.filename,
        path: req.file!.path,
        size: req.file!.size,
    }


    await photosCollection.insertOne(newPhoto)

    res.sendStatus(200)

})

