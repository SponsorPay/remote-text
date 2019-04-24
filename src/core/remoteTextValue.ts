export interface RemoteTextValue {
  id: string
  html: string
}

export type RemoteTextNode = RemoteTextValue | ({
  [key: string]: RemoteTextNode
})

export type RemoteTextDocument = Record<string, RemoteTextNode>

export interface RecordObject {
  [key: string]: RecordObject
}

function isRemoteTextValue(e: RemoteTextNode): e is RemoteTextValue {
  return typeof e.html === "string"
}

function isObjectRemoteTextValue(e: RecordObject | RemoteTextValue): e is RemoteTextValue {
  return typeof e.html === "string"
}

function isRemoteTextNode(e: RemoteTextNode): e is RemoteTextNode {
  return typeof e === "object"
}

function isIndexed(e: object): e is Record<string, object> {
  return typeof e === "object"
}

function getOverrideChildNode(node: RemoteTextNode, overrideNode: RecordObject, key: string): RecordObject {
  if (isIndexed(overrideNode) && overrideNode[key] != null) {
    return overrideNode[key]
  }
  return {}
}

export function parseDocument<T extends RemoteTextNode>(
  overrides: RecordObject,
  defaults: T
): T {
  const queue = [[defaults, "", overrides] as [RemoteTextNode, string, RecordObject]]
  while (queue.length) {
    const current = queue.shift()
    if (current != null) {
      const [node, path, overrideNode] = current
      if (path != null) {
        if (isRemoteTextValue(node)) {
          node.id = path
          if (isObjectRemoteTextValue(overrideNode)) {
            node.html = overrideNode.html
          }
        } else {
          for (const key of Object.keys(node)) {
            queue.push([
              node[key],
              path ? path + "." + key : key,
              getOverrideChildNode(node, overrideNode, key)
            ])
          }
        }
      }
    }
  }
  return defaults
}
