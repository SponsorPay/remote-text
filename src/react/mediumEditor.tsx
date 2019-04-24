import {MediumEditor} from "medium-editor"
import * as React from "react"
import * as ReactDOM from "react-dom"

export interface ReactMediumEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  onTextChange: (html: string) => void
}

export class ReactMediumEditor extends React.Component<ReactMediumEditorProps> {
  medium!: MediumEditor

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this) as HTMLDivElement
    this.medium = new MediumEditor(dom)
    this.medium.subscribe("editableInput", () => {
      const {onTextChange} = this.props
      onTextChange && onTextChange(dom.innerHTML)
    })
  }

  componentDidUpdate() {
    this.medium.restoreSelection()
  }

  componentWillUnmount() {
    this.medium.destroy()
  }

  render() {
    const {onTextChange, ...rest} = this.props
    return <div {...rest}/>
  }
}
