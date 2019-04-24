import {Collection, MongoClient} from "mongodb"
import {RemoteTextRecord} from "../core/remoteTextRecord"
import {RemoteTextDocument} from "../core/remoteTextValue"

export interface RemoteTextSchema {
  namespace: string
  lang: string
  document: RemoteTextDocument
}

export interface RemoteTextMongoParams {
  dbName: string
  collectionName: string
}

export interface RemoteTextMongo extends RemoteTextMongoParams {

}

export class RemoteTextMongo {
  _mongo!: MongoClient
  collection!: Collection<RemoteTextSchema>

  constructor(params: RemoteTextMongoParams) {
    this.dbName = params.dbName
    this.collectionName = params.collectionName
  }

  set mongo(mongo: MongoClient) {
    this._mongo = mongo
    this.collection = mongo.db(this.dbName).collection(this.collectionName)
  }

  get mongo() {
    return this._mongo
  }

  saveText(record: RemoteTextRecord) {
    return this.collection.updateOne({
      lang: record.lang,
      namespace: record.namespace
    }, {
      $set: {
        [`document.${record.id}`]: {
          html: record.html
        }
      }
    })
  }

  getDocument(filter: Partial<RemoteTextSchema> = {}) {
    return this.collection.findOne(filter)
  }
}
