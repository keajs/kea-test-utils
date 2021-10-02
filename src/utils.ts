export function delay(ms: number): Promise<number> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function objectsEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
