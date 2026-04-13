import { ViewTransition, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const enterMap = {
  'nav-forward': 'nav-forward',
  'nav-back': 'nav-back',
  default: 'none' as const,
};

const exitMap = {
  'nav-forward': 'nav-forward',
  'nav-back': 'nav-back',
  default: 'none' as const,
};

export function DirectionalPageTransition({ children }: Props) {
  return (
    <ViewTransition enter={enterMap} exit={exitMap} default="none">
      {children}
    </ViewTransition>
  );
}
