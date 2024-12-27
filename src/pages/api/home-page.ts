/**
 * Handles the API request for the home page data and services data.
 *
 * This function is the API route handler for the home page data and services data. It fetches the data from the configured API endpoints, using the provided locale and populate configurations, and returns the data in the API response.
 *
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 * @returns A JSON response containing the home page data and services data.
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
  const homePopulate = API_POPULATE.homeAPI;
  const servicePopulate = API_POPULATE.servicesAPI;

  try {
    const [homeData, servicesData] = await Promise.all([
      getFetch(`${API.homeAPI}?locale=${locale}&${homePopulate}`),
      getFetch(`${API.servicesAPI}?locale=${locale}&${servicePopulate}`),
    ]);

    res.status(200).json({ homeData, servicesData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch home and services data" });
  }
}
