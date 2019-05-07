import {observer} from "mobx-react"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {withRemoteText, WithRemoteTextContext} from "./withRemoteText"

export interface RemoteTextProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
  children: (value: RemoteTextValue) => React.ReactElement<any>
}

export interface RemoteText<T extends RemoteTextNode> extends WithRemoteTextContext<T> {
}

@observer
@withRemoteText
export class RemoteText<T extends RemoteTextNode> extends React.Component<RemoteTextProps<T>> {
  render() {
    const {children, t} = this.props
    const value = t(this.remoteTextStore.document)
    return children(value)
  }
}
