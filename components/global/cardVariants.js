const cardVariants = {
    // hidden : {

    // },
    // initial :{
        
    // },
    visible : {
        transition : {
            type : "tween",
            ease: "easeInOut",
            duration : 2,
        },
    },
    hover : {
        boxShadow: "2px 2px 8px 10px rgba(0,0,0,0.2)",
    }
}

const cardIconVariants = {
    hover : {
        
    }
}

export { cardVariants };