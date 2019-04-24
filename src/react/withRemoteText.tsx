import * as React from "react"
import {RemoteTextNode} from "../core/remoteTextValue"
import {RemoteTextStore} from "../store/remoteTextStore"

export interface WithRemoteTextContext<T extends RemoteTextNode> {
  appTextStore: RemoteTextStore<T>
}

export interface WithRemoteTextProps<T extends RemoteTextNode> {
  children: (appTextStore: RemoteTextStore<T>) => React.ReactElement<any>
}

export class WithRemoteText<T extends RemoteTextNode> extends React.Component<WithRemoteTextProps<T>> {
  context!: {
    remoteTextStore: RemoteTextStore<T>
  }

  get remoteTextStore() {
    return this.context.remoteTextStore
  }

  render() {
    return this.props.children(this.remoteTextStore)
  }
}
