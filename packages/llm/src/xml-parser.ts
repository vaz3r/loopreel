/**
 * Simple XML parser for LLM output.
 * Handles self-closing tags and nested elements with attributes.
 */

interface XmlElement {
  tag: string;
  attributes: Record<string, string>;
  children: XmlElement[];
  text?: string;
}

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;

  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1] as string;
    const value = (match[2] as string)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'");
    attrs[key] = value;
  }

  return attrs;
}

function parseXmlNode(xml: string, pos: number): { element: XmlElement; endPos: number } {
  // Skip whitespace
  while (pos < xml.length && /\s/.test(xml[pos] as string)) pos++;

  if (pos >= xml.length || xml[pos] !== '<') {
    throw new Error(`Expected '<' at position ${pos}`);
  }
  pos++; // skip <

  // Check for closing tag
  if (xml[pos] === '/') {
    throw new Error(`Unexpected closing tag at position ${pos}`);
  }

  // Parse tag name
  let tagName = '';
  while (pos < xml.length && /[a-zA-Z0-9_-]/.test(xml[pos] as string)) {
    tagName += xml[pos] as string;
    pos++;
  }

  // Parse attributes until > or />
  let attrString = '';
  while (pos < xml.length && xml[pos] !== '>' && !(xml[pos] === '/' && xml[pos + 1] === '>')) {
    attrString += xml[pos] as string;
    pos++;
  }

  const attributes = parseAttributes(attrString);

  // Check for self-closing tag
  if (xml[pos] === '/' && xml[pos + 1] === '>') {
    return {
      element: { tag: tagName, attributes, children: [] },
      endPos: pos + 2,
    };
  }

  // Skip >
  pos++; // skip >

  // Parse children
  const children: XmlElement[] = [];
  let textContent = '';

  while (pos < xml.length) {
    // Skip whitespace
    while (pos < xml.length && /\s/.test(xml[pos] as string)) pos++;

    if (pos >= xml.length) break;

    if (xml[pos] === '<') {
      // Check for closing tag
      if (xml[pos + 1] === '/') {
        // Skip closing tag
        while (pos < xml.length && xml[pos] !== '>') pos++;
        pos++; // skip >
        break;
      }

      // Parse child element
      const { element: child, endPos } = parseXmlNode(xml, pos);
      children.push(child);
      pos = endPos;
    } else {
      // Parse text content
      let text = '';
      while (pos < xml.length && xml[pos] !== '<') {
        text += xml[pos] as string;
        pos++;
      }
      textContent += text;
    }
  }

  return {
    element: {
      tag: tagName,
      attributes,
      children,
      text: textContent || undefined,
    },
    endPos: pos,
  };
}

export function parseXml(xmlString: string): XmlElement {
  const xml = xmlString.trim();
  const { element } = parseXmlNode(xml, 0);
  return element;
}

export function xmlElementToObjects(element: XmlElement): unknown {
  if (element.text && element.children.length === 0) {
    return element.text;
  }

  const result: Record<string, unknown> = { ...element.attributes };

  if (element.children.length > 0) {
    const grouped: Record<string, unknown[]> = {};
    for (const child of element.children) {
      const childObj = xmlElementToObjects(child);
      if (!grouped[child.tag]) {
        grouped[child.tag] = [];
      }
      grouped[child.tag]?.push(childObj);
    }

    const keys = Object.keys(grouped);
    if (keys.length === 1) {
      const firstKey = keys[0];
      if (firstKey) {
        const childArray = grouped[firstKey];
        if (childArray && childArray.length === 1) {
          const firstChild = childArray[0];
          if (firstChild && typeof firstChild === 'object' && !Array.isArray(firstChild)) {
            const childKeys = Object.keys(firstChild).filter(k => k !== 'attributes');
            if (childKeys.length === 1) {
              const innerKey = childKeys[0];
              if (innerKey && Array.isArray((firstChild as Record<string, unknown>)[innerKey])) {
                result[firstKey] = (firstChild as Record<string, unknown>)[innerKey];
              } else {
                result[firstKey] = childArray;
              }
            } else {
              result[firstKey] = childArray;
            }
          } else {
            result[firstKey] = childArray;
          }
        } else {
          result[firstKey] = childArray;
        }
      }
    } else {
      for (const [key, value] of Object.entries(grouped)) {
        if (value.length === 1) {
          const single = value[0];
          if (typeof single === 'object' && single !== null && !Array.isArray(single)) {
            const innerKeys = Object.keys(single as Record<string, unknown>);
            if (innerKeys.length === 1 && innerKeys[0]) {
              const innerVal = (single as Record<string, unknown>)[innerKeys[0]];
              if (Array.isArray(innerVal)) {
                result[key] = innerVal;
              } else {
                result[key] = single;
              }
            } else {
              result[key] = single;
            }
          } else {
            result[key] = single;
          }
        } else {
          result[key] = value;
        }
      }
    }
  }

  return result;
}

export function parseLlmXmlOutput(xmlString: string): {
  meta: Record<string, unknown>;
  slides: Record<string, unknown>[];
} {
  const root = parseXml(xmlString);

  if (root.tag !== 'presentation') {
    throw new Error(`Expected <presentation> root element, got <${root.tag}>`);
  }

  let meta: Record<string, unknown> = {};
  const slides: Record<string, unknown>[] = [];

  for (const child of root.children) {
    if (child.tag === 'meta') {
      const parsed = xmlElementToObjects(child);
      meta = (typeof parsed === 'object' && parsed !== null ? parsed : {}) as Record<string, unknown>;
    } else {
      const parsed = xmlElementToObjects(child);
      if (typeof parsed === 'object' && parsed !== null) {
        slides.push(parsed as Record<string, unknown>);
      }
    }
  }

  return { meta, slides };
}
