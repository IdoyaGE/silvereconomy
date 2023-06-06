export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#FFE6E6",
    100: "#FFCCCC",
    200: "#FF9999",
    300: "#FF6666",
    400: "#FF3333",
    500: "#FF0000",
    600: "#BC0000",
    700: "#7D0000",
    800: "#3F0000",
    900: "#190000",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: "#000000",
              main: "#333333",
              mediumMain: "#666666",
              medium: "#858585",
              light: "#C2C2C2",
            },
            background: {
              default: "#0A0A0A",
              alt: "#1A1A1A",
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: "#333333",
              main: "#666666",
              mediumMain: "#858585",
              medium: "#A3A3A3",
              light: "#F0F0F0",
            },
            background: {
              default: "#F6F6F6",
              alt: "#FFFFFF",
            },
          }),
    },
    typography: {
      fontFamily: ["Raleway", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
