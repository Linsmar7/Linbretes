import { LockOpen, SignIn } from "phosphor-react";

export default function Login() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col bg-white p-4 rounded-2xl shadow-lg mb-4 text-black border-brand-500 border-2">
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="E-mail"
            className="w-full text-sm mb-2 p-2 placeholder-slate-400 border border-slate-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring focus:outline-none"
          />
          <input
            type="text"
            placeholder="Senha"
            className="w-full text-sm mb-2 p-2 placeholder-slate-400 border border-slate-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-x-2 py-2 px-6 bg-brand-500 rounded-md border-transparent text-sm text-white leading-6 hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500"
          >
            Login <SignIn />
          </button>
        </form>
        <span className="border-t-full border border-slate-300 my-6"></span>
        <div className="flex gap-x-2 justify-around">
          <button className="py-2 px-4 rounded-md text-sm text-black border border-brand-500 leading-6 hover:bg-brand-hover hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500">
            Google
          </button>
          <button className="py-2 px-4 rounded-md text-sm text-black border border-brand-500 leading-6 hover:bg-brand-hover hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500">
            Github
          </button>
        </div>
        <span className="border-t-full border border-slate-300 my-6"></span>
        <div className="flex gap-x-2 justify-around">
          <button className="flex items-center gap-x-2 py-2 px-4 rounded-md text-sm text-black border border-brand-500 leading-6 hover:bg-brand-hover hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500">
            <LockOpen />
            Esqueceu sua senha?
          </button>
          <button className="py-2 px-4 rounded-md text-sm text-black border border-brand-500 leading-6 hover:bg-brand-hover hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500">
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
