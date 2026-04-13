import { addTransitionType, startTransition, type MouseEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type NavTransitionType = 'nav-forward' | 'nav-back';

type Props = {
  to: string;
  transitionType: NavTransitionType;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  /** Вызывается перед навигацией (например, отмена запросов). */
  onBeforeNavigate?: () => void;
};

export function TransitionLink({
  to,
  transitionType,
  children,
  className,
  'aria-label': ariaLabel,
  onBeforeNavigate,
}: Props) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    onBeforeNavigate?.();
    startTransition(() => {
      addTransitionType(transitionType);
      navigate(to);
    });
  };

  return (
    <a href={to} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
