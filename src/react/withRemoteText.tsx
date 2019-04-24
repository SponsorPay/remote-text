import * as React from "react"
import {ComponentClass} from "react"
import {RemoteTextNode} from "../core/remoteTextValue"
import {RemoteTextStore} from "../store/remoteTextStore"

const STORE_GETTER_KEY = "remoteTextStore"

export interface WithRemoteTextContext<T extends RemoteTextNode> {
  remoteTextStore: RemoteTextStore<T>
}

export interface WithRemoteTextProps<T extends RemoteTextNode> {
  children: (appTextStore: RemoteTextStore<T>) => React.ReactElement<any>
}

export class WithRemoteText<T extends RemoteTextNode> extends React.Component<WithRemoteTextProps<T>> {
  context!: {
    remoteTextStore: RemoteTextStore<T>
  }

  get [STORE_GETTER_KEY]() {
    return this.context.remoteTextStore
  }

  render() {
    return this.props.children(this[STORE_GETTER_KEY])
  }
}

export function withRemoteText(ComponentClass: ComponentClass<any, any>) {
  ComponentClass.contextType = WithRemoteText.contextType
  Object.defineProperty(
    ComponentClass.prototype,
    STORE_GETTER_KEY,
    Object.getOwnPropertyDescriptor(WithRemoteText.prototype, STORE_GETTER_KEY)!
  )
}
