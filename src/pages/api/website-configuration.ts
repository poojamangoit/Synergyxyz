/**
 * Handles the API request for fetching website configuration data.
 *
 * This function is an API route handler that fetches the website configuration data from the API and returns it as a JSON response.
 *
 * @param {NextApiRequest} req - The incoming API request object.
 * @param {NextApiResponse} res - The outgoing API response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
import { API } from "@/config/apiConfig";
import { API_POPULATE } from "@/config/apiPopulateConfig";
import { getFetch } from "@/utils/apiMethods";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const locale = req.query.locale as string || process.env.NEXT_PUBLIC_LOCALE;
  const populate = API_POPULATE.websiteConfig;

  try {
    const data = await getFetch(
      `${API.websiteConfig}?locale=${locale}&${populate}`
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
