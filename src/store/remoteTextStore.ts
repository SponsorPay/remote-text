import {observable} from "mobx"
import {RemoteTextRecord} from "../core/remoteTextRecord"
import {parseDocument, RecordObject, RemoteTextNode} from "../core/remoteTextValue"

const _set = require("lodash/set")

export interface RemoteTextStoreParams<T extends RemoteTextNode> {
  fetch: () => Promise<RecordObject>
  save: (value: RemoteTextRecord) => Promise<any>
  document: T
}

export interface RemoteTextStore<T extends RemoteTextNode> extends RemoteTextStoreParams<T> {

}

export class RemoteTextStore<T extends RemoteTextNode> {

  @observable.deep document: T

  constructor(params: RemoteTextStoreParams<T>) {
    this.fetch = params.fetch
    this.document = params.document
    this.save = params.save
  }

  async loadDocument() {
    let overrides = {}
    try {
      overrides = await this.fetch()
    } catch (e) {
      console.error(e)
    }
    this.document = parseDocument(overrides, this.document)
  }

  async saveText(value: RemoteTextRecord) {
    _set(this.document, value.id, {
      id: value.id,
      html: value.html
    })
    try {
      await this.save(value)
    } catch (e) {
      console.error(e)
    }
  }
}
