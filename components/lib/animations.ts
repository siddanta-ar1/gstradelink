// Rule: Soft, calm, professional. No springs/bounces.

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const hoverScale = {
  scale: 1.02, // Very subtle scale, strictly < 1.05
  transition: { duration: 0.2 },
};
