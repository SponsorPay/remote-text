import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {MediumEditor} from "./mediumEditor"
import {withRemoteText, WithRemoteTextContext} from "./withRemoteText"

export interface EditRemoteTextProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
}

export interface EditRemoteText<T extends RemoteTextNode> extends WithRemoteTextContext<T> {

}

@withRemoteText
export class EditRemoteText<T extends RemoteTextNode> extends React.Component<EditRemoteTextProps<T>> {
  render() {
    const {t} = this.props
    return <MediumEditor
      text={t(this.remoteTextStore.document).html}
    />
  }
}
