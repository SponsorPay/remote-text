import {observable} from "mobx"
import {RemoteTextRecord} from "../core/remoteTextRecord"
import {parseDocument, RecordObject, RemoteTextNode} from "../core/remoteTextValue"

export interface RemoteTextStoreParams<T extends RemoteTextNode> {
  fetch: () => Promise<RecordObject>
  save: (value: RemoteTextRecord) => Promise<any>
  document: T
}

export interface RemoteTextStore<T extends RemoteTextNode> extends RemoteTextStoreParams<T> {

}

export class RemoteTextStore<T extends RemoteTextNode> {

  @observable.ref document: T

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
    try {
      await this.save(value)
    } catch (e) {
      console.error(e)
    }
  }
}
