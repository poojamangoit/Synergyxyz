/**
 * Handles the API request for the privacy policy page.
 *
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 * @returns A JSON response containing the privacy policy data.
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
  const populate = API_POPULATE.privacyPolicyAPI;

  try {
    const data = await getFetch(
      `${API.privacyPolicyAPI}?locale=${locale}&${populate}`
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
