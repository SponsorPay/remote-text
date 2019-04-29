import {observable} from "mobx/lib/api/observable"
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
    try {
      const raw = await this.fetch()
      this.document = parseDocument(raw, this.document)
    } catch (e) {
      console.error(e)
    }
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
