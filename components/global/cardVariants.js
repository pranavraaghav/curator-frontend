import { opacity } from "tailwindcss/defaultTheme"

const cardVariants = {
  // hidden : {

  // },
  initial: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  initialUp: {
    opacity: 0.3,
    y: -20,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exitLeft: {
    x: -10,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  hover: {
    boxShadow: "2px 2px 8px 10px rgba(0,0,0,0.2)",
  },
}

export { cardVariants }
