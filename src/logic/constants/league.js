export const LEAGUES_ORDER = ["EERSTE AFDELING", "TWEEDE AFDELING A", "TWEEDE AFDELING B", "DERDE AFDELING A", "DERDE AFDELING B", "DERDE AFDELING C", "DERDE AFDELING D"];

export const LEAGUES_MAP = (league) => {
  switch (league) {
    case "1":
      return "EERSTE AFDELING";
    case "2A":
      return "TWEEDE AFDELING A";
    case "2B":
      return "TWEEDE AFDELING B";
    case "3A":
      return "DERDE AFDELING A";
    case "3B":
      return "DERDE AFDELING B";
    case "3C":
      return "DERDE AFDELING C";
    case "3D":
      return "DERDE AFDELING D";
    default:
      return "";
  }
};
