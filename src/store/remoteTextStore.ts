import {observable} from "mobx"
import {parseDocument, RecordObject, RemoteTextNode} from "../core/remoteTextValue"

export interface RemoteTextStoreParams<T extends RemoteTextNode> {
  fetch: () => Promise<RecordObject>
  document: T
}

export interface RemoteTextStore<T extends RemoteTextNode> extends RemoteTextStoreParams<T> {

}

export class RemoteTextStore<T extends RemoteTextNode> {

  @observable.ref document: T

  constructor(params: RemoteTextStoreParams<T>) {
    this.fetch = params.fetch
    this.document = params.document
  }

  async loadDocument() {
    try {
      const raw = await this.fetch()
      this.document = parseDocument(raw, this.document)
    } catch (e) {
      console.error(e)
    }
  }
}
