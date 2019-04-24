import {Option} from "tsla-util/lib/option"
import {parseString} from "tsla-util/lib/parse"

export interface RemoteTextRecordParams {
  id: string
  html: string
  namespace: string
  lang: string
}

export interface RemoteTextRecord extends RemoteTextRecordParams {

}

export class RemoteTextRecord {
  static parse(e?: any) {
    const params = Option.of(e).getOrElse({}) as Partial<RemoteTextRecordParams>
    return new RemoteTextRecord({
      id: parseString(params.id),
      html: parseString(params.html),
      namespace: parseString(params.namespace),
      lang: parseString(params.lang),
    })
  }

  constructor(params: RemoteTextRecordParams) {
    this.id = params.id
    this.html = params.html
    this.namespace = params.namespace
    this.lang = params.lang
  }
}
