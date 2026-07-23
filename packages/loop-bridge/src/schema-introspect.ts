import { z } from 'zod';

const ZodFirstPartyTypeKind = z.ZodFirstPartyTypeKind;

function describeZodType(type: z.ZodTypeAny, nested = false): string {
  const kind = type._def?.typeName as string;

  if (kind === ZodFirstPartyTypeKind.ZodString) {
    const parts: string[] = ['string'];
    const checks = (type._def as any).checks ?? [];
    for (const check of checks) {
      if (check.kind === 'min') parts.push(`min ${check.value} chars`);
      if (check.kind === 'max') parts.push(`max ${check.value} chars`);
    }
    return parts.join(', ');
  }
  if (kind === ZodFirstPartyTypeKind.ZodNumber) return 'number';
  if (kind === ZodFirstPartyTypeKind.ZodBoolean) return 'boolean';
  if (kind === ZodFirstPartyTypeKind.ZodLiteral) return `"${(type._def as any).value}"`;
  if (kind === ZodFirstPartyTypeKind.ZodEnum) return (type._def as any).values.join(' | ');
  if (kind === ZodFirstPartyTypeKind.ZodOptional) return describeZodType((type._def as any).innerType, nested);
  if (kind === ZodFirstPartyTypeKind.ZodDefault) return describeZodType((type._def as any).innerType, nested);
  if (kind === ZodFirstPartyTypeKind.ZodArray) {
    const inner = describeZodType((type._def as any).type, true);
    const parts: string[] = [`array of ${inner}`];
    for (const check of (type._def as any).checks ?? []) {
      if (check.kind === 'min') parts.push(`min ${check.value}`);
      if (check.kind === 'max') parts.push(`max ${check.value}`);
    }
    return parts.join(', ');
  }
  if (kind === ZodFirstPartyTypeKind.ZodObject) {
    if (nested) return describeObjectInline(type as z.ZodObject<any>);
    return 'object';
  }
  return 'unknown';
}

function describeObjectInline(obj: z.ZodObject<any>): string {
  const shape = obj.shape;
  const fields: string[] = [];
  for (const [key, value] of Object.entries(shape)) {
    if (key === 'type') continue;
    const fieldType = value as z.ZodTypeAny;
    const stripped = stripOptionalAndDefault(fieldType);
    const kind = stripped._def?.typeName as string;

    if (kind === ZodFirstPartyTypeKind.ZodObject) {
      fields.push(`${key}{${describeObjectInline(stripped as z.ZodObject<any>)}}`);
    } else if (kind === ZodFirstPartyTypeKind.ZodArray) {
      const arrayInner = (stripped._def as any).type;
      const arrayInnerStripped = stripOptionalAndDefault(arrayInner);
      const arrayInnerKind = arrayInnerStripped._def?.typeName as string;
      if (arrayInnerKind === ZodFirstPartyTypeKind.ZodObject) {
        fields.push(`${key}[{${describeObjectInline(arrayInnerStripped as z.ZodObject<any>)}}]`);
      } else {
        fields.push(`${key}[${describeZodType(arrayInner, true)}]`);
      }
    } else {
      const required = isRequired(fieldType);
      const desc = describeZodType(stripped);
      fields.push(required ? `${key}: ${desc}` : `${key}?: ${desc}`);
    }
  }
  return fields.join(', ');
}

function isRequired(fieldType: z.ZodTypeAny): boolean {
  const kind = fieldType._def?.typeName as string;
  if (kind === ZodFirstPartyTypeKind.ZodOptional) return false;
  if (kind === ZodFirstPartyTypeKind.ZodDefault) return isRequired((fieldType._def as any).innerType);
  return true;
}

function stripOptionalAndDefault(fieldType: z.ZodTypeAny): z.ZodTypeAny {
  const kind = fieldType._def?.typeName as string;
  if (kind === ZodFirstPartyTypeKind.ZodOptional) return stripOptionalAndDefault((fieldType._def as any).innerType);
  if (kind === ZodFirstPartyTypeKind.ZodDefault) return stripOptionalAndDefault((fieldType._def as any).innerType);
  return fieldType;
}

interface FieldSpec {
  name: string;
  type: string;
  required: boolean;
}

function getFieldsFromObject(obj: z.ZodObject<any>): FieldSpec[] {
  const shape = obj.shape;
  const fields: FieldSpec[] = [];
  for (const [key, value] of Object.entries(shape)) {
    if (key === 'type') continue;
    const fieldType = value as z.ZodTypeAny;
    const required = isRequired(fieldType);
    const stripped = stripOptionalAndDefault(fieldType);
    const strippedKind = stripped._def?.typeName as string;

    let typeDesc: string;
    if (strippedKind === ZodFirstPartyTypeKind.ZodObject) {
      typeDesc = `{${describeObjectInline(stripped as z.ZodObject<any>)}}`;
    } else if (strippedKind === ZodFirstPartyTypeKind.ZodArray) {
      typeDesc = describeZodType(stripped);
    } else {
      typeDesc = describeZodType(stripped);
    }
    fields.push({ name: key, type: typeDesc, required });
  }
  return fields;
}

function describeSlideType(
  typeName: string,
  schema: z.ZodTypeAny,
): string {
  const lines: string[] = [];
  const stripped = stripOptionalAndDefault(schema);
  const kind = stripped._def?.typeName as string;

  if (kind === ZodFirstPartyTypeKind.ZodObject) {
    const fields = getFieldsFromObject(stripped as z.ZodObject<any>);
    lines.push(`${typeName}:`);
    for (const f of fields) {
      const marker = f.required ? 'REQUIRED' : 'optional';
      lines.push(`  ${f.name}: ${f.type}, ${marker}`);
    }
  } else {
    lines.push(`${typeName}: ${describeZodType(stripped)}`);
  }

  return lines.join('\n');
}

export function introspectSchema(contract: z.ZodTypeAny): string {
  const lines: string[] = [];

  const contractObj = stripOptionalAndDefault(contract);
  if ((contractObj._def?.typeName as string) !== ZodFirstPartyTypeKind.ZodObject) {
    return 'Schema is not a ZodObject';
  }

  const slidesField = (contractObj as z.ZodObject<any>).shape['slides'];
  if (!slidesField) return 'No slides field found';

  const slidesType = stripOptionalAndDefault(slidesField);
  if ((slidesType._def?.typeName as string) !== ZodFirstPartyTypeKind.ZodArray) {
    return 'slides is not a ZodArray';
  }

  const elementType = (slidesType._def as any).type;

  if ((elementType._def?.typeName as string) === ZodFirstPartyTypeKind.ZodDiscriminatedUnion) {
    const options = (elementType._def as any).options;
    for (const option of options) {
      const stripped = stripOptionalAndDefault(option);
      if ((stripped._def?.typeName as string) === ZodFirstPartyTypeKind.ZodObject) {
        const typeField = (stripped as z.ZodObject<any>).shape['type'];
        let typeName = 'unknown';
        if ((typeField._def?.typeName as string) === ZodFirstPartyTypeKind.ZodLiteral) {
          typeName = (typeField._def as any).value as string;
        }
        lines.push(describeSlideType(typeName, stripped));
        lines.push('');
      }
    }
  }

  return lines.join('\n').trim();
}
