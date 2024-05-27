const darkTheme = {
  label: "Dark",
  background: "#121212",
  text: "#FFFFFF",  
  gradient: "linear-gradient(315deg, #F7971E 0%, #FFD200 94%)",
  title: "#ffc107",
  textTypeBox: "#706d6d",
  stats: "#7FFFD4",
  fontFamily: "Roboto Mono",
  subheadercolor: "#7FFFD4",
};

const darkTheme2 = {
  label: "Dark2",
  background: "#030613",
  text: "#FFFFFF",
  textTypeBox: "#355067",
  stats: "#7FFFD4",
  fontFamily: "Roboto Mono",
  subheadercolor: "#7FFFD4",
}

const strawberryTheme = {
  label: "Strawberry",
  background: "#f37f83",
  text: "#FFFFFF",
  textTypeBox: "#cc3d51",
  stats: "#7FFFD4",
  fontFamily: "Roboto Mono",
  subheadercolor: "#7FFFD4",
}

const redTheme = {
  label: "Red",
  background: "#ce1226",
  text: "#FFFFFF",
  textTypeBox: "#6d0f19",
  stats: "#fcd116",
  fontFamily: "Roboto Mono",
  subheadercolor: "#fcd116",
}

const greenTheme= {
  label: "Green",
  background: "#00c18c",
  text: "#FFFFFF",
  textTypeBox: "#186544",
  stats: "#7FFFD4",
  fontFamily: "Roboto Mono",
  subheadercolor: "#7FFFD4",
}

const blueTheme = {
  label: "Blue",
  background: "#0058a3",
  text: "#FFFFFF",
  textTypeBox: "#57abdb",
  stats: "#7FFFD4",
  fontFamily: "Roboto Mono",
  subheadercolor: "#7FFFD4",
}

const defaultTheme = darkTheme;

const themesOptions = [
  { value: darkTheme, label: "Dark" },
  { value: darkTheme2, label: "Dark2"},
  { value: strawberryTheme, label: "Strawberry"},
  { value: redTheme, label: "Red"},
  { value: greenTheme, label: "Green"},
  { value: blueTheme, label: "Blue"},
];

export {
  darkTheme,
  defaultTheme,
  themesOptions,
  darkTheme2,
  strawberryTheme,
  redTheme,
  greenTheme,
  blueTheme,
};
