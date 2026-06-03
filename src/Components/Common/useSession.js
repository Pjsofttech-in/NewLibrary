// useSession.js
import { useMemo } from "react";

export const useSession = () => {
  const role = sessionStorage.getItem("role") || "staff";
  const email = sessionStorage.getItem("email") || "tunvi@gmail.com";
  const branchCode = sessionStorage.getItem("branchCode") || "BCH608";
  const instituteEmail = sessionStorage.getItem("instituteEmail") || "student@gmail.com";
  const institutionType = sessionStorage.getItem("institutionType") || "School";

  return useMemo(() => ({ role, email, branchCode, instituteEmail, institutionType }), [role, email, branchCode, instituteEmail, institutionType]);
};
