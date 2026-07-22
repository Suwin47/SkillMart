function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        S
      </div>

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          SkillMart
        </h2>

        <p className="text-sm text-slate-500">
          Digital Marketplace
        </p>

      </div>

    </div>
  );
}

export default Logo;