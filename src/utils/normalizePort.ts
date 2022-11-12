export default function normalizePort(
  portVariable: unknown,
  defaultPort: number
): number {
  if (typeof portVariable === "string" && portVariable !== "") {
    const intPortVariable = Number(portVariable);

    return Number.isNaN(intPortVariable) ? defaultPort : intPortVariable;
  }

  if (typeof portVariable === "number" && portVariable > 0) {
    return portVariable;
  }

  return defaultPort;
}
