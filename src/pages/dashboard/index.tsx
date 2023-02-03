import { Eye, Pencil, Plus } from "phosphor-react";
import Button from "../../components/Button";
import { Shell } from "../../components/Shell";

export default function Dashboard() {
  return (
    <Shell
      pageTitle="Dashboard"
      currentPath="/dashboard"
      pageDescription="You can manage your checklists from here."
    >
      <h2 className="mt-8 mb-4 text-sm font-bold text-gray-400">CHECKLISTS</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-md border p-4">
          <p className="font-medium leading-5 text-gray-600 line-clamp-3">
            Checklist title goes here and if it is longer that
          </p>
          <div className="ml-4 flex gap-2 border-l pl-4">
            <Button variant="outline" square>
              <Pencil size={18} />
            </Button>
            <Button variant="outline" square>
              <Eye size={18} />
            </Button>
          </div>
        </div>
        <button className="group flex border-spacing-1 items-center justify-center rounded-md border-2 border-dashed p-4 py-5 transition-colors hover:border-blue-500">
          <div className="flex items-center gap-2 font-medium text-gray-400 transition-colors group-hover:text-blue-900 ">
            <Plus size={18} weight="bold" />
            <span>New checklist</span>
          </div>
        </button>
      </div>
    </Shell>
  );
}
