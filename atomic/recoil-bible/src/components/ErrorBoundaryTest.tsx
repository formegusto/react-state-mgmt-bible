import ErrorBoundary from "./ErrorBoundary";
import ErrorCounter from "./ErrorCounter";

function ErrorBoundaryTest() {
  return (
    <ErrorBoundary>
      <ErrorCounter />
    </ErrorBoundary>
  );
}

export default ErrorBoundaryTest;
