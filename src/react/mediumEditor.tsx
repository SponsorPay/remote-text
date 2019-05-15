import * as MediumEditorBase from "medium-editor"
import * as React from "react"
import * as ReactDOM from "react-dom"

export interface MediumEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  onTextChange?: (html: string) => void
  text: string
}

export class MediumEditor extends React.Component<MediumEditorProps> {
  medium!: MediumEditorBase.MediumEditor

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this) as HTMLDivElement
    this.medium = new MediumEditorBase(dom, {
      paste: {
        forcePlainText: false
      },
      targetBlank: true
    })
    this.medium.subscribe("editableInput", () => {
      const {onTextChange} = this.props
      if (onTextChange != null) {
        onTextChange(dom.innerHTML)
      }
    })
    this.medium.setContent(this.props.text)
  }

  componentDidUpdate(prevProps: MediumEditorProps) {
    if (prevProps.text !== this.props.text) {
      this.medium.setContent(this.props.text)
    }
    this.medium.restoreSelection()
  }

  componentWillUnmount() {
    this.medium.destroy()
  }

  render() {
    const {onTextChange, text, ...rest} = this.props
    return <div {...rest}/>
  }
}
