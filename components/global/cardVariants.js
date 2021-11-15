const cardVariants = {
  // hidden : {

  // },
  initial: {
    x: 0,
    y: 0,
    opacity: 1,
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
  initialUp: {
    opacity: 0.3,
    y: -20,
  },
  hover: {
    boxShadow: "2px 2px 8px 10px rgba(0,0,0,0.2)",
  },
}

const cardIconVariants = {
  hover: {},
}

export { cardVariants }
