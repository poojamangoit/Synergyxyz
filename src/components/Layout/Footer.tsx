/**
 * The `Footer` component represents the footer section of the website. It displays various information such as the company's contact details, social media links, and page links.
 *
 * The component receives a `websiteConfig` prop of type `ConfigResponse | null`, which contains the configuration data for the website, including the footer content.
 *
 * The footer section is divided into several parts:
 * - The hero section with a background image and the footer title and subtitle.
 * - Two call-to-action (CTA) buttons that redirect the user to specific pages or open a WhatsApp conversation.
 * - The footer content, which includes the company's contact information, address, and business hours.
 * - The social media links and additional page links.
 *
 * The component uses various animations and transitions to create a visually appealing and engaging footer experience.
 */

import Link from "next/link";
import { ConfigResponse } from "@/types/layout.type";
import Button from "../Common/Button";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollAnimation } from "../Common/useScrollAnimation";
import { cleanSpace } from "@/utils/commonFunctions";

interface FooterProps {
  websiteConfig: ConfigResponse | null;
}

const Footer: React.FC<FooterProps> = ({ websiteConfig }) => {
  const imgControls = useAnimation();
  const textControls = useAnimation();
  const [imgAnimationComplete, setImgAnimationComplete] = useState(false);
  const router = useRouter();
  const { ref: footerRef, inView: footerView } = useScrollAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      imgControls
        .start({ y: 0, transition: { duration: 1.5, ease: "easeOut" } })
        .then(() => {
          setImgAnimationComplete(true);
        });
    }
  }, [inView, imgControls]);

  useEffect(() => {
    if (imgAnimationComplete) {
      textControls.start((i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 1.5, delay: i * 0.1 },
      }));
    }
  }, [imgAnimationComplete, textControls]);

  if (!websiteConfig) return <></>;

  const { socialMediaLinks, footer, logo } = websiteConfig.data.attributes;
  const addressLines = footer.address.split("\n");
  const titleWords = footer.title.split(" ");
  const subtitleWords = footer.subTitle.split(" ");
  const contactInfoArray = [
    {
      icon: "phone.svg",
      text: footer.phone,
      identifier: "phone",
      redirect: cleanSpace(footer.phone),
    },
    {
      icon: "whatsup.svg",
      text: footer.whatsAppNumber,
      identifier: "whatsapp",
      redirect: cleanSpace(footer.whatsAppNumber),
    },
    {
      icon: "email.svg",
      text: footer.email,
      identifier: "email",
      redirect: footer.email,
    },
  ];
  const socialMediaLinksArray = [
    { href: socialMediaLinks.linkedIn, icon: "linkedIn.svg" },
    { href: socialMediaLinks.facebook, icon: "facebook.svg" },
    { href: socialMediaLinks.instagram, icon: "instagram.svg" },
  ];

  const handleRedirect = (value: string, identifier: string) => {
    switch (identifier) {
      case "whatsapp":
        window.open(`https://wa.me/${value}`, "_blank");
        break;
      case "phone":
        window.open(`tel:${value}`, "_blank");
        break;
      case "email":
        window.open(`mailto:${value}`, "_blank");
        break;
      case "address":
        window.open(`https://maps.app.goo.gl/hdgFrRvgP8pLGm7x7`, "_blank");
        break;
      default:
        router.push(value);
    }
  };

  return (
    <section ref={ref} className="hero-section">
      <motion.img
        src="/assets/images/web-footer-bg.webp"
        alt=""
    
        className="hero-background"
        initial={{ y: "100%" }}
        animate={imgControls}
      />

      <h2 className="hero-title text-[64px] font-light text-white leading-[90px] z-10">
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            initial={{ opacity: 0, x: -10 }}
            animate={textControls}
            custom={index}
            transition={{ duration: 0.5, delay: 0.02 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <div className="hero-description-container">
        <motion.p className="hero-description">
          {subtitleWords.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1"
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
      <div className="buttons-main-container">
        <div className="cta-container">
          <motion.div className="cta-text-box">
            <div>
              <motion.p
                className="cta-text"
                initial={{ x: -150, opacity: 0 }}
                animate={
                  inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }
                }
                transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
              >
                {footer.buttons[0].label}
              </motion.p>
            </div>
            <motion.div
              className="cta-button-wrapper"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
            >
              <Button
                type="secondaryBtn"
                name={footer.buttons[0].buttonText}
                className="cta-button"
                onClick={() => handleRedirect(footer.buttons[0].slug, "")}
              />
            </motion.div>
          </motion.div>
        </div>
        <div className="cta-container">
          <motion.div className="cta-text-box">
            <div>
              <motion.p
                className="cta-text"
                initial={{ x: -150, opacity: 0 }}
                animate={
                  inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }
                }
                transition={{ duration: 1, ease: "easeOut", delay: 2 }}
              >
                {footer.buttons[1].label}
              </motion.p>
            </div>
            <motion.div
              className="contact-button-wrapper"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 2 }}
            >
              <Button
                type="secondaryBtn"
                name={footer.buttons[1].buttonText}
                className="contact-button"
                onClick={() =>
                  handleRedirect(footer.buttons[1].slug, "whatsapp")
                }
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="contact-wrapper"></div>
      </div>

      <motion.footer
        ref={footerRef}
        className="footer-section"
        initial={{ y: 100, opacity: 0 }}
        animate={footerView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="footer-top">
          <div className="footer-logo-container">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={
                footerView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }
              }
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Link href="/" className="footer-logo">
                <link
                  rel="preload"
                  as="image"
                  href={logo.data.attributes.url}
                />
                <img
                  src={logo.data.attributes.url}
                  alt="Company Logo"
                  width={"250px"}
                />
              </Link>
            </motion.div>
            <motion.p className="footer-copyright">
              {footer.reservedRight.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    footerView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
          <div className="footer-content">
            <div className="footer-columns">
              <motion.div className="footer-column">
                <div className="contact-info">
                  <motion.h2
                    className="contact-title"
                    initial={{ x: -50, opacity: 0 }}
                    animate={
                      footerView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }
                    }
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    {footer.contactUs}
                  </motion.h2>
                  {contactInfoArray.map((item, index) => (
                    <motion.div
                      key={index}
                      className="contact-item cursor-pointer"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        footerView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      onClick={() =>
                        handleRedirect(item.redirect, item.identifier)
                      }
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                          footerView
                            ? { y: 0, opacity: 1 }
                            : { y: 20, opacity: 0 }
                        }
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <link
                          rel="preload"
                          as="image"
                          href={`/assets/images/${item.icon}`}
                        />
                        <img
                          src={`/assets/images/${item.icon}`}
                          alt={`${item.icon.split(".")[0]} Icon`}
                          className="contact-icon"
                      
                        />
                      </motion.div>
                      <motion.p
                        className="contact-text"
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                          footerView
                            ? { y: 0, opacity: 1 }
                            : { y: 20, opacity: 0 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2 + 0.25,
                        }}
                      >
                        {item.text}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="footer-adresscolumn">
                <div className="address-info">
                  <motion.div
                    className="address-item cursor-pointer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      footerView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={() =>
                      handleRedirect(addressLines.join(", "), "address")
                    }
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        footerView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <link
                        rel="preload"
                        as="image"
                        href="/assets/images/location.svg"
                      />
                      <img
                        src="/assets/images/location.svg"
                        alt="Location Icon"
                        className="address-icon"
                      
                      />
                    </motion.div>
                    <motion.address
                      className="address-text"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        footerView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <strong>{addressLines[0]}</strong>
                      {addressLines.slice(1).map((line, index) => (
                        <Fragment key={index}>
                          <br />
                          {line}
                        </Fragment>
                      ))}
                    </motion.address>
                  </motion.div>
                  <motion.div
                    className="hours-item items-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      footerView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.75 }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        footerView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <link
                        rel="preload"
                        as="image"
                        href="/assets/images/clock.svg"
                      />
                      <img
                        src="/assets/images/clock.svg"
                        alt="Clock Icon"
                        className="hours-icon"
                     
                      />
                    </motion.div>
                    <motion.p
                      className="hours-text"
                      initial={{ y: 20, opacity: 0 }}
                      animate={
                        footerView
                          ? { y: 0, opacity: 1 }
                          : { y: 20, opacity: 0 }
                      }
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {footer.availableDays} {footer.availableTime}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          className="social-box"
          initial={{ y: 20, opacity: 0 }}
          animate={footerView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div className="social-icons">
            {socialMediaLinksArray.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={
                  footerView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.75 + index * 0.1 }}
              >
                <Link href={item.href}>
                  <link
                    rel="preload"
                    as="image"
                    href={`/assets/images/${item.icon}`}
                  />
                  <img
                    src={`/assets/images/${item.icon}`}
                    alt={`${item.icon.split(".")[0]} Icon`}
                    className="social-icon"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="footer-links">
              {footer.pageLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    footerView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 1.25 + index * 0.1 }}
                >
                  <Link href={link.slug} className="footer-link">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.footer>
    </section>
  );
};

export default Footer;
