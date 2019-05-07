import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Modal, {ModalProps} from "@material-ui/core/Modal"
import Paper from "@material-ui/core/Paper"
import {SvgIconProps} from "@material-ui/core/SvgIcon"
import EditIcon from "@material-ui/icons/Edit"
import * as React from "react"
import {RemoteTextRecord} from "../core/remoteTextRecord"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {MediumEditor} from "../react/mediumEditor"
import {withRemoteText, WithRemoteTextContext} from "../react/withRemoteText"

declare module "medium-editor" {
  interface MediumEditor {
    elements: HTMLElement[]
  }
}

export interface EditModalProps<T extends RemoteTextNode> {
  t: (document: T) => RemoteTextValue
  namespace?: string
  modalProps?: Partial<ModalProps>
  onModalOpen?: (open: boolean) => any
  editIconProps?: SvgIconProps
}

export interface EditModal<T extends RemoteTextNode> extends WithRemoteTextContext<T> {

}

const styles = {
  modal: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  } as React.CSSProperties,
  modalBody: {
    width: "600px",
    height: "480px",
    margin: "auto",
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    padding: "16px",
    overflow: "auto"
  } as React.CSSProperties
}

@withRemoteText
export class EditModal<T extends RemoteTextNode> extends React.Component<EditModalProps<T>> {
  el = document.createElement("div")
  mediumEditor: MediumEditor | null = null

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

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  handleSave = async () => {
    if (this.mediumEditor != null) {
      const {t, namespace = "default"} = this.props
      let element = this.mediumEditor.medium.elements[0]
      if (element != null) {
        console.log(element.innerHTML)
        if (element.childElementCount === 1) {
          element = element.firstElementChild as HTMLElement
        }
        const html = element.innerHTML.trim()
        await this.remoteTextStore.saveText(
          new RemoteTextRecord({
            namespace,
            lang: "en",
            html,
            id: t(this.remoteTextStore.document).id
          })
        )
        this.changeModalOpen(false)
      }
    }
  }

  mediumEditorRef = (mediumEditor: MediumEditor) => {
    this.mediumEditor = mediumEditor
  }

  render() {
    const {t, modalProps, editIconProps, onModalOpen, namespace} = this.props
    const {modalOpen} = this.state
    const closeModal = () => this.changeModalOpen(false)

    return <>
      <EditIcon style={{cursor: "pointer"}} onClick={() => this.changeModalOpen(true)} {...editIconProps}/>

      <Modal
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        open={modalOpen}
        onClose={closeModal}
        {...modalProps}
      >
        <Grid container direction="column" wrap="nowrap" component={Paper} style={styles.modalBody}>
          <Grid container direction="column" item style={{flex: 1}}>
            <MediumEditor
              style={{flex: 1}}
              ref={this.mediumEditorRef}
              text={t(this.remoteTextStore.document).html}
            />
          </Grid>

          <Grid item container direction="row" style={{margin: "8px 4px"}} justify="flex-end">
            <Button color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  }
}
