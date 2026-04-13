import styles from './QueryLoadError.module.css';

type Props = {
  error: unknown;
  onRetry: () => void;
  fallbackMessage: string;
};

function resolveMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof Error ? error.message : fallbackMessage;
}

export function QueryLoadError({ error, onRetry, fallbackMessage }: Props) {
  return (
    <div role="alert" className={styles.error}>
      <p>{resolveMessage(error, fallbackMessage)}</p>
      <button type="button" onClick={onRetry}>
        Попробовать снова
      </button>
    </div>
  );
}
