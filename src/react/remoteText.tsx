import {Observer} from "mobx-react"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
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


// simple

export interface RemoteTextProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
  children: (value: RemoteTextValue) => React.ReactElement<any>
}

export class RemoteText<T extends RemoteTextNode> extends React.Component<RemoteTextProps<T>> {
  render() {
    const {children, t} = this.props
    return <WithRemoteText>
      {
        (store: RemoteTextStore<T>) => (
          <Observer>
            {
              () => {
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
