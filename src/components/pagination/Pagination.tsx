import { MAX_PAGE } from '../../shared/constants/pagination';
import {
  directionForPageNavigation,
  type PageNavigationDirection,
} from '../../shared/utils/navigation';
import { getPaginationItems } from './pagination-model';
import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  onGoToPage: (page: number, direction: PageNavigationDirection) => void;
  isNavigating: boolean;
};

export function Pagination({ currentPage, onGoToPage, isNavigating }: Props) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < MAX_PAGE ? currentPage + 1 : null;
  const items = getPaginationItems(currentPage, MAX_PAGE, 2);

  const go = (target: number) => {
    if (target === currentPage || isNavigating) {
      return;
    }
    onGoToPage(target, directionForPageNavigation(currentPage, target));
  };

  return (
    <nav
      className={styles.nav}
      aria-label="Страницы постов"
      aria-busy={isNavigating}
    >
      <div className={styles.inner}>
        <div className={styles.cluster}>
          {currentPage > 1 ? (
            <button
              type="button"
              className={styles.edge}
              disabled={isNavigating}
              aria-label="Первая страница"
              onClick={() => {
                go(1);
              }}
            >
              ««
            </button>
          ) : (
            <span className={styles.edgeDisabled} aria-disabled>
              ««
            </span>
          )}
          {prevPage !== null ? (
            <button
              type="button"
              className={styles.step}
              disabled={isNavigating}
              aria-label="Предыдущая страница"
              onClick={() => {
                go(prevPage);
              }}
            >
              Назад
            </button>
          ) : (
            <span className={styles.stepDisabled} aria-disabled>
              Назад
            </span>
          )}
        </div>

        <div className={styles.pages}>
          {items.map((item) => {
            if (item.type === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${item.side}`}
                  className={styles.ellipsis}
                  aria-hidden
                >
                  …
                </span>
              );
            }
            const isCurrent = item.page === currentPage;
            return (
              <button
                key={item.page}
                type="button"
                className={isCurrent ? styles.pageNumCurrent : styles.pageNum}
                disabled={isNavigating || isCurrent}
                aria-label={
                  isCurrent
                    ? `Текущая страница, ${item.page}`
                    : `Страница ${item.page}`
                }
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => {
                  go(item.page);
                }}
              >
                {item.page}
              </button>
            );
          })}
        </div>

        <div className={styles.cluster}>
          {nextPage !== null ? (
            <button
              type="button"
              className={styles.step}
              disabled={isNavigating}
              aria-label="Следующая страница"
              onClick={() => {
                go(nextPage);
              }}
            >
              Вперёд
            </button>
          ) : (
            <span className={styles.stepDisabled} aria-disabled>
              Вперёд
            </span>
          )}
          {currentPage < MAX_PAGE ? (
            <button
              type="button"
              className={styles.edge}
              disabled={isNavigating}
              aria-label="Последняя страница"
              onClick={() => {
                go(MAX_PAGE);
              }}
            >
              »»
            </button>
          ) : (
            <span className={styles.edgeDisabled} aria-disabled>
              »»
            </span>
          )}
        </div>
      </div>
      <p className={styles.caption}>
        Страница {currentPage} из {MAX_PAGE}
      </p>
    </nav>
  );
}
