export function getClassBorder(axieClass) {
  switch (axieClass) {
    case "Aquatic":
      return "#039BE5"
    case "Plant":
      return "#7CB342"
    case "Beast":
      return "#FDD835"
    case "Bird":
      return "#D81B60"
    case "Reptile":
      return "#8E24AA"
    case "Bug":
      return "#E53935"
    case "Mech":
      return "#484a48"
    case "Dusk":
      return "#4564ed"
    case "Dawn":
      return "#ebe26c"
  }
}

export function getClassBg(axieClass) {
  switch (axieClass) {
    case "Aquatic":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #01579B, #01579B, #01579B, #01579B)"
    case "Plant":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #33691E, #33691E, #33691E, #33691E)"
    case "Beast":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #F57F17, #F57F17, #F57F17, #F57F17)"
    case "Bird":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #880E4F, #880E4F, #880E4F, #880E4F)"
    case "Reptile":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #4A148C, #4A148C, #4A148C, #4A148C)"
    case "Bug":
      return "linear-gradient(to bottom, rgba(0,0,0,0), #B71C1C, #B71C1C, #B71C1C, #B71C1C)"
  }
}

export const GENE_COLOR_MAP = {
  "0000": {
    "0000": "FDFCF2",
    "0001": "544F44",
    "0010": "FED500",
    "0011": "FDAF13",
    "0100": "F5A037",
  },
  "0001": {
    "0000": "FFFAF5",
    "0001": "553B39",
    "0010": "FF606C",
    "0011": "FF423E",
    "0100": "DF2E54",
  },
  "0010": {
    "0000": "FFF7FE",
    "0001": "583C44",
    "0010": "FF99B0",
    "0011": "FFAEC1",
    "0100": "FF78B4",
  },
  "0011": {
    "0000": "FEFDF1",
    "0001": "4E523E",
    "0010": "AFDB1A",
    "0011": "DECD00",
    "0100": "99FF73",
  },
  "0100": {
    "0000": "F4FFF4",
    "0001": "4C545E",
    "0010": "00F0D2",
    "0011": "00DFF3",
    "0100": "00B8FF",
  },
  "0101": {
    "0000": "FFF7FE",
    "0001": "5E436C",
    "0010": "C569CF",
    "0011": "9967FB",
    "0100": "F8BBFF",
  },
  "1000": {
    "0000": "F6FBFF",
    "0001": "505050",
    "0010": "CDD5D7",
    "0011": "AD6D3E",
    "0100": "8B8E9E",
  },
  "1001": {
    "0000": "FCFBF2",
    "0001": "594026",
    "0010": "BBBAFF",
    "0011": "FFFF8D",
    "0100": "A4FFFF",
  },
  "1010": {
    "0000": "F4FEFB",
    "0001": "1D4D4F",
    "0010": "0097A0",
    "0011": "017181",
    "0100": "04ADB7",
  },
}
