export const toMiliseconds = (value) => (value / 1000000).toFixed(2);

export const reuestColor = (request) => {
  switch (request) {
    case "POST":
      return "#2196f3";
    case "PUT":
      return "#4caf50";
    case "GET":
      return "#f44336";
    case "DELETE":
      return "#3f51b5";
    case "OPTION":
      return "#ffeb3b";
    default:
      return "#f44336";
  }
};
