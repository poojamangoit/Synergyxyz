export const getStylesByUrl = (locale: string | undefined) => {
  const styles = {
    navbar: {},
  };

  if (locale === "ms") {
    styles.navbar = {
      left: "85px",
    };
  } else if (locale === "vi") {
    styles.navbar = {
      left: "40px",
    };
  } else if (locale === "th") {
    styles.navbar = {
      left: "30px",
    };
  } else if (locale === "id") {
    styles.navbar = {
      left: "15px",
    };
  } else {
    styles.navbar = {
      left: "45px",
    };
  }

  return styles;
};
