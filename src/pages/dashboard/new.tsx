import React from "react";
import { ChecklistForm } from "../../components/ChecklistForm";
import { Shell } from "../../components/Shell";

export default function New() {
  return (
    <Shell
      pageTitle="New checklist"
      backTo="/dashboard"
      activePath="/dashboard"
    >
      <ChecklistForm />
    </Shell>
  );
}
