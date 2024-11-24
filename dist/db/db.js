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
exports.runDb = exports.photosCollection = exports.inspObjCollection = exports.assBlockCollection = exports.mobAppCollection = exports.requestsToUrlCollection = exports.securityDeviceCollection = exports.tokenBlackListCollection = exports.usersAccountCollection = exports.feedbackCollection = exports.userCollection = exports.postsCollection = exports.blogCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
exports.client = new mongodb_1.MongoClient(mongoURI);
exports.db = exports.client.db('test');
exports.blogCollection = exports.db.collection('Blog');
exports.postsCollection = exports.db.collection('Posts');
exports.userCollection = exports.db.collection('Users');
exports.feedbackCollection = exports.db.collection('Feedback');
exports.usersAccountCollection = exports.db.collection('UsersAccounts');
exports.tokenBlackListCollection = exports.db.collection('Token_Black_List');
exports.securityDeviceCollection = exports.db.collection('Security Devices');
exports.requestsToUrlCollection = exports.db.collection('Amount Requests to URL');
exports.mobAppCollection = exports.db.collection('Mobile Application Auth');
exports.assBlockCollection = exports.db.collection('Assignment Block');
exports.inspObjCollection = exports.db.collection('Inspection Object');
exports.photosCollection = exports.db.collection('Photos');
console.log(process.env.MONGO_URL);
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("BlogsDb").command({ ping: 1 });
            console.log("Connected to mongo server");
        }
        catch (_a) {
            console.log("Can't connect to bd");
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
//# sourceMappingURL=db.js.map