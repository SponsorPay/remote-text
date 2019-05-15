import {Collection, MongoClient} from "mongodb"
import * as sanitizeHtml from "sanitize-html"
import {Option} from "tsla-util/lib/option"
import {RemoteTextRecord} from "../core/remoteTextRecord"
import {RemoteTextDocument} from "../core/remoteTextValue"

const allowedTags = sanitizeHtml.defaults.allowedTags.filter(e => e !== "iframe")

const allowedAttributes = {
  a: ["href", "name", "target", "style"],
  img: ["src"],
  p: ["style"],
  span: ["style"],
  div: ["style"]
}

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
          html: sanitizeHtml(record.html, {
            allowedTags
          })
        }
      }
    }, {
      upsert: true
    })
  }

  async getDocument(filter: Partial<RemoteTextSchema> = {}) {
    const value = await this.collection.findOne(filter)
    return Option.of(value).map(e => e.document).getOrElse({})
  }

}
