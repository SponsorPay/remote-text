import {Observer} from "mobx-react"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {RemoteTextStore} from "../store/remoteTextStore"
import {WithRemoteText} from "./withRemoteText"

export interface RemoteTextProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
  children: (value: RemoteTextValue) => React.ReactElement<any>
}

export class RemoteText<T extends RemoteTextNode> extends React.Component<RemoteTextProps<T>> {
  render() {
    return <WithRemoteText>
      {
        (store: RemoteTextStore<T>) => (
          <Observer>
            {
              () => {
                const {children, t} = this.props
                const value = t(store.document)
                return children(value)
              }
            }
          </Observer>
        )
      }
    </WithRemoteText>
  }
}
