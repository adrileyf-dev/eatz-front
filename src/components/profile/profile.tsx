import Image from "next/image";
export default function Profile() {
  return (
    <main className="flex">
      <section className="bg-slate-50 flex-grow min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/im.png"
              alt="Minha imagem"
              width={320}
              height={320}
              className="rounded-2xl shadow-md h-40 md:h-64 lg:h-80 w-auto"
            />
          </div>

          {/* Text */}
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-4xl text-slate-800 font-bold">
              Adriley Francisco Almeida Pereira
            </h1>
            <p className="text-xl text-slate-600 font-medium mt-2">
              Analista de Sistemas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
