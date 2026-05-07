"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/[lang]/(home)/Home.module.css";
import Button from "@/components/common/Button/Button";


type LeadMagnetFormProps = {
  title: string;
  description: string;
  placeholder: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function LeadMagnetForm({
  title,
  description,
  placeholder,
  submitLabel,
  successMessage,
  errorMessage,
}: LeadMagnetFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const updateDeviceMode = () => {
      const touchMatch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      const touchPoints = navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchMatch || touchPoints);
    };

    updateDeviceMode();
    window.addEventListener("resize", updateDeviceMode);

    return () => {
      window.removeEventListener("resize", updateDeviceMode);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Lead Magnet",
          email,
          subject: "Download Report 2024",
          message: "Lead magnet download request",
        }),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        statusTimeoutRef.current = setTimeout(() => setStatus("idle"), 6000);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const sectionClassName = isTouchDevice ? styles.leadMagnetMobile : styles.leadMagnetSection;

  return (
    <section id="form" className={sectionClassName}>
      <div className={`container ${styles.magnetContainer}`}>
        <div className="magnet-content fade-in-up">
          <h2>{title}</h2>
          <p>{description}</p>
          <form className={styles.magnetForm} onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder={placeholder} aria-label={placeholder} required />
            <Button type="submit" variant="primary" isLoading={status === "loading"}>
              {submitLabel}
            </Button>
          </form>
          {status === "success" ? (
            <p style={{ color: "var(--success-green)", marginTop: "1rem", fontSize: "0.9rem" }} aria-live="polite">
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: "0.5rem" }} />
              {successMessage}
            </p>
          ) : null}
          {status === "error" ? (
            <p style={{ color: "var(--error-red)", marginTop: "1rem", fontSize: "0.9rem" }} aria-live="polite">
              <FontAwesomeIcon icon={faCircleExclamation} style={{ marginRight: "0.5rem" }} />
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
