import { GetServerSideProps } from "next";
import HomePage from "./home";
import { HomeResponse } from "@/types/home.type";
import { ServicePageResponse } from "@/types/service.type";
import { URL } from "@/config/webConfig";
import { ConfigResponse } from "@/types/layout.type";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface HomeProps {
  homeData: HomeResponse;
  servicesData: ServicePageResponse;
  websiteConfig: ConfigResponse;
}

/**
 * Renders the HomePage component with the provided home and services data.
 *
 * @param props - An object containing the home and services data.
 * @param props.homeData - The home data to be passed to the HomePage component.
 * @param props.servicesData - The services data to be passed to the HomePage component.
 * @returns The rendered HomePage component.
 */
export default function Home(props: HomeProps) {
  return <HomePage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.homeAPI}?locale=${language}`);
    if (!response.ok) {
      throw new Error("Failed to fetch website configuration");
    }

    const { homeData, servicesData } = await response.json();

    return {
      props: {
        homeData,
        servicesData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching website configuration:", error);

    return {
      props: {
        homeData: null,
        servicesData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
