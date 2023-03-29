interface InOut {
    initial: { scale: number, opacity: number },
    animate: { scale: number, opacity: number },
    exit: { scale: number, opacity: number },
    transition: { duration: number, type: string }
}

export const InOut: InOut = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: { duration: 0.9, type: 'spring' }
}
