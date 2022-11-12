export default function verifyObjectProperties(
  obj: Object,
  properties: string[]
): boolean {
  const targetProperties = Object.keys(obj);

  for (const property of properties) {
    if (!targetProperties.includes(property)) {
      return false;
    }
  }

  return true;
}
