/**
 * Handles the API request for the bmap method.
 *
 * This function is an API route handler that fetches data from the bmap API endpoint using the `getFetch` utility function. It retrieves the locale from the environment variable `NEXT_PUBLIC_LOCALE` and the populate configuration from `API_POPULATE.bmapMethod`. The fetched data is then returned as a JSON response with a 200 status code.
 *
 * If an error occurs during the fetch, it is logged to the console and a 500 status code is returned with an error message.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} - A Promise that resolves when the API response is sent.
 */
import { API } from "@/config/apiConfig";
import { API_POPULATE } from "@/config/apiPopulateConfig";
import { getFetch } from "@/utils/apiMethods";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const locale = req.query.locale as string;
  const populate = API_POPULATE.bmapMethod;

  try {
    const data = await getFetch(`${API.bmapAPI}?locale=${locale}&${populate}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
