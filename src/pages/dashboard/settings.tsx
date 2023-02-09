import Button from "../../components/Button";
import { DialogModal } from "../../components/DialogModal";
import { Shell } from "../../components/Shell";

export default function Settings() {
  return (
    <Shell activePath="/dashboard/settings" pageTitle="Settings">
      <div className="mt-6">
        <p className="mb-2 text-gray-600">The only setting for now...</p>
        <DialogModal
          title="Are you SURE you want to delete your account?"
          description="Not trying to gaslight you or anything, just asking if you're sure. This action is not reversible."
          type="danger"
          target={<Button color="danger">Delete my account</Button>}
          onConfirm={() => console.log("confirmed. deleting...")}
        />
      </div>
    </Shell>
  );
}
