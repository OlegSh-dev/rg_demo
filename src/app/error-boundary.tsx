import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
};

type State = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown): State {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }

  override componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('AppErrorBoundary:', error, info.componentStack);
  }

  private handleReset = (): void => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    if (error !== null) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div role="alert" className="error-boundary-fallback">
          <h1 className="error-boundary-fallback__title">Что-то пошло не так</h1>
          <p className="error-boundary-fallback__message">{error.message}</p>
          <button type="button" onClick={this.handleReset} className="error-boundary-fallback__btn">
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
