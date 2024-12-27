/**
 * Provides a set of utility functions for making API requests.
 *
 * The `getFetch` function performs a GET request to the provided URL, using the `fetchWrapper` function to handle common tasks like error handling and authentication.
 *
 * The `postFetch` function performs a POST request to the provided URL, using the `fetchWrapper` function to handle common tasks like error handling, authentication, and request body serialization.
 *
 * The `getBearerToken` function retrieves the bearer token from the environment variables, which is used for authentication in the `getFetch` and `postFetch` functions.
 */
interface FetchOptions {
  method: "GET" | "POST";
  headers?: Record<string, string>;
  body?: any;
}

/**
 * Retrieves the bearer token from the environment variables.
 *
 * @returns The bearer token as a string, prefixed with "Bearer ".
 * @throws {Error} If the token is not found in the environment variables.
 */
export function getBearerToken() {
  const token = process.env.NEXT_PUBLIC_SECURE_TOKEN;

  if (!token) {
      throw new Error('Token not found');
  }

  return `Bearer ${token}`;
}

/**
 * Provides a wrapper around the native `fetch` API to handle common tasks like error handling.
 *
 * @param url - The URL to fetch.
 * @param options - Additional options to pass to the `fetch` call.
 * @returns The response from the fetch call, parsed as JSON.
 */

async function fetchWrapper(url: string, options: FetchOptions): Promise<any> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Performs a GET request to the provided URL using the `fetchWrapper` function.
 *
 * @param url - The URL to fetch.
 * @returns The response from the fetch call, parsed as JSON.
 */
export async function getFetch(url: string): Promise<any> {

  return fetchWrapper(url, { method: "GET", headers: {
    "Authorization": getBearerToken(),
  }, });
}

/**
 * Performs a POST request to the provided URL using the `fetchWrapper` function.
 *
 * @param url - The URL to fetch.
 * @param payload - The data to send in the request body.
 * @param contentType - The content type of the request body, defaults to 'application/json'.
 * @returns The response from the fetch call, parsed as JSON.
 */

export async function postFetch(
  url: string,
  payload: any,
  contentType: string = "application/json"
): Promise<any> {
  const options: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      "Authorization": getBearerToken(),
    },
    body: JSON.stringify(payload),
  };

  return fetchWrapper(url, options);
}
