import {
  DesktopServicesDropdownProps,
  ExpandableItemProps,
  LanguageDropdownProps,
  LanguageExpandableItemProps,
} from "@/types/layout.type";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const ExpandableItem: React.FC<ExpandableItemProps> = ({
  item,
  serviceCount,
  serviceNames,
  handleClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  const TypeOfServicesOption = t("homeService.services", {
    returnObjects: true,
  }) as string[];

  return (
    <div>
      <div className="flex justify-between items-center py-3 px-8 text-base font-light text-gray-900 relative">
        <Link
          href={item.slug}
          className={`${
            router.asPath === item.slug
              ? "text-primary-blue"
              : "text-text-black"
          }`}
          onClick={() => handleClose(item.slug)}

          // locale={router.locale}
        >
          {item.name}
        </Link>
        {item.isBadge && serviceCount > 0 && (
          <span className={styles.service_count}>{serviceCount}</span>
        )}
        <span onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <link
                rel="preload"
                as="image"
                href="/assets/images/upArrow.svg"
              />
              <img src="/assets/images/upArrow.svg" alt="upArrow" />
            </>
          ) : (
            <>
              <link
                rel="preload"
                as="image"
                href="/assets/images/downArrow.svg"
              />

              <img src="/assets/images/downArrow.svg" alt="downArrow" />
            </>
          )}
        </span>
      </div>
      {isExpanded && (
        <div className=" bg-highlight-area">
          {TypeOfServicesOption.map((staticService: string) => {
            const matchingService = serviceNames.find(
              (dynService) =>
                dynService.name.toLowerCase() === staticService.toLowerCase()
            );

            return (
              <Link
                href={matchingService ? matchingService.slug : ""}
                key={staticService}
                onClick={() =>
                  matchingService && handleClose(matchingService.slug)
                }
                className={`${
                  matchingService && router.asPath === matchingService.slug
                    ? "text-primary-blue"
                    : "text-dark-blackOpacity"
                } block pl-8 py-2 font-light text-sm ${
                  matchingService ? "cursor-pointer" : "cursor-not-allowed"
                }`}

                // locale={router.locale}
              >
                {staticService}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const DesktopServicesDropdown: React.FC<
  DesktopServicesDropdownProps
> = ({ serviceNames, setIsServicesHovered, setIsDropdownHovered }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const TypeOfServicesOption = t("homeService.services", {
    returnObjects: true,
  }) as string[];

  const handleDropdownHover = (isHovered: boolean) => {
    setIsDropdownHovered(isHovered);
    if (isHovered) {
      setIsServicesHovered(true);
    }
  };

  const handleDropdownOptionClick = () => {
    setIsServicesHovered(false);
    setIsDropdownHovered(false);
  };

  return (
    <div className={styles.service_dropdown_container}>
      <div className={styles.service_dropdown_inner}>
        <div
          className={styles.service_dropdown_container_item}
          onMouseEnter={() => handleDropdownHover(true)}
          onMouseLeave={() => handleDropdownHover(false)}
        >
          {TypeOfServicesOption.map((staticService: string) => {
            const matchingService = serviceNames.find(
              (dynService) =>
                dynService.name.toLowerCase() === staticService.toLowerCase()
            );

            return (
              <div
                className={styles.service_dropdown_container_item_inner}
                key={staticService}
              >
                <Link
                  href={matchingService ? matchingService.slug : ""}
                  onClick={handleDropdownOptionClick}
                  className={`${
                    matchingService && router.asPath === matchingService.slug
                      ? "text-primary-blue underline underline-offset-8 decoration-2"
                      : "text-dark-blackOpacity"
                  } block py-2  hover:bg-gray-100 ${
                    matchingService ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  locale={router.locale}
                >
                  {staticService}
                </Link>
                {(staticService === "Branding" ||
                  staticService === "Penjenamaan" ||
                  staticService === "Thương hiệu" ||
                  staticService === "Xây dựng thương hiệu" ||
                  staticService === "การสร้างแบรนด์") && (
                  <div className={styles.service_dropdown_arrow_icon_container}>
                    <Link
                      href="/services"
                      className={styles.service_dropdown_link_color}
                      onClick={handleDropdownOptionClick}
                    >
                      {t("contact.seeAll")}
                    </Link>{" "}
                    <img src="/assets/images/right-icon.svg" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languageOptions,
  setIsServicesHovered,
  setIsDropdownHovered,
}) => {
  const router = useRouter();

  const handleDropdownHover = (isHovered: boolean) => {
    setIsDropdownHovered(isHovered);
    if (isHovered) {
      setIsServicesHovered(true);
    }
  };
  const { pathname, query } = router;

  const handleDropdownOptionClick = (event: string) => {
    if (pathname === "/") {
      router.push("/home", undefined, { locale: event });
    } else if (pathname === "/home" && event === router.defaultLocale) {
      router.push("/", undefined, { locale: event });
    } else {
      router.push({ pathname, query }, undefined, { locale: event });
    }
    setIsServicesHovered(false);
    setIsDropdownHovered(false);
  };

  return (
    <div className={styles.language_dropdown_container}>
      <div className={styles.language_dropdown_inner}>
        <div
          className={styles.language_dropdown_container_item}
          onMouseEnter={() => handleDropdownHover(true)}
          onMouseLeave={() => handleDropdownHover(false)}
        >
          {languageOptions.map((language: { label: string; value: string }) => {
            return (
              <div
                className={styles.language_dropdown_container_item_inner}
                key={language.label}
              >
                <p
                  onClick={() => handleDropdownOptionClick(language.value)}
                  className={`${
                    router.locale === language.value
                      ? "text-primary-blue underline underline-offset-8 decoration-2"
                      : "text-dark-blackOpacity"
                  } block py-2  hover:bg-gray-100  cursor-pointer`}
                >
                  {language.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const LanguageExpandableItem: React.FC<LanguageExpandableItemProps> = ({
  LanguageOptions,
  language,
  handleClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const { pathname, query } = router;

  const handleDropdownOptionClick = (event: string) => {
    router.push({ pathname, query }, undefined, { locale: event });
    handleClose(event);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-3 px-8 text-base font-light text-gray-900 relative">
        <div className="flex  items-center">
          <Image
            src="/assets/images/globe.svg"
            alt="Globe"
            width={24}
            height={24}
            className="mr-3"
          />
          <p className=" text-base font-normal leading-5 text-[#010202]">
            {language}
          </p>
        </div>
        <span onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <img src="/assets/images/upArrow.svg" alt="upArrow" />
          ) : (
            <img src="/assets/images/downArrow.svg" alt="downArrow" />
          )}
        </span>
      </div>
      {isExpanded && (
        <div className=" bg-highlight-area">
          {LanguageOptions.map((language: { label: string; value: string }) => {
            return (
              <p
                key={language.label}
                onClick={() => handleDropdownOptionClick(language.value)}
                className={`${
                  router.locale === language.value
                    ? "text-primary-blue"
                    : "text-dark-blackOpacity"
                } block pl-8 py-2 font-light text-sm cursor-pointer`}
              >
                {language.label}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};
