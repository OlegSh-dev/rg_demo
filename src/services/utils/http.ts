export function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('The operation was aborted.', 'AbortError');
  }
}

export async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Запрос не удался: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
