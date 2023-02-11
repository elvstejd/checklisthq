import Button from "../../components/Button";
import { DialogModal } from "../../components/DialogModal";
import { Shell } from "../../components/Shell";

export default function Settings() {
  return (
    <Shell activePath="/dashboard/settings" pageTitle="Settings">
      <div className="mt-6">
        <div className="text-gray-400">
          <p className="mb-2 ">Coming soon:</p>
          <ul className="list-disc">
            <li>Set my profile as public</li>
            <li>Delete my account</li>
          </ul>
        </div>
        <div className="hidden">
          <DialogModal
            title="Are you sure you want to delete your account?"
            description="This action is not reversible. All your checklist will be gone as well. Unless they were created as an"
            type="danger"
            target={<Button color="danger">Delete my account</Button>}
            onConfirm={() => console.log("confirmed. deleting...")}
            confirmLabel="Yes, delete forever."
          />
        </div>
      </div>
    </Shell>
  );
}
