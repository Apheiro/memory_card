interface scaleTransition {
    scale: {
        type: string,
        stiffness: number,
        damping: number,
    }
}

interface CardsAnimation {
    initial: { scale: number, opacity: number },
    animate: { scale: number, opacity: number, transition: { scale: { duration: number }, opacity: { duration: number } } },
    exit: { opacity: number, transition: { opacity: { duration: number } } },
    whileHover: { scale: number, transition: scaleTransition },
    whileTap: { scale: number, transition: scaleTransition },
}

const scaleTransition: scaleTransition = {
    scale: {
        type: "spring",
        stiffness: 400,
        damping: 15,
    }
}

export const Cards = {
    initial: { opacity: 0, },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    whileHover: { scale: 1.1, transition: scaleTransition },
    whileTap: { scale: 0.9, transition: scaleTransition },
}
