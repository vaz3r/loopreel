interface HeadlineStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textTransform: string;
}

interface BodyStyle {
  fontSize: string;
  fontWeight: string;
}

interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  border: string;
  gridBorder: string;
  fontSerif: string;
  fontSans: string;
  fontMono: string;
}

export function getHeadlineStyle(text: string): HeadlineStyle {
  const len = text.length;
  if (len < 18) {
    return {
      fontSize: "130px",
      fontWeight: "300",
      fontStyle: "italic",
      textTransform: "none",
    };
  }
  if (len <= 34) {
    return {
      fontSize: "95px",
      fontWeight: "300",
      fontStyle: "italic",
      textTransform: "none",
    };
  }
  if (len <= 64) {
    return {
      fontSize: "72px",
      fontWeight: "300",
      fontStyle: "italic",
      textTransform: "none",
    };
  }
  return {
    fontSize: "54px",
    fontWeight: "300",
    fontStyle: "italic",
    textTransform: "none",
  };
}

export function getBodyStyle(
  text: string,
): BodyStyle {
  const len = text.length;
  if (len < 120) {
    return { fontSize: "38px", fontWeight: "300" };
  }
  if (len < 250) {
    return { fontSize: "30px", fontWeight: "300" };
  }
  if (len < 400) {
    return { fontSize: "24px", fontWeight: "400" };
  }
  return { fontSize: "20px", fontWeight: "400" };
}

export function getThemeColors(): ThemeColors {
  return {
    bg: "#EBEAE5",
    text: "#111111",
    accent: "#003049",
    border: "rgba(17,17,17,0.20)",
    gridBorder: "rgba(17,17,17,0.12)",
    fontSerif: '"Playfair Display", serif',
    fontSans: '"Manrope", sans-serif',
    fontMono: '"Space Mono", monospace',
  };
}
