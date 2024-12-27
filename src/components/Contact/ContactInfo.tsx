/**
 * Renders the contact information section of the website, including the contact details, social media links, and animations.
 *
 * @param {ContactInfoProps} props - The props for the contact information component.
 * @param {Social} props.social - The social media information for the website.
 * @param {ContactInfo} props.contactInfo - The contact information for the website.
 * @returns {React.ReactElement} - The rendered contact information component.
 */
import styles from "@/styles/contact.module.css";
import { ContactInfo, Paragraph, Social } from "@/types/contact.type";
import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollAnimation } from "../Common/useScrollAnimation";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

interface ContactInfoProps {
  social: Social;
  contactInfo: ContactInfo;
}
interface ContactItemProps {
  item: {
    image: string;
    text: string | Paragraph[];
    identifier: string;
    redirectLink: string;
  };
  index: number;
}

interface RichTextProps {
  image: string;
  text: Paragraph[];
  identifier: string;
  redirectLink: string;
}

const renderRichText = (
  content: RichTextProps,
  handleRedirect: (identifier: string, redirectLink: string) => void
) => {
  return content.text.map((item, index) => {
    if (item.type === "paragraph") {
      return (
        <p
          key={index}
          className={`${content.identifier === "address" && "cursor-pointer"}`}
          onClick={() =>
            content.identifier === "address" &&
            handleRedirect(content.redirectLink, content.identifier)
          }
        >
          {item.children.map((child: any, childIndex: number) => {
            if (child.bold) {
              return (
                <strong
                  key={childIndex}
                  className={`${styles.span_text} cursor-pointer`}
                  onClick={() =>
                    handleRedirect(content.redirectLink, content.identifier)
                  }
                >
                  {child.text}
                </strong>
              );
            }

            return child.text;
          })}
        </p>
      );
    }

    return null;
  });
};

const ContactItem: React.FC<ContactItemProps> = ({ item, index }) => {
  const [itemRef, itemInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const router = useRouter();

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
    <motion.div
      ref={itemRef}
      className={styles.contactInfo}
      initial={{ x: -50, opacity: 0 }}
      animate={itemInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
    >
      <motion.img
        src={`/assets/images/${item.image}`}
        alt="contact icon"
        width={16}
        height={16}
        className={styles.contact_img + " cursor-pointer"}
        initial={{ x: -20, opacity: 0 }}
        animate={itemInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
        onClick={() => handleRedirect(item.redirectLink, item.identifier)}
      />
      <motion.div
        className={styles.contact_text}
        initial={{ x: -20, opacity: 0 }}
        animate={itemInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
      >
        {typeof item.text === "string"
          ? item.text
          : renderRichText(
              { ...item, text: item.text as Paragraph[] },
              handleRedirect
            )}
      </motion.div>
    </motion.div>
  );
};

const ContactInfoComp: React.FC<ContactInfoProps> = ({
  social,
  contactInfo,
}) => {
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();
  const { ref: socialRef, inView: socialInView } = useScrollAnimation();
  const { ref: socialLinksRef, inView: socialLinksInView } =
    useScrollAnimation();

  const contactItems = [
    {
      image: "phone_white.svg",
      text: contactInfo.phone,
      identifier: "phone",
      redirectLink: contactInfo.linkPhone,
    },
    {
      image: "whatsup_white.svg",
      text: contactInfo.whatsAppNumber,
      identifier: "whatsapp",
      redirectLink: contactInfo.linkWhatsapp,
    },
    {
      image: "email_white.svg",
      text: contactInfo.email,
      identifier: "email",
      redirectLink: contactInfo.linkEmail,
    },
    {
      image: "location_white.svg",
      text: contactInfo.address,
      identifier: "address",
      redirectLink: contactInfo.linkAddress,
    },
    {
      image: "clock_white.svg",
      text: `${contactInfo.availableDays} ${contactInfo.availableTime}`,
      identifier: "",
      redirectLink: "",
    },
  ];

  const socialMediaLinksArray = [
    { href: social.links.linkedIn, icon: "linkedIn_white.svg" },
    { href: social.links.facebook, icon: "facebook_white.svg" },
    { href: social.links.instagram, icon: "instagram_white.svg" },
  ];

  return (
    <motion.div
      className={styles.contact_container}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
    >
      <motion.h3
        ref={titleRef}
        className={styles.contact_head}
        initial={{ x: -20, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {contactInfo.title.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
      <div className="mt-[25px] font-[300]">
        {contactItems.map((item, index) => (
          <ContactItem key={index} item={item} index={index} />
        ))}
      </div>

      <div ref={socialRef} className={styles.social_container}>
        <motion.p
          className={styles.social_text}
          initial={{ x: -50, opacity: 0 }}
          animate={socialInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          {social.title.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 + index * 0.1 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          ref={socialLinksRef}
          className={styles.social_media_links}
          initial={{ x: -10, opacity: 0 }}
          animate={
            socialLinksInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: 1 }}
        >
          {socialMediaLinksArray.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: social.title.split(" ").length * 0.1 + 0.4 + index * 0.1,
              }}
            >
              <Link href={item.href}>
                <link
                  rel="preload"
                  as="image"
                  href={`/assets/images/${item.icon}`}
                />
                <img
                  src={`/assets/images/${item.icon}`}
                  alt={`Social media icon ${index + 1}`}
                  width={24}
                  height={24}
                  loading={"lazy"}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactInfoComp;
