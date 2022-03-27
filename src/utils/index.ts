/**
 * 无需try-catch包裹promise
 * @param promise
 * @returns
 */
export async function box<T>(
  promise: Promise<T>
): Promise<[(Error & T) | null, T | null]> {
  try {
    return [null, await promise];
  } catch (error: any) {
    return [error, null];
  }
}
