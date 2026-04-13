/**
 * Парсит идентификатор поста из динамического сегмента маршрута (`:postId`).
 *
 * @param raw — строка из параметра роутера; `undefined`, если сегмента нет
 * @returns положительное целое число или `null`, если значение отсутствует или не является валидным id
 */
export function parsePostId(raw: string | undefined): number | null {
  if (raw === undefined) {
    return null;
  }
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1) {
    return null;
  }
  return n;
}
