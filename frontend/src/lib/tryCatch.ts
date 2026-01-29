

type SuccessReturn<T> = {
  data: T;
  success: true;
  error: null;
}

type ErrorReturn<E> = {
  data: null;
  success: false;
  error: E;
}

/**
 * A utility function that wraps a promise-returning function in a try-catch block.
 */
async function tryCatch<T>(fn: () => Promise<T>): Promise<SuccessReturn<T> | ErrorReturn<string>> {
  try {
    const result = await fn();
    return { data: result, success: true, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error in tryCatch:", errorMessage);
    return { data: null, success: false, error: errorMessage };
  }
}

export { tryCatch };
