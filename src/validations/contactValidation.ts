import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRules = /^[A-Za-z ]*$/;
const phoneRules = /^\+?[0-9\s()-]{10,20}$/;

export const ContactValidations = () => {
  const { t } = useTranslation("common");

  return Yup.object().shape({
    email: Yup.string()
      .required(t("validation.emailRequired"))
      .matches(emailRules, t("validation.emailInvalid"))
      .email(t("validation.emailInvalid")),
    name: Yup.string()
      .required(t("validation.nameRequired"))
      .matches(nameRules, t("validation.nameInvalid")),
    phone: Yup.string()
      .required(t("validation.phoneRequired"))
      .matches(phoneRules, t("validation.phoneInvalid")),
    budget: Yup.string().required(t("validation.budgetRequired")),
    typeOfService: Yup.string().required(t("validation.serviceRequired")),
    objective: Yup.string().required(t("validation.objectiveRequired")),
    message: Yup.string().required(t("validation.messageRequired")),
    terms: Yup.boolean().oneOf([true], t("validation.termsRequired")),
  });
};
