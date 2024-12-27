/**
 * Handles the API requests for the contact us functionality.
 *
 * Supports the following HTTP methods:
 * - GET: Fetches the contact us data using the `getFetch` utility function.
 * - POST: Submits the contact form data using the `postFetch` utility function.
 *
 * @param {NextApiRequest} req - The incoming API request.
 * @param {NextApiResponse} res - The response object to send back to the client.
 */
import { API } from "@/config/apiConfig";
import { API_POPULATE } from "@/config/apiPopulateConfig";
import { getFetch, postFetch } from "@/utils/apiMethods";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const populate = API_POPULATE.contactUsAPI;
  const locale = req.query.locale as string;
  let contactData;

  try {
    if (req.method === "GET") {
      contactData = await getFetch(
        `${API.contactUsAPI}?locale=${locale}&${populate}`
      );
    } else if (req.method === "POST") {
      contactData = await postFetch(API.contactForm, req.body);
    }

    res.status(200).json(contactData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch contact data" });
  }
}
