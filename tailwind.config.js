const config = {
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: "#120e27",
        paragraph: "#a3a8c3",
        primary: {
          "50": "#eff8ff",
          "100": "#dff1ff",
          "200": "#b7e4ff",
          "300": "#77cfff",
          "400": "#2fb7ff",
          "500": "#0393e3",
          "600": "#007dd1",
          "700": "#0063a9",
          "800": "#01558b",
          "900": "#074673",
          "950": "#052d4c",
        },
        secondary: {
          100: "#09E98A",
          200: "#079a5d",
        },
        copy: {
          100: "#3384ee",
          200: "#333cee",
        },
      },
    },
  },
  plugins: [],
};
export default config;
