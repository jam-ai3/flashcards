import GenerateForm from "./_components/generate-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LANDING_PAGE_URL } from "@/lib/constants";

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect(LANDING_PAGE_URL);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 px-6 h-page">
      <section className="flex flex-col justify-center items-center gap-4">
        <h2 className="font-semibold text-xl lg:text-4xl">
          Generate flashcards
        </h2>
        <p className="w-3/4 text-md text-muted-foreground lg:text-lg text-center">
          Upload your notes, syllabus, or some information about your course to
          get started generating flashcards.
        </p>
      </section>
      <section className="items-center grid">
        <GenerateForm userId={session.id} />
      </section>
    </main>
  );
}
