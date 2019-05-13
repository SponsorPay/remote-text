import {SvgIconProps} from "@material-ui/core/SvgIcon"
import EditIcon from "@material-ui/icons/Edit"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {WithRemoteTextContext} from "../react/withRemoteText"
import {EditModal, EditModalProps} from "./editModal"

export interface EditModalButtonProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
  namespace?: string
  editModalProps?: Partial<EditModalProps<T>>
  onModalOpen?: (open: boolean) => any
  editIconProps?: SvgIconProps
}

export interface EditModalButton<T extends RemoteTextNode> extends WithRemoteTextContext<T> {

}

export class EditModalButton<T extends RemoteTextNode> extends React.Component<EditModalButtonProps<T>> {
  state = {
    modalOpen: false
  }

  changeModalOpen = (modalOpen: boolean) => {
    this.setState({modalOpen}, () => {
      const {onModalOpen} = this.props
      if (onModalOpen != null) {
        onModalOpen(this.state.modalOpen)
      }
    })
  }

  render() {
    const {t, editModalProps, editIconProps, onModalOpen, namespace} = this.props
    const {modalOpen} = this.state
    const closeModal = () => this.changeModalOpen(false)

    return <>
      <EditIcon style={{cursor: "pointer"}} onClick={() => this.changeModalOpen(true)} {...editIconProps}/>

      <EditModal t={t} open={modalOpen} onClose={closeModal} onSave={closeModal}
                 namespace={namespace} {...editModalProps}/>
    </>
  }
}
