interface scaleTransition {
    opacity: {
        duration: number
    },
    scale: {
        type: string,
        stiffness: number,
        damping: number,
    }
}

interface ButtonAnimation {
    initial: { scale: number, opacity: number },
    animate: { scale: number, opacity: number, transition: scaleTransition },
    exit: { scale: number, opacity: number },
    whileHover: { scale: number, transition: scaleTransition },
    whileTap: { scale: number, transition: scaleTransition },
}

const scaleTransition: scaleTransition = {
    opacity: {
        duration: 0.5
    },
    scale: {
        type: "spring",
        stiffness: 400,
        damping: 15,
    }
}

export const ButtonAnimation: ButtonAnimation = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: scaleTransition },
    exit: { scale: 1.2, opacity: 0 },
    whileHover: { scale: 1.1, transition: scaleTransition },
    whileTap: { scale: 0.9, transition: scaleTransition },
}
