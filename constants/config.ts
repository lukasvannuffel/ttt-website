/** Site-wide contact details */
export const PHONE_NUMBER = "+32479927426";
export const PHONE_URL = `tel:${PHONE_NUMBER}`;
export const EMAIL_ADDRESS = "info@treetoptom.be";
export const EMAIL_URL = `mailto:${EMAIL_ADDRESS}`;

/** Site URLs */
export const SITE_URL = "https://www.treetoptom.be";

/** Social media */
export const INSTAGRAM_HANDLE = "_tree_top_tom_";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/** Behold Instagram widget */
export const BEHOLD_FEED_ID = "FpvRdgx572FiW0fh5Bhe";

/** Navigation links — shared between desktop nav and mobile menu */
export const NAV_LINKS = [
    { href: "#home", label: "Home", mobileLabel: "Home" },
    { href: "#diensten", label: "Diensten", mobileLabel: "Diensten" },
    { href: "#over", label: "Over", mobileLabel: "Over ons" },
    { href: "#contact", label: "Contact", mobileLabel: "Contact" },
] as const;

/** Navigation scroll behaviour */
export const SCROLL_THRESHOLD = 100;
export const NAV_COLLAPSE_SCROLL_MIN = 50;
export const MOBILE_BREAKPOINT_PX = 768;

/** Hero parallax */
export const PARALLAX_FACTOR = 0.4;

/** Contact form */
export const MESSAGE_MAX_LENGTH = 500;
export const SUBMIT_SUCCESS_TIMEOUT_MS = 4000;

/** Carousel swipe */
export const MIN_SWIPE_DISTANCE_PX = 50;
