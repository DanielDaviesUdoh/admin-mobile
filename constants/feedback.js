export const statusMessages = {
  200: {
    severity: "success",
    title: "Success",
    message: "Your request was successful!",
  },
  201: {
    severity: "success",
    title: "Success",
    message: "Your resource has been created successfully.",
  },
  204: {
    severity: "success",
    title: "Success",
    message: "The resource was deleted successfully.",
  },
  "Request failed with status code 204": {
    severity: "error",
    title: "Error",
    message: "No content available.",
  },
  "Request failed with status code 400": {
    severity: "error",
    title: "Error",
    message: "There was an error in your request. Please check and try again.",
  },
  "Request failed with status code 401": {
    severity: "error",
    title: "Error",
    message: "You are not authorized. Please log in and try again.",
  },
  "Request failed with status code 403": {
    severity: "error",
    title: "Error",
    message: "You do not have permission to access this resource.",
  },
  "Request failed with status code 404": {
    severity: "error",
    title: "Error",
    message: "The requested resource was not found.",
  },
  "Request failed with status code 405": {
    severity: "error",
    title: "Error",
    message: "This action cannot be performed right now. Please try again.",
  },
  "Request failed with status code 500": {
    severity: "error",
    title: "Error",
    message: "An internal server error occurred. Please try again later.",
  },
  "Request failed with status code 502": {
    severity: "error",
    title: "Error",
    message: "The server received an invalid response from an upstream server.",
  },
  "Request failed with status code 503": {
    severity: "error",
    title: "Error",
    message: "The service is currently unavailable. Please try again later.",
  },
  "Request failed with status code 504": {
    severity: "error",
    title: "Error",
    message: "The server took too long to respond. Please try again later.",
  },
  "Network Error": {
    severity: "error",
    title: "Error",
    message: "No internet connection or server unreachable.",
  },
  "timeout of Xms exceeded": {
    severity: "error",
    title: "Error",
    message: "Request timeout error.",
  },
  "Request aborted": {
    severity: "error",
    title: "Error",
    message: "Request was canceled.",
  },
  "Unsupported Protocol": {
    severity: "error",
    title: "Error",
    message: "Invalid request protocol",
  },
};
