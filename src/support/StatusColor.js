export const StatusColor = status => {
  switch (status) {
    case "Awaiting Payment":
      return "danger";
    case "Awaiting Confirmation":
      return "warning";
    case "Processed":
      return "info";
    case "Shipping":
      return "primary";
    case "Delivered":
      return "success";

    case "Unpaid":
      return "success";
    case "Paid":
      return "warning";
    case "Confirmed":
      return "secondary";

    default:
      return "light";
  }
};
