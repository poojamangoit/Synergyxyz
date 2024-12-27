/**
 * The `ContactForm` component is a React functional component that renders a contact form for users to submit their information.
 *
 * The form includes fields for the user's name, email, phone number, budget, type of service, objective, and message. The form also includes a checkbox for the user to agree to the website's terms of use and privacy policy.
 *
 * The component uses the `react-hook-form` library to manage the form state and validation, and the `yupResolver` from `@hookform/resolvers/yup` to validate the form data using the `contactValidations` schema.
 *
 * The component also uses the `useScrollAnimation` hook to animate the form fields as the user scrolls down the page.
 *
 * When the user submits the form, the `onSubmit` function is called, which sends the form data to the `contactUsAPI` endpoint using the `postFetch` function from `@/utils/apiMethods`. If the form is submitted successfully, a success message is displayed using the `react-toastify` library. If there is an error, an error message is displayed.
 */
import { ContactInfo, Social } from "@/types/contact.type";
import React, { useEffect, useState } from "react";
import styles from "@/styles/contact.module.css";
import Button from "../Common/Button";
import { URL } from "@/config/webConfig";
import { postFetch } from "@/utils/apiMethods";
import { motion } from "framer-motion";
import ContactInfoComp from "./ContactInfo";
import { useForm, SubmitHandler } from "react-hook-form";
import ShowError from "@/utils/showError";
import { ContactValidations } from "@/validations/contactValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useScrollAnimation } from "../Common/useScrollAnimation";
import Dropdown from "../Common/Dropdown";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface ContactFormProps {
  social: Social;
  contactInfo: ContactInfo;
}
interface IFormInput {
  name: string;
  email: string;
  phone: string;
  budget: string;
  typeOfService: string;
  objective: string;
  message: string;
  terms?: boolean;
}

interface DropdownOptionsProps {
  key: string;
  value: string;
}
const ContactForm: React.FC<ContactFormProps> = ({ social, contactInfo }) => {
  const { t, i18n } = useTranslation("common");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(ContactValidations()),
    context: { t },
    mode: "onChange",
  });
  const { ref: formRef, inView: formInView } = useScrollAnimation();
  const { ref: nameEmailRef, inView: nameEmailInView } = useScrollAnimation();
  const { ref: phoneBudgetRef, inView: phoneBudgetInView } =
    useScrollAnimation();
  const { ref: serviceRef, inView: serviceInView } = useScrollAnimation();
  const { ref: messageRef, inView: messageInView } = useScrollAnimation();
  const { ref: termsRef, inView: termsInView } = useScrollAnimation();
  const { ref: buttonRef, inView: buttonInView } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSelected, setResetSelected] = useState("");
  const [dropdownValue, setDropdownValue] = useState<any>({
    budgetKey: "",
    budgetValue: "",
    typeOfServiceKey: "",
    typeOfServiceValue: "",
    objectiveKey: "",
    objectiveValue: "",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      setIsSubmitting(true);
      const formattedData = {
        data: {
          ...formData,
          budget: dropdownValue.budgetValue,
          typeOfService: dropdownValue.typeOfServiceValue,
          objective: dropdownValue.objectiveValue,
        },
      };
      await postFetch(URL.contactUsAPI, formattedData);
      toast.success("Form submitted successfully!", {
        position: "bottom-right",
      });
      reset();
      setResetSelected("- choose -");
    } catch (error) {
      toast.error("An error occurred while submitting the form.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Reset form and errors on route change
    const handleRouteChange = () => {
      reset();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, reset]);

  const handleSelect = (
    selected: DropdownOptionsProps,
    field: keyof IFormInput
  ) => {
    setValue(field, selected.key, { shouldValidate: true });
    if (field === "budget") {
      setDropdownValue({
        ...dropdownValue,
        budgetKey: selected.key,
        budgetValue: selected.value,
      });
    }
    if (field === "typeOfService") {
      setDropdownValue({
        ...dropdownValue,
        typeOfServiceKey: selected.key,
        typeOfServiceValue: selected.value,
      });
    }
    if (field === "objective") {
      setDropdownValue({
        ...dropdownValue,
        objectiveKey: selected.key,
        objectiveValue: selected.value,
      });
    }
  };

  return (
    <motion.div
      ref={formRef}
      className={styles.form_content}
      initial={{ y: 50, opacity: 0 }}
      animate={formInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <ContactInfoComp social={social} contactInfo={contactInfo} />
      <motion.div
        className={styles.form_container}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className={styles.field_container}
            ref={nameEmailRef}
            initial={{ y: 20, opacity: 0 }}
            animate={
              nameEmailInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.form_group}>
              <motion.label
                htmlFor="name"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.name")}
              </motion.label>
              <div>
                <motion.input
                  className={`${styles.input_field} ${styles.no_focus}`}
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder={t("contact.namePlaceholder")}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                />
                {errors && errors.name ? ShowError(errors?.name?.message) : ""}
              </div>
            </div>
            <div className={styles.form_group}>
              <motion.label
                htmlFor="email"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.email")}
              </motion.label>
              <div>
                <motion.input
                  className={`${styles.input_field} ${styles.no_focus}`}
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder={t("contact.emailPlaceholder")}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                />
                {errors && errors.email
                  ? ShowError(errors?.email?.message)
                  : ""}
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={phoneBudgetRef}
            className={styles.field_container}
            initial={{ y: 20, opacity: 0 }}
            animate={
              phoneBudgetInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.form_group}>
              <motion.label
                htmlFor="phone"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.phone")}
              </motion.label>
              <div>
                <motion.input
                  className={`${styles.input_field} ${styles.no_focus}`}
                  type="text"
                  id="phone"
                  {...register("phone")}
                  placeholder={t("contact.phonePlaceholder")}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                />
                {errors && errors.phone
                  ? ShowError(errors?.phone?.message)
                  : ""}
              </div>
            </div>

            <div className={styles.form_group}>
              <motion.label
                htmlFor="budget"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.budget")}
              </motion.label>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <Dropdown
                  key={i18n.language}
                  options={t("budget.BudgetOption", {
                    returnObjects: true,
                  })}
                  resetSelected={resetSelected}
                  label={t("contact.dropdownLabel")}
                  onSelect={(selected) => handleSelect(selected, "budget")}
                  selectedValue={dropdownValue.budgetKey}
                />
                {errors && errors.budget
                  ? ShowError(errors?.budget?.message)
                  : ""}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={serviceRef}
            className={styles.field_container}
            initial={{ y: 20, opacity: 0 }}
            animate={
              serviceInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.form_group}>
              <motion.label
                htmlFor="typeOfService"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.typeOfService")}
              </motion.label>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <Dropdown
                  key={i18n.language}
                  resetSelected={resetSelected}
                  options={t("services.serviceOption", { returnObjects: true })}
                  label={t("contact.dropdownLabel")}
                  onSelect={(selected) =>
                    handleSelect(selected, "typeOfService")
                  }
                  selectedValue={dropdownValue.typeOfServiceKey}
                />

                {errors && errors.typeOfService
                  ? ShowError(errors?.typeOfService?.message)
                  : ""}
              </motion.div>
            </div>
            <div className={styles.form_group}>
              <motion.label
                htmlFor="objective"
                className={styles.input_label}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                {t("contact.objective")}
              </motion.label>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <Dropdown
                  key={i18n.language}
                  resetSelected={resetSelected}
                  options={t("objective.ObjectiveOption", {
                    returnObjects: true,
                  })}
                  label={t("contact.dropdownLabel")}
                  onSelect={(selected) => handleSelect(selected, "objective")}
                  selectedValue={dropdownValue.objectiveKey}
                />

                {errors && errors.objective
                  ? ShowError(errors?.objective?.message)
                  : ""}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={messageRef}
            className={styles.textarea_container}
            initial={{ y: 20, opacity: 0 }}
            animate={
              messageInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.label
              htmlFor="message"
              className={styles.textarea_input_label1}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.7 }}
            >
              {t("contact.message1")}
            </motion.label>
            <motion.label
              htmlFor="message"
              className={styles.textarea_input_label2}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.7 }}
            >
              {t("contact.message2")}
            </motion.label>

            <div>
              <motion.textarea
                id="message"
                {...register("message")}
                placeholder={t("contact.messagePlaceholder")}
                className={`${styles.textarea_field} ${styles.no_focus}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              ></motion.textarea>
              {errors && errors.message
                ? ShowError(errors?.message?.message)
                : ""}
            </div>
          </motion.div>

          <motion.div
            ref={termsRef}
            className={styles.checkbox_container}
            initial={{ y: 20, opacity: 0 }}
            animate={termsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className={styles.input_checkbox}
              onChange={(e) =>
                setValue("terms", e.target.checked, { shouldValidate: true })
              }
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.7 }}
            />
            <motion.span
              className={styles.checkmark}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.8 }}
            ></motion.span>
            <motion.span className={styles.checkmark_text}>
              {t("contact.conditionText1")}{" "}
              <Link href="privacypolicy" className="underline">
                {t("contact.privacy")}
              </Link>{" "}
              {t("contact.conditionText2")}{" "}
              <Link href="termsofservice" className="underline">
                {t("contact.terms")}
              </Link>
            </motion.span>
          </motion.div>
          {errors && errors.terms ? ShowError(errors?.terms?.message) : ""}

          <motion.div
            ref={buttonRef}
            initial={{ y: 20, opacity: 0 }}
            animate={
              buttonInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.button_container}
          >
            <Button
              type="primaryBtn"
              name={t("contact.submit")}
              isLoading={isSubmitting}
            />
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};
export default ContactForm;