import Grid, {GridProps} from "@material-ui/core/Grid"
import {ModalProps} from "@material-ui/core/Modal"
import {SvgIconProps} from "@material-ui/core/SvgIcon"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {RemoteText} from "../react/remoteText"
import {withRemoteText, WithRemoteTextContext} from "../react/withRemoteText"
import {EditModal} from "./editModal"

export interface EditRemoteTextModalProps<T extends RemoteTextNode> extends Partial<GridProps> {
  t: (document: T) => RemoteTextValue
  namespace?: string
  children: (value: RemoteTextValue) => React.ReactElement<any>
  editIconProps?: SvgIconProps
  modalProps?: Partial<ModalProps>
  onModalOpen?: (open: boolean) => any
}

export interface EditRemoteTextModal<T extends RemoteTextNode> extends WithRemoteTextContext<T> {

}

@withRemoteText
export class EditRemoteTextModal<T extends RemoteTextNode> extends React.Component<EditRemoteTextModalProps<T>> {
  state = {
    showEditIcon: false,
  }

  changeShowEditIcon = (showEditIcon: boolean) => this.setState({showEditIcon})

  render() {
    const {t, children, modalProps, onModalOpen, namespace, editIconProps, ...rest} = this.props
    const {showEditIcon} = this.state
    return <>
      <Grid container direction="row" wrap="nowrap" alignItems="center"
            onMouseEnter={() => this.changeShowEditIcon(true)}
            onMouseLeave={() => this.changeShowEditIcon(false)} {...rest}>
        <Grid item style={{marginRight: "8px"}}>
          <RemoteText t={t}>{children}</RemoteText>
        </Grid>
        <Grid item>
          {showEditIcon && <EditModal t={t} modalProps={modalProps} onModalOpen={onModalOpen} namespace={namespace}/>}
        </Grid>
      </Grid>
    </>
  }
}
