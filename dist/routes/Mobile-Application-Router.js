"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photosRouter = exports.inspObjRouter = exports.assBlockRouter = exports.mobAppRouter = exports.upload = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'SRC/Images'); // Destination folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.jpg'); // Save all files with .jpg extension
    }
});
exports.upload = (0, multer_1.default)({ storage });
exports.mobAppRouter = (0, express_1.Router)();
exports.assBlockRouter = (0, express_1.Router)();
exports.inspObjRouter = (0, express_1.Router)();
exports.photosRouter = (0, express_1.Router)({});
exports.mobAppRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    const user = yield db_1.mobAppCollection.findOne({ username: username, password: password });
    console.log(user);
    if (!user)
        return res.sendStatus(404);
    let result = {
        success: true,
        userId: user._id
    };
    res.status(200).json(result);
}));
exports.mobAppRouter.post('/addUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = {
        _id: crypto.randomUUID(),
        username: req.body.username,
        password: req.body.password
    };
    yield db_1.mobAppCollection.insertOne(newUser);
    res.sendStatus(200);
}));
exports.assBlockRouter.post('/addAssignmentBlock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    yield db_1.assBlockCollection.insertOne(newAssBlock);
    res.sendStatus(200);
}));
exports.assBlockRouter.get('/getAssignmentBlocksById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const assBlocksById = yield db_1.assBlockCollection.find({ inspectorId: userId }).toArray();
    res.send(assBlocksById).status(200);
}));
exports.inspObjRouter.post('/addInspObj', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newInspObj = {
        _id: crypto.randomUUID(),
        inventoryNumber: req.body.inventoryNumber,
        address: req.body.address,
        assignmentBlockId: req.body.assignmentBlockId,
        description: req.body.description,
        name: req.body.name,
    };
    yield db_1.inspObjCollection.insertOne(newInspObj);
    res.sendStatus(200);
}));
exports.inspObjRouter.get('/getInspObjectByBlockId/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blockId = req.params.id;
    const inspObject = yield db_1.inspObjCollection.find({ assignmentBlockId: blockId }).toArray();
    res.send(inspObject).status(200);
}));
exports.inspObjRouter.get('/getInspObjectById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = req.params.id;
    const inspObject = yield db_1.inspObjCollection.findOne({ _id: objectId });
    res.send(inspObject).status(200);
}));
exports.inspObjRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = req.params.id;
    const inspObject = yield db_1.inspObjCollection.updateOne({ _id: objectId }, {
        $set: {
            inventoryNumber: req.body.inventoryNumber,
            name: req.body.name,
            model: req.body.model,
            serialNumber: req.body.serialNumber,
            status: req.body.status,
        }
    });
    res.sendStatus(200);
}));
exports.photosRouter.post('/add', exports.upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file && file === undefined)
        res.sendStatus(400);
    console.log(req.body);
    let newPhoto = {
        _id: crypto.randomUUID(),
        inspectionObjectId: req.body.inspectionObjectId,
        description: req.body.description,
        fieldName: req.file.filename,
        originalName: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
    };
    yield db_1.photosCollection.insertOne(newPhoto);
    res.sendStatus(200);
}));
//# sourceMappingURL=Mobile-Application-Router.js.map