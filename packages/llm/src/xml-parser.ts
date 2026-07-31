/**
 * XML parser for LLM output using fast-xml-parser.
 * Handles self-closing tags, nested elements, attributes, and LLM quirks.
 */

import { XMLParser } from 'fast-xml-parser';

export interface XmlElement {
  tag: string;
  attributes: Record<string, string>;
  children: XmlElement[];
  text?: string;
}

// Elements that should always be treated as arrays
const ARRAY_ELEMENTS = new Set(['item', 'stat', 'slide', 'principle', 'person', 'quote']);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  allowBooleanAttributes: true,
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
  isArray: (name) => ARRAY_ELEMENTS.has(name),
  textNodeName: '#text',
});

/**
 * Convert fast-xml-parser output to our XmlElement format.
 * Handles the attribute prefix and array normalization.
 */
function convertToXmlElement(obj: Record<string, unknown>, tag: string): XmlElement {
  const attributes: Record<string, string> = {};
  const children: XmlElement[] = [];
  let text: string | undefined;

  for (const [key, value] of Object.entries(obj)) {
    if (key === '#text') {
      // Text content
      text = typeof value === 'string' ? value : String(value);
    } else if (key.startsWith('@_')) {
      // Attribute (strip the prefix)
      const attrName = key.slice(2);
      attributes[attrName] = String(value);
    } else if (Array.isArray(value)) {
      // Array of child elements
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          children.push(convertToXmlElement(item as Record<string, unknown>, key));
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      // Single child element
      children.push(convertToXmlElement(value as Record<string, unknown>, key));
    }
  }

  return { tag, attributes, children, text };
}

/**
 * Parse XML string into XmlElement tree.
 * Handles LLM output quirks like missing root elements.
 */
export function parseXml(xmlString: string): XmlElement {
  let xml = xmlString.trim();

  // Remove XML declaration if present
  xml = xml.replace(/<\?xml[^?]*\?>/g, '').trim();

  // Remove comments if present
  xml = xml.replace(/<!--[\s\S]*?-->/g, '').trim();

  // Wrap in presentation if not already wrapped
  if (!xml.startsWith('<presentation') && !xml.startsWith('<contentBrief') && !xml.startsWith('<slidePlan') && !xml.startsWith('<templateSelection') && !xml.startsWith('<domainClassification')) {
    // Detect the root element from the first tag
    const firstTagMatch = xml.match(/<(\w+)/);
    if (firstTagMatch && firstTagMatch[1] !== 'presentation') {
      // Don't wrap if it already has a root element
    } else {
      xml = `<presentation>${xml}</presentation>`;
    }
  }

  const result = parser.parse(xml) as Record<string, unknown>;

  // Find the root element (skip the document root)
  const rootKey = Object.keys(result).find(k => k !== '?xml' && k !== '#text');
  if (!rootKey || typeof result[rootKey] !== 'object') {
    return { tag: 'presentation', attributes: {}, children: [], text: xml };
  }

  return convertToXmlElement(result[rootKey] as Record<string, unknown>, rootKey);
}

/**
 * Convert XmlElement tree to plain objects.
 * Preserves the unwrapping logic for LLM output quirks.
 */
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

/**
 * Parse LLM XML output into meta and slides.
 * Convenience wrapper for the common use case.
 */
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
