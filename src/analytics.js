import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-1TTPGYYJ49"; // Replace with your Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Log page views
export const logPageView = (pathname) => {
  if (pathname) {
    ReactGA.send({ hitType: "pageview", page: pathname });
  }
};

// Log custom events
export const logEvent = (category, action, label = "") => {
  if (category && action) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
