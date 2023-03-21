import { extendTheme, theme as base } from "@chakra-ui/react"

export const DESIGN_MAX_WIDTH = 1400

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    brand: {
      50: "#e1f1fe",
      100: "#b6dbfe",
      200: "#85c6fe",
      300: "#4daffe",
      400: "#029eff",
      500: "#008efe",
      600: "#0080f0",
      700: "#006edc",
      800: "#005cca",
      900: "#003da9",
    },
    complementary: {
      50: "#fff7e0",
      100: "#ffe9b0",
      200: "#ffdb7e",
      300: "#ffce48",
      400: "#ffc21d",
      500: "#ffb800",
      600: "#ffaa00",
      700: "#ff9600",
      800: "#ff8500",
      900: "#ff6302",
    },
  },
  fonts: {
    heading: `'Pixel TCG','Inconsolata'`,
    body: `'Pixel TCG','Inconsolata'`,
  },
  styles: {
    global: {
      body: {
        color: "gray.100",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        bg: "gray.700",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        cursor: "pointer",
      },
      variants: {
        primary: {
          color: "#E2E8F0",
          borderRadius: "50px",
          border: "2px solid #4daffe",
          backgroundColor: "brand.400",
          boxShadow: "-1px 2px 12px #141921",
          transition: "all 0.5s",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          _focus: {
            outline: "none !important",
          },
          _active: {
            backgroundColor: "brand.300",
            transform: "translate(0, 3px)",
            boxShadow: "-1px 1px 12px #141921",
            transition: "all 0.2s",
          },
        },
        navSelected: {
          bg: "rgba(2, 158, 255, 0.1)",
          paddingBottom: "2px",
          borderTop: "1px solid #1A202C",
          borderBottom: "2px solid #4daffe",
          borderRadius: "25px",
          margin: "0 2px",
        },
        nav: {
          borderRadius: "25px",
          transition: "all 0.2s",
          margin: "0 2px",
          WebkitTapHighlightColor: "transparent",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          _focus: {
            outline: "none !important",
          },
          _hover: {
            paddingBottom: "2px",
            borderTop: "1px solid #1A202C",
            borderBottom: "2px solid #4daffe",
            transition: "all 0.2s",
          },
          _active: {
            backgroundColor: "brand.400",
            transition: "all 0.2s",
          },
        },
      },
    },
    Tooltip: {
      baseStyle: {
        background: "none",
        boxShadow: "none",
      },
    },
    AccordionButton: {
      baseStyle: {
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      },
    },
    AccordionPanel: {
      baseStyle: {
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      },
    },
  },
})

export default theme
