function App() {
  const skills = ['UGC Ads', 'Meta', 'Short-form video', 'B2C SaaS'];

  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-8 text-[#171513]">
      <div className="mx-auto flex min-h-[780px] w-full max-w-sm flex-col rounded-[34px] border border-white/60 bg-[#fbf8f3] p-4 shadow-[0_24px_70px_rgba(35,27,19,0.14)]">
        <header className="mb-4 flex items-center justify-between px-1">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-[#e7dfd3] bg-white text-lg shadow-[0_8px_20px_rgba(31,24,17,0.08)]"
            aria-label="Назад"
          >
            ←
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.26em] text-[#9f9486]">Creator Match</p>
            <p className="text-sm font-medium">Быстрый подбор</p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-[#e7dfd3] bg-white text-lg shadow-[0_8px_20px_rgba(31,24,17,0.08)]"
            aria-label="Фильтры"
          >
            ⌘
          </button>
        </header>

        <section className="relative flex-1 overflow-hidden rounded-[28px] border border-white/70 bg-[#d9cebf] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
          <img
            src="https://images.unsplash.com/photo-1671185703655-4b49f7464935?auto=format&fit=crop&w=900&q=80"
            alt="Портрет специалиста по маркетингу"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110f0d]/72 via-[#120f0f]/24 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
            <div className="rounded-full border border-white/35 bg-[#181410]/44 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              online now
            </div>
            <div className="rounded-2xl border border-white/35 bg-[#181410]/44 px-3 py-2 text-right text-white backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">от</p>
              <p className="text-base font-semibold">55 000 ₽/проект</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="mb-3">
              <p className="text-[28px] font-semibold leading-none">Лина, 27</p>
              <p className="mt-1 text-sm text-white/80">Performance маркетолог • 5 лет опыта</p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/35 bg-white/18 px-3 py-1 text-xs font-medium backdrop-blur-md"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-xl border border-white/25 bg-white/12 p-2 backdrop-blur-md">
                <p className="text-white/70">Отклик</p>
                <p className="font-medium">~ 12 минут</p>
              </div>
              <div className="rounded-xl border border-white/25 bg-white/12 p-2 backdrop-blur-md">
                <p className="text-white/70">Завершено</p>
                <p className="font-medium">34 проекта</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-4">
          <button
            type="button"
            className="mb-3 w-full rounded-2xl border border-[#dbd0bf] bg-[#171513] px-4 py-4 text-base font-semibold text-[#f8f4ec] shadow-[0_16px_28px_rgba(19,16,13,0.26)] transition hover:translate-y-[-1px]"
          >
            Написать в личку
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className="rounded-2xl border border-[#e2d8c8] bg-white py-3 text-sm font-medium text-[#7f7365] shadow-[0_8px_20px_rgba(25,18,13,0.08)]"
            >
              Пропуск
            </button>
            <button
              type="button"
              className="rounded-2xl border border-[#e2d8c8] bg-white py-3 text-sm font-medium text-[#171513] shadow-[0_8px_20px_rgba(25,18,13,0.08)]"
            >
              Профиль
            </button>
            <button
              type="button"
              className="rounded-2xl border border-[#d8c7ad] bg-[#ddc19a] py-3 text-sm font-semibold text-[#20180f] shadow-[0_10px_20px_rgba(32,24,15,0.18)]"
            >
              Лайк
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
