/**
 * Handles the API request for the services page.
 *
 * This function fetches data from the services API and the our expertise service API, and returns the data as a JSON response.
 *
 * @param {NextApiRequest} req - The incoming API request.
 * @param {NextApiResponse} res - The response object to send the data back to the client.
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
  const servicePopulate = API_POPULATE.servicesAPI;
  const expertisePopulate = API_POPULATE.ourExpertiseService;

  try {
    const [servicesData, ourExpertise] = await Promise.all([
      getFetch(`${API.servicesAPI}?locale=${locale}&${servicePopulate}`),
      getFetch(
        `${API.ourExpertiseService}?locale=${locale}&${expertisePopulate}`
      ),
    ]);

    res.status(200).json({ servicesData, ourExpertise });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch home and services data" });
  }
}
