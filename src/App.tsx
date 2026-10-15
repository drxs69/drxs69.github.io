
import { useEffect } from "react";

import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { usePreferences } from "./preferences";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import BackendTest from "./components/BackendTest";

import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

type NavigationState = {
  scrollTo?: string;
};

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const state =
      location.state as NavigationState | null;

    const targetId = state?.scrollTo;

    const frame = requestAnimationFrame(() => {
      if (targetId) {
        const element =
          document.getElementById(targetId);

        if (element) {
          const destination =
            element.getBoundingClientRect().top +
            window.scrollY -
            80;

          window.scrollTo({
            top: Math.max(0, destination),
            behavior: "instant",
          });

          return;
        }
      }

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.state]);

  return null;
}

function BackendTestPage() {
  return (
    <main className="min-h-[75vh] px-6 pt-28 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Backend Development
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            React + FastAPI Integration
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            This temporary development page tests whether
            the React frontend can communicate with the
            Python FastAPI backend through HTTP requests.
          </p>
        </div>

        <BackendTest />
      </div>
    </main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  const shouldReduceMotion = useReducedMotion();
  const { motion: motionPreference } = usePreferences();

  const reduceMotion =
    Boolean(shouldReduceMotion) ||
    motionPreference === "minimal";

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.div
        key={location.pathname}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -12 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.38,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-screen"
      >
        <ScrollManager />

        <Routes location={location}>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetail />}
          />

          {import.meta.env.DEV && (
            <Route
              path="/backend-test"
              element={<BackendTestPage />}
            />
          )}

          <Route
            path="*"
            element={
              <main className="min-h-screen px-6 pt-40 text-center">
                <h1 className="text-3xl font-semibold text-white">
                  Page not found
                </h1>
              </main>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#090b10] text-white">
        <CustomCursor />

        <Navbar />

        <AnimatedRoutes />

        <Footer />
      </div>
    </HashRouter>
  );
}
