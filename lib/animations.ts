import { Variants } from "framer-motion";

// ===== BASIC ANIMATION VARIANTS =====

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ===== SCALE ANIMATIONS =====

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// ===== STAGGER ANIMATIONS =====

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5
    }
  }
};

export const staggerFadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ===== SLIDE ANIMATIONS =====

export const slideInLeft: Variants = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideInRight: Variants = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideInUp: Variants = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideInDown: Variants = {
  hidden: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ===== ROTATION ANIMATIONS =====

export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

export const flipX: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const flipY: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// ===== HOVER ANIMATIONS =====

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const hoverRotate: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// ===== COMPLEX ANIMATIONS =====

export const heroAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 1
    }
  }
};

export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

export const heroButton: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.4
    }
  }
};

// ===== CARD ANIMATIONS =====

export const cardContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const cardItem: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// ===== NAVIGATION ANIMATIONS =====

export const navbarSlideDown: Variants = {
  hidden: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const mobileMenuSlide: Variants = {
  closed: {
    x: "100%",
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const menuItemStagger: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const menuItem: Variants = {
  closed: {
    opacity: 0,
    x: -20
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// ===== PAGE TRANSITIONS =====

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 100
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 100,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// ===== LOADING ANIMATIONS =====

export const loadingDots: Variants = {
  start: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
    }
  }
};

export const loadingDot: Variants = {
  start: {
    y: ["0%", "-100%", "0%"],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export const spinAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    }
  }
};

// ===== FORM ANIMATIONS =====

export const formContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const formField: Variants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const errorMessage: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// ===== FLOATING ANIMATIONS =====

export const floatingY: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export const floatingRotate: Variants = {
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

// ===== REVEAL ANIMATIONS =====

export const revealFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const revealWidth: Variants = {
  hidden: {
    width: 0,
    opacity: 0
  },
  visible: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export const typewriter: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "linear",
    }
  }
};

// ===== UTILITY FUNCTIONS =====

export const createStaggerContainer = (staggerDelay: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    }
  }
});

export const createFadeInUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay
    }
  }
});

export const createScaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      delay
    }
  }
});

// ===== ANIMATION PRESETS =====

export const animationPresets = {
  // Page entrance
  pageEnter: pageTransition,

  // Hero section
  hero: heroAnimation,
  heroTitle,
  heroSubtitle,
  heroButton,

  // Cards and content
  cardGrid: cardContainer,
  card: cardItem,

  // Navigation
  navbar: navbarSlideDown,
  mobileMenu: mobileMenuSlide,

  // Forms
  form: formContainer,
  field: formField,

  // Loading states
  spinner: spinAnimation,
  dots: loadingDots,

  // Interactions
  hover: hoverScale,
  lift: hoverLift,

  // Staggered content
  stagger: staggerContainer,
  staggerItem,
};

export default animationPresets;
