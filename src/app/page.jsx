import Link from "next/link";
import data from "@/data.json";

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <header className="mb-16 flex flex-col items-center gap-4 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-400">
            The cipher index
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Cryptography Algorithms Explorer
          </h1>
        </header>

        <div className="space-y-16">
          {data?.ciphers?.map((category) => (
            <section key={category.category}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">
                  {category.category}
                </h2>
                <div className="h-px flex-1 bg-stone-200 dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((cipher) => (
                  <Link
                    href={`/component/${cipher.id}`}
                    key={cipher.id}
                    className="group overflow-hidden border border-stone-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400"
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-800 p-6 text-center dark:bg-cyan-950">
                      <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-cyan-400/20 transition-transform duration-500 group-hover:scale-125" />
                      <div className="absolute bottom-8 right-12 h-20 w-20 rounded-full border border-cyan-400/10 transition-transform duration-500 group-hover:-translate-x-4" />
                      <span className="relative max-w-[12ch] text-3xl font-semibold leading-[0.95] tracking-tight text-white sm:text-4xl">
                        {cipher.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
