/**
 * Handles the API request for the about us page.
 *
 * @param {NextApiRequest} req - The incoming API request.
 * @param {NextApiResponse} res - The response object to send back to the client.
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
  const locale = req.query.locale as string;
  const populate = API_POPULATE.aboutUsAPI;

  try {
    const data = await getFetch(
      `${API.aboutUsAPI}?locale=${locale}&${populate}`
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
