import React, { Component, ErrorInfo, ReactNode } from "react"
import { ErrorComponent } from "./error-component"

interface Props {
  children: ReactNode
  catchErrors: "always" | "dev" | "prod" | "never"
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  state = { error: null, errorInfo: null }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  resetError = () => {
    this.setState({ error: null, errorInfo: null })
  }

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>): boolean {
    return nextState.error !== nextProps.error
  }

  isEnabled(): boolean {
    return (
      this.props.catchErrors === "always" ||
      (this.props.catchErrors === "dev" && __DEV__) ||
      (this.props.catchErrors === "prod" && !__DEV__)
    )
  }

  render() {
    return this.isEnabled() && this.state.error ? (
      <ErrorComponent
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    )
  }
}
