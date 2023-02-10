import Link from "next/link";
import { Eye, Pencil, Plus } from "phosphor-react";
import Button from "../../components/Button";
import { Shell } from "../../components/Shell";
import { api } from "../../utils/api";

export default function Dashboard() {
  const { data: checklists } = api.checklist.getAll.useQuery();

  return (
    <Shell
      pageTitle="Dashboard"
      activePath="/dashboard"
      pageDescription="You can manage your checklists from here."
    >
      <h2 className="mt-8 mb-4 text-sm font-bold text-gray-400">CHECKLISTS</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/dashboard/new">
          <button className="group flex h-full w-full border-spacing-1 items-center justify-center rounded-md border-2 border-dashed p-4 py-5 transition-colors hover:border-blue-500">
            <div className="flex items-center gap-2 font-medium text-gray-400 transition-colors group-hover:text-blue-900 ">
              <Plus size={18} weight="bold" />
              <span>New checklist</span>
            </div>
          </button>
        </Link>
        {checklists?.map((checklist) => (
          <Card key={checklist.id} id={checklist.id} title={checklist.title} />
        ))}
      </div>
    </Shell>
  );
}

function Card({ title, id }: { title: string; id: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <p className="font-medium leading-5 text-gray-600 line-clamp-3">
        {title}
      </p>
      <div className="ml-4 flex gap-2 border-l pl-4">
        <Link href={`/dashboard/edit/${id}`}>
          <Button variant="outline" square>
            <Pencil size={18} />
          </Button>
        </Link>
        <Link href={`/${id}`} target="_blank">
          <Button variant="outline" square>
            <Eye size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
