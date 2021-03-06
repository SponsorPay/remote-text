import {parseDocument} from "../../src/core/remoteTextValue"

require("chai").should()

describe("remoteTextValue.test", function () {
  it("should", () => {
    parseDocument({
      a: {
        b: {
          x: 3
        }
      }
    } as any, {
      a: {
        b: {
          x: {
            y: {
              id: "",
              html: "Configure App"
            }
          },
          c: {
            id: "",
            html: "Configure Placement"
          }
        }
      }
    })
  })

  it("should work we null overrides", () => {
    const defaults = () => ({
      a: {
        b: {
          x: {
            y: {
              id: "",
              html: "Configure App"
            }
          },
          c: {
            id: "",
            html: "Configure Placement"
          }
        }
      }
    })
    const text = parseDocument(null!, defaults())
    console.log(text)
  })
})
