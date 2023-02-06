import Button from "../../components/Button";
import { Shell } from "../../components/Shell";

export default function Settings() {
  return (
    <Shell activePath="/dashboard/settings" pageTitle="Settings">
      <div className="mt-6">
        <p className="mb-2 text-gray-600">The only setting for now...</p>
        <Button color="danger">Delete my account</Button>
      </div>
    </Shell>
  );
}
