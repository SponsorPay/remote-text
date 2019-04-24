import Grid, {GridProps} from "@material-ui/core/Grid"
import Modal, {ModalProps} from "@material-ui/core/Modal"
import Paper, {PaperProps} from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import EditIcon from "@material-ui/icons/Edit"
import * as React from "react"
import {RemoteTextNode, RemoteTextValue} from "../core/remoteTextValue"
import {EditRemoteText} from "../react/editRemoteText"
import {RemoteText} from "../react/remoteText"
import {withRemoteText, WithRemoteTextContext} from "../react/withRemoteText"

export interface EditRemoteTextModalProps<T extends RemoteTextNode> extends Partial<GridProps> {
  t: (document: T) => RemoteTextValue
  children: (value: RemoteTextValue) => React.ReactElement<any>
  modalProps?: ModalProps
  paperProps?: PaperProps
}

export interface EditRemoteTextModal<T extends RemoteTextNode> extends WithRemoteTextContext<T> {

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
export class EditRemoteTextModal<T extends RemoteTextNode> extends React.Component<EditRemoteTextModalProps<T>> {
  el = document.createElement('div')

  state = {
    showEditIcon: false,
    modalOpen: false
  }

  changeShowEditIcon = (showEditIcon: boolean) => this.setState({showEditIcon})
  changeModalOpen = (modalOpen: boolean) => this.setState({modalOpen})

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    const {t, children, modalProps, paperProps, ...rest} = this.props
    const {showEditIcon, modalOpen} = this.state
    const {changeShowEditIcon, changeModalOpen} = this
    const closeModal = () => changeModalOpen(false)
    return <>
      <Grid container direction="row" wrap="nowrap"
            onMouseEnter={() => changeShowEditIcon(true)}
            onMouseLeave={() => changeShowEditIcon(false)}
            {...rest}>
        <Grid item>
          <RemoteText t={t}>{children}</RemoteText>
        </Grid>
        <Grid item>
          {showEditIcon && <EditIcon onClick={() => changeModalOpen(true)}/>}
        </Grid>
      </Grid>

      <Modal
        disableAutoFocus
        disableEnforceFocus
        disableBackdropClick
        disableRestoreFocus
        open={modalOpen}
        onClose={closeModal} {...modalProps}>
        <Paper style={styles.modalBody} {...paperProps}>
          <Grid container direction="column" wrap="nowrap">
            <Grid item style={{flex: 1}}>
              <EditRemoteText t={t}/>
            </Grid>
          </Grid>

          <Grid container direction="row" item style={{margin: "8px 4px"}} justify="flex-end">
            <Button color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Save
            </Button>
          </Grid>
        </Paper>
      </Modal>
    </>
  }
}
