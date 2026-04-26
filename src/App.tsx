import { useState } from 'react';
import { Pickaxe, Scroll, Users, Home, Settings, Zap, Gem, Award, FlaskConical, Swords, Leaf, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameState } from './hooks/useGameState';
import { CULTIVATION_STAGES } from './types';

export default function App() {
  const { state, upgradeBuilding, addDisciple, craftPill, promoteDisciple, clearSave, addCheats, claimArenaReward, updateTactics } = useGameState();
  const [currentView, setCurrentView] = useState<'buildings' | 'disciples' | 'gacha' | 'alchemy' | 'cultivation' | 'arena' | 'tactics'>('buildings');

  const { resources } = state;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-stone-300 font-serif border-8 border-zinc-900 box-border">
      {/* Sidebar */}
      <aside className="w-56 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-amber-500/70">Секта</span>
          <span className="text-xl font-bold text-amber-400">НЕБЕСНЫЙ ПРЕДЕЛ</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            icon={<Home size={18} />}
            label="Территория" 
            isActive={currentView === 'buildings'} 
            onClick={() => setCurrentView('buildings')} 
          />
          <NavItem 
            icon={<Users size={18} />}
            label="Ученики" 
            isActive={currentView === 'disciples'} 
            onClick={() => setCurrentView('disciples')} 
          />
          <NavItem 
            icon={<FlaskConical size={18} />}
            label="Алхимия и Крафт" 
            isActive={currentView === 'alchemy'} 
            onClick={() => setCurrentView('alchemy')} 
          />
          <NavItem 
            icon={<Scroll size={18} />}
            label="Культивация" 
            isActive={currentView === 'cultivation'} 
            onClick={() => setCurrentView('cultivation')} 
          />
          <NavItem 
            icon={<Sparkles size={18} />}
            label="Врата Найма" 
            isActive={currentView === 'gacha'} 
            onClick={() => setCurrentView('gacha')} 
          />
          <NavItem 
            icon={<Shield size={18} />}
            label="Тактика и Отряд" 
            isActive={currentView === 'tactics'} 
            onClick={() => setCurrentView('tactics')} 
          />
          <NavItem 
            icon={<Swords size={18} />}
            label="Арена Дуэлей" 
            isActive={currentView === 'arena'} 
            onClick={() => setCurrentView('arena')} 
          />
        </nav>
        <div className="p-4 flex flex-col gap-2">
          <button 
            onClick={addCheats}
            className="flex items-center gap-2 text-[10px] uppercase text-amber-500 hover:text-amber-400 transition-colors w-full p-2 border border-amber-500/30 hover:bg-amber-500/10 rounded-sm justify-center mb-2"
          >
            <Sparkles size={12} /> Читы (+Ресурсы)
          </button>
          <button 
            onClick={clearSave}
            className="flex items-center gap-2 text-[10px] uppercase text-stone-500 hover:text-red-400 transition-colors w-full p-2 border border-zinc-800 hover:bg-zinc-900 rounded-sm justify-center"
          >
            <Settings size={12} /> Начать заново
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-amber-500/30 bg-zinc-900/50 flex items-center justify-between px-8 relative z-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <ResourceItem value={Math.floor(resources.stones)} label="Духовные Камни" colorScheme="sky" symbol="֏" />
            <ResourceItem value={Math.floor(resources.qi)} label="Энергия Ци" colorScheme="purple" symbol="⚡" />
            <ResourceItem value={Math.floor(resources.herbs)} label="Травы" colorScheme="sky" symbol="🌿" />
            <ResourceItem value={Math.floor(resources.ore)} label="Руда" colorScheme="amber" symbol="⛏" />
            <ResourceItem value={resources.prestige} label="Репутация" colorScheme="amber" symbol="★" />
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase text-stone-500 mb-1">Стадия Главы</div>
            <div className="px-4 py-1 border border-amber-500/50 rounded-full text-amber-400 text-sm">
              Зарождение Души (Ранг III)
            </div>
          </div>
        </header>

        {/* Views */}
        <main className="flex-1 overflow-y-auto p-8 bg-zinc-950">
          <div className="max-w-5xl mx-auto">
            {currentView === 'buildings' && <BuildingsView state={state} onUpgrade={upgradeBuilding} />}
            {currentView === 'disciples' && <DisciplesView state={state} />}
            {currentView === 'gacha' && <GachaView state={state} onAdd={addDisciple} />}
            {currentView === 'alchemy' && <AlchemyView state={state} onCraft={craftPill} />}
            {currentView === 'cultivation' && <CultivationView state={state} onPromote={promoteDisciple} />}
            {currentView === 'tactics' && <TacticsView state={state} onUpdate={updateTactics} />}
            {currentView === 'arena' && <ArenaView state={state} onReward={claimArenaReward} />}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="h-10 bg-zinc-900 border-t border-zinc-800 px-6 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex gap-6">
            <span>ВЕРСИЯ: 0.1.5</span>
            <span>СЕРВЕР: ДУХОВНЫЙ ПИК</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>СВЯЗЬ С НЕБЕСАМИ СТАБИЛЬНА</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ----- Components & Views -----

function NavItem({ label, isActive, onClick, icon }: { label: string, isActive: boolean, onClick: () => void, icon?: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
        isActive 
          ? 'bg-zinc-900 border-l-2 border-amber-500 text-amber-400' 
          : 'text-stone-500 hover:text-sky-200 border-l-2 border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ResourceItem({ value, label, colorScheme, symbol }: { value: number, label: string, colorScheme: 'sky' | 'purple' | 'amber', symbol: string }) {
  const colorMap = {
    sky: 'text-sky-200',
    purple: 'text-purple-200',
    amber: 'text-amber-200'
  };
  const colorClass = colorMap[colorScheme];
  
  return (
    <div className="flex flex-col">
      <span className={`text-[10px] uppercase ${colorClass} opacity-50`}>{label}</span>
      <span className={`${colorClass} font-mono`}>{value.toLocaleString()} <span className="text-[10px] opacity-50">{symbol}</span></span>
    </div>
  );
}

function BuildingsView({ state, onUpgrade }: { state: any, onUpgrade: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-light text-stone-100 mb-2">Территория Секты</h2>
        <p className="text-stone-500 text-sm">Управляйте зданиями для увеличения добычи ресурсов.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BuildingCard 
          title="Главный зал" 
          level={state.buildings.mainHall}
          type="mainHall"
          description="Увеличивает престиж и лимит учеников."
          cost={state.buildings.mainHall * 500}
          currentStones={state.resources.stones}
          onUpgrade={onUpgrade}
          icon={<Home className="text-amber-400 opacity-80" size={24} />}
        />
        <BuildingCard 
          title="Духовная пещера" 
          type="cave"
          level={state.buildings.cave} 
          description="Ускоряет генерацию Ци и тренировки."
          cost={state.buildings.cave * 300}
          currentStones={state.resources.stones}
          onUpgrade={onUpgrade}
          icon={<Zap className="text-purple-400 opacity-80" size={24} />}
        />
        <BuildingCard 
          title="Рудник камней" 
          type="mine"
          level={state.buildings.mine} 
          description="Автоматическая добыча Духовных камней."
          cost={state.buildings.mine * 400}
          currentStones={state.resources.stones}
          onUpgrade={onUpgrade}
          icon={<Pickaxe className="text-sky-400 opacity-80" size={24} />}
        />
        <BuildingCard 
          title="Духовные поля" 
          type="herbGarden"
          level={state.buildings.herbGarden} 
          description="Выращивание духовных трав для алхимии."
          cost={state.buildings.herbGarden > 0 ? state.buildings.herbGarden * 400 + 400 : 500}
          currentStones={state.resources.stones}
          onUpgrade={onUpgrade}
          icon={<Leaf className="text-amber-400 opacity-80" size={24} />}
        />
        <BuildingCard 
          title="Лаборатория" 
          type="alchemyLab"
          level={state.buildings.alchemyLab} 
          description="Позволяет создавать пилюли для прорыва."
          cost={state.buildings.alchemyLab > 0 ? state.buildings.alchemyLab * 800 + 800 : 1000}
          currentStones={state.resources.stones}
          onUpgrade={onUpgrade}
          icon={<FlaskConical className="text-purple-400 opacity-80" size={24} />}
        />
      </div>
    </div>
  );
}

function BuildingCard({ title, type, level, description, cost, currentStones, onUpgrade, icon }: any) {
  const canUpgrade = currentStones >= cost;
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm relative flex flex-col hover:border-zinc-700 transition-colors group">
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/30 group-hover:border-amber-500/70 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/30 group-hover:border-amber-500/70 transition-colors"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="text-zinc-500">{icon}</div>
        <div className="text-center px-4 py-2 bg-zinc-950 border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">Уровень</div>
          <div className="text-lg text-stone-100 font-mono">{level}</div>
        </div>
      </div>
      
      <h3 className="text-xl font-light text-stone-100 mb-2">{title}</h3>
      <p className="text-sm text-stone-400 flex-1 mb-6 leading-relaxed">{description}</p>
      
      <motion.button 
        whileHover={canUpgrade ? { scale: 1.02 } : {}}
        whileTap={canUpgrade ? { scale: 0.98 } : {}}
        onClick={() => onUpgrade(type, cost)}
        disabled={!canUpgrade}
        className={`w-full py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
          canUpgrade 
            ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' 
            : 'border-zinc-800 text-stone-600 cursor-not-allowed'
        }`}
      >
        Улучшить ({cost} ֏)
      </motion.button>
    </div>
  );
}

function DisciplesView({ state }: { state: any }) {
  const { disciples } = state;
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-light text-stone-100 mb-2">Внутренние Ученики</h2>
        <p className="text-stone-500 text-sm">Боевая мощь вашей секты.</p>
      </div>

      {disciples.length === 0 ? (
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm text-center">
          <Users size={32} className="mx-auto text-zinc-700 mb-4" />
          <h3 className="text-lg text-stone-300 mb-2">Учеников пока нет</h3>
          <p className="text-stone-500 text-sm">Отправляйтесь во Врата Найма, чтобы найти новые таланты.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {disciples.map((d: any) => {
             const tagClass = getRarityTag(d.rarity);
             return (
              <div key={d.id} className={`p-4 bg-zinc-800/50 border-t ${tagClass.borderTop} flex items-center justify-between`}>
                <div className="flex flex-col w-48">
                  <span className="text-sm text-stone-200">{d.name} <span className="text-[10px] text-zinc-500 ml-1">Ур. {d.level || 1}</span></span>
                  <span className={`text-[10px] ${tagClass.text}`}>{d.role} • {d.element}</span>
                  <span className="text-[10px] text-amber-500 mt-1 mb-1">[{CULTIVATION_STAGES[d.cultivationStage]}]</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase">БМ</div>
                    <div className="text-sm text-stone-300 font-mono">{d.power}</div>
                  </div>
                  <div className={`text-[10px] uppercase ${tagClass.bg} px-2 py-1 border ${tagClass.border} ${tagClass.text}`}>
                    {d.rarity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GachaView({ state, onAdd }: { state: any, onAdd: any }) {
  const cost = 1000;
  const canSummon = state.resources.stones >= cost;
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonResult, setSummonResult] = useState<any>(null);

  const handleSummon = () => {
    if (!canSummon || isSummoning) return;
    
    setIsSummoning(true);
    setSummonResult(null);

    // Simulate summoning delay
    setTimeout(() => {
      const roles = ['Воин', 'Маг', 'Атакующий', 'Танк', 'Поддержка', 'Ассасин'];
      const elements = ['Огонь', 'Вода', 'Дерево', 'Металл', 'Земля'];
      const r = Math.random();
      let rarity = 'Обычный';
      let powerBase = 50;
      
      if (r > 0.99) { rarity = 'Легендарный'; powerBase = 200; }
      else if (r > 0.90) { rarity = 'Эпический'; powerBase = 150; }
      else if (r > 0.60) { rarity = 'Редкий'; powerBase = 100; }

      const firstNames = ['Лин', 'Фэн', 'Юнь', 'Шэнь', 'Чен', 'Вэй', 'Сюэ', 'Бай', 'Хань', 'Мо', 'Жуй', 'Тянь', 'Ин', 'Цзянь', 'Лун', 'Ян', 'Мин', 'Ши'];
      const lastNames = ['Фан', 'Сяо', 'Ли', 'Ван', 'Чжан', 'Лю', 'Е', 'Цзинь', 'Сюй', 'Чжао', 'Сун', 'Цю', 'Му', 'Лан', 'Гу'];

      const newDisciple = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${lastNames[Math.floor(Math.random() * lastNames.length)]} ${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
        rarity,
        role: roles[Math.floor(Math.random() * roles.length)] as any,
        element: elements[Math.floor(Math.random() * elements.length)] as any,
        level: 1,
        power: powerBase * 1.5,
        loyalty: 80 + Math.floor(Math.random() * 20),
        cultivationStage: 0,
      };

      onAdd(newDisciple, cost);
      setSummonResult(newDisciple);
      setIsSummoning(false);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-2xl mx-auto text-center mt-12"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-light text-stone-100 mb-2">Врата Найма</h2>
        <p className="text-stone-500 text-sm">Призовите культиваторов с разных уголков мира.<br/> Шанс Легендарного: 1%</p>
      </div>

      <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-sm relative flex flex-col items-center overflow-hidden min-h-[300px] justify-center">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/30"></div>
        
        <AnimatePresence mode="wait">
          {isSummoning ? (
            <motion.div 
              key="summoning"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: 1,
                rotate: [0, 5, -5, 0] 
              }}
              exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)", transition: { duration: 0.2 } }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <Scroll className="w-20 h-20 text-purple-400 mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
              <p className="text-purple-300 font-mono tracking-widest uppercase text-xs animate-pulse">Открытие Врат...</p>
            </motion.div>
          ) : summonResult ? (
            <motion.div 
              key="result"
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 rounded-full"></div>
                <Users className="w-16 h-16 text-purple-300 relative z-10" />
              </div>
              <div className={`text-sm uppercase tracking-widest mb-2 font-bold ${getRarityTag(summonResult.rarity).text}`}>
                 Призван {summonResult.rarity.toLowerCase()} ученик
              </div>
              <h3 className="text-2xl text-stone-100 font-bold tracking-wider mb-2">{summonResult.name}</h3>
              <div className="flex gap-3 mb-8">
                <span className={`text-[10px] uppercase ${getRarityTag(summonResult.rarity).bg} px-3 py-1 border ${getRarityTag(summonResult.rarity).border} ${getRarityTag(summonResult.rarity).text}`}>
                   {summonResult.rarity}
                </span>
                <span className="text-[10px] uppercase bg-zinc-800 px-3 py-1 border border-zinc-700 text-stone-300">{summonResult.role} • {summonResult.element}</span>
              </div>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={canSummon ? { scale: 1.05 } : {}}
                  whileTap={canSummon ? { scale: 0.95 } : {}}
                  onClick={handleSummon}
                  disabled={!canSummon || isSummoning}
                  className={`px-6 py-2 border text-xs uppercase tracking-widest transition-colors ${
                    canSummon 
                      ? 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10' 
                      : 'border-zinc-800 text-stone-600 cursor-not-allowed'
                  }`}
                >
                  Призвать еще
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSummonResult(null)}
                  className="px-6 py-2 border border-zinc-700 text-stone-400 hover:text-stone-200 text-xs uppercase tracking-widest transition-colors"
                >
                  Закрыть
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Scroll className="w-16 h-16 text-purple-400/50 mb-8" />
              
              <motion.button
                whileHover={canSummon ? { scale: 1.05, backgroundColor: "rgba(168,85,247,0.15)" } : {}}
                whileTap={canSummon ? { scale: 0.95 } : {}}
                onClick={handleSummon}
                disabled={!canSummon}
                className={`px-8 py-3 w-64 border text-xs uppercase tracking-widest transition-colors ${
                  canSummon 
                    ? 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                    : 'border-zinc-800 text-stone-600 cursor-not-allowed'
                }`}
              >
                Призвать
              </motion.button>
              <p className="mt-4 flex items-center justify-center gap-1 text-[10px] uppercase font-mono text-zinc-500">
                Стоимость: <span className={canSummon ? 'text-amber-400' : 'text-red-400'}>{cost} ֏</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AlchemyView({ state, onCraft }: { state: any, onCraft: any }) {
  const { inventory, buildings, resources } = state;
  const canCraft = buildings.alchemyLab > 0 && resources.herbs >= 100 && resources.qi >= 50;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-light text-stone-100 mb-2">Алхимия и Крафт</h2>
        <p className="text-stone-500 text-sm">Производите пилюли и артефакты для усиления секты.</p>
      </div>

      {buildings.alchemyLab === 0 ? (
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm text-center">
          <FlaskConical size={32} className="mx-auto text-zinc-700 mb-4" />
          <h3 className="text-lg text-stone-300 mb-2">Лаборатория не построена</h3>
          <p className="text-stone-500 text-sm">Постройте Алхимическую лабораторию на вкладке Территория.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
            <h3 className="text-lg font-light text-stone-100 mb-4 flex items-center gap-2">
              <FlaskConical className="text-purple-400" size={20} />
              Пилюля Прорыва
            </h3>
            <p className="text-sm text-stone-400 mb-6">Необходима для перехода ученика на следующую стадию культивации.</p>
            
            <div className="flex justify-between items-center bg-zinc-950 p-4 border border-zinc-800 mb-6">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-zinc-500 uppercase">Травы</div>
                  <div className={`text-sm font-mono ${resources.herbs >= 100 ? 'text-sky-300' : 'text-red-400'}`}>100</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-zinc-500 uppercase">Ци</div>
                  <div className={`text-sm font-mono ${resources.qi >= 50 ? 'text-purple-300' : 'text-red-400'}`}>50</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-zinc-500 uppercase">В наличии</div>
                <div className="text-lg font-mono text-amber-400">{inventory.breakthroughPills}</div>
              </div>
            </div>

            <motion.button 
              whileHover={canCraft ? { scale: 1.02 } : {}}
              whileTap={canCraft ? { scale: 0.98 } : {}}
              onClick={() => onCraft(100, 50)}
              disabled={!canCraft}
              className={`w-full py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
                canCraft 
                  ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' 
                  : 'border-zinc-800 text-stone-600 cursor-not-allowed'
              }`}
            >
              Синтезировать
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

function CultivationView({ state, onPromote }: { state: any, onPromote: any }) {
  const { disciples, inventory } = state;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-light text-stone-100 mb-2">Зал Культивации</h2>
          <p className="text-stone-500 text-sm">Проводите прорывы для кратного усиления боевой мощи.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2">
          <FlaskConical size={16} className="text-purple-400" />
          <span className="text-sm text-stone-300">Пилюль Прорыва: <span className="font-mono text-amber-400">{inventory.breakthroughPills}</span></span>
        </div>
      </div>

      {disciples.length === 0 ? (
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm text-center">
          <Swords size={32} className="mx-auto text-zinc-700 mb-4" />
          <h3 className="text-lg text-stone-300 mb-2">Зал пустует</h3>
          <p className="text-stone-500 text-sm">Наймите учеников, чтобы наставлять их на путь бессмертия.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {disciples.map((d: any) => {
            const isMaxStage = d.cultivationStage >= 4;
            const canPromote = !isMaxStage && inventory.breakthroughPills > 0;
            const currentStageName = CULTIVATION_STAGES[d.cultivationStage];
            const nextStageName = isMaxStage ? 'Максимум' : CULTIVATION_STAGES[d.cultivationStage + 1];

            return (
              <div key={d.id} className="p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between group">
                <div className="flex flex-col w-1/4">
                  <span className="text-sm text-stone-200">{d.name}</span>
                  <span className="text-[10px] text-zinc-500">Ур. {d.level || 1} БМ: {d.power}</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase">Текущая стадия</div>
                    <div className="text-sm text-stone-300">{currentStageName}</div>
                  </div>
                  {!isMaxStage && (
                    <>
                      <Swords size={16} className="text-amber-500 opacity-50" />
                      <div className="text-left">
                        <div className="text-[10px] text-purple-400/50 uppercase">Следующая стадия</div>
                        <div className="text-sm text-purple-300">{nextStageName}</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-1/4 flex justify-end">
                  <motion.button
                    whileHover={canPromote ? { scale: 1.05 } : {}}
                    whileTap={canPromote ? { scale: 0.95 } : {}}
                    onClick={() => onPromote(d.id)}
                    disabled={!canPromote}
                    className={`px-4 py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
                      canPromote 
                        ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' 
                        : 'border-zinc-800 text-stone-600 cursor-not-allowed'
                    }`}
                  >
                    {isMaxStage ? 'Достигнут предел' : 'Прорыв'}
                  </motion.button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArenaView({ state, onReward }: { state: any, onReward: any }) {
  const { disciples, team = [], formation = 'Круговая оборона' } = state;
  const [selectedId, setSelectedId] = useState<string>('');
  const [combatState, setCombatState] = useState<'select' | 'fighting' | 'result'>('select');
  const [combatData, setCombatData] = useState<any>(null);
  const [battleType, setBattleType] = useState<'1v1' | 'team'>('1v1');

  const start1v1Combat = () => {
    const player = disciples.find((d:any) => d.id === selectedId);
    if (!player) return;
    
    const roles = ['Воин', 'Маг', 'Атакующий', 'Танк', 'Поддержка', 'Ассасин'];
    const elements = ['Огонь', 'Вода', 'Дерево', 'Металл', 'Земля'];
    
    const enemyDisciple = {
      name: 'Бродячий Культиватор',
      power: Math.floor(player.power * (0.8 + Math.random() * 0.5)),
      element: elements[Math.floor(Math.random() * elements.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
    };

    const elementsRules: Record<string, string> = {
      'Огонь': 'Металл', 'Металл': 'Дерево', 'Дерево': 'Земля',
      'Земля': 'Вода', 'Вода': 'Огонь'
    };

    const flavorTexts = [
      "обрушивает шквал ударов",
      "применяет секретную технику",
      "собирает Ци в разрушительный выпад",
      "совершает молниеносную атаку",
      "бьет в уязвимую точку"
    ];

    let pHP = player.power * 10;
    let eHP = enemyDisciple.power * 10;
    const log = [];
    let round = 1;

    const pMult = elementsRules[player.element] === enemyDisciple.element ? 1.2 : 1.0;
    const eMult = elementsRules[enemyDisciple.element] === player.element ? 1.2 : 1.0;

    while (pHP > 0 && eHP > 0 && round <= 10) {
       const flavor1 = flavorTexts[Math.floor(Math.random() * flavorTexts.length)];
       const pDmg = Math.floor((player.power * 2) * pMult * (0.8 + Math.random() * 0.4));
       eHP -= pDmg;
       log.push({ round, actor: player.name, text: `${flavor1} стихии ${player.element}, нанося ${pDmg} урона.` });
       if (eHP <= 0) {
         log.push({ round, actor: "Система", text: `${enemyDisciple.name} падает без сил!`});
         break;
       }

       const flavor2 = flavorTexts[Math.floor(Math.random() * flavorTexts.length)];
       const eDmg = Math.floor((enemyDisciple.power * 2) * eMult * (0.8 + Math.random() * 0.4));
       pHP -= eDmg;
       log.push({ round, actor: enemyDisciple.name, text: `в ответ ${flavor2} (${enemyDisciple.element}) на ${eDmg} урона.` });
       if (pHP <= 0) {
         log.push({ round, actor: "Система", text: `${player.name} не выдерживает удара и отступает!`});
       }
       round++;
    }

    const won = pHP > 0;
    const rewards = { stones: won ? 800 : 200, prestige: won ? 15 : 2 };
    
    setCombatData({ player, enemy: enemyDisciple, log, won, rewards, mode: '1v1' });
    setCombatState('fighting');
    setTimeout(() => {
      setCombatState('result');
      onReward(rewards.stones, rewards.prestige);
    }, 1000);
  };

  const startTeamCombat = () => {
    const teamDisciples = team.map((id: string) => disciples.find((d:any) => d.id === id)).filter(Boolean);
    if (teamDisciples.length === 0) return;
    
    const basePower = teamDisciples.reduce((acc: number, d: any) => acc + d.power, 0);
    const teamPower = Math.floor(basePower * 1.15); // Formation bonus
    
    const enemyPower = Math.floor(teamPower * (0.8 + Math.random() * 0.5));
    const enemyTeam = { name: 'Секта Кровавого Лотоса', power: enemyPower };
    const playerTeam = { name: 'Ваша Секта', power: teamPower };

    let pHP = teamPower * 10;
    let eHP = enemyPower * 10;
    const log = [];
    log.push({ round: 0, actor: 'Система', text: `Ваш отряд использует формацию [${formation}]!` });
    
    let round = 1;
    while (pHP > 0 && eHP > 0 && round <= 5) {
       const pDmg = Math.floor((teamPower * 2) * (0.8 + Math.random() * 0.4));
       eHP -= pDmg;
       log.push({ round, actor: playerTeam.name, text: `проводит скоординированную атаку, нанося ${pDmg} урона.` });
       if (eHP <= 0) break;

       const eDmg = Math.floor((enemyPower * 2) * (0.8 + Math.random() * 0.4));
       pHP -= eDmg;
       log.push({ round, actor: enemyTeam.name, text: `совершает командный прорыв, нанося ${eDmg} урона.` });
       round++;
    }

    const won = pHP > 0;
    const rewards = { stones: won ? 3000 : 500, prestige: won ? 50 : 5 };
    
    setCombatData({ player: playerTeam, enemy: enemyTeam, log, won, rewards, mode: 'team' });
    setCombatState('fighting');
    setTimeout(() => {
      setCombatState('result');
      onReward(rewards.stones, rewards.prestige);
    }, 1000);
  };

  if (combatState === 'select') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-light text-stone-100 mb-2">Арена Дуэлей</h2>
          <p className="text-stone-500 text-sm">Проверьте силу своих учеников в турнирных боях против странствующих культиваторов.</p>
        </div>

        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setBattleType('1v1')}
            className={`px-6 py-2 text-xs uppercase tracking-widest border transition-colors ${battleType === '1v1' ? 'border-amber-500 text-amber-400 bg-amber-500/10' : 'border-zinc-800 text-stone-500 hover:border-zinc-600'}`}
          >
            Одиночные Бои
          </button>
          <button 
            onClick={() => setBattleType('team')}
            className={`px-6 py-2 text-xs uppercase tracking-widest border transition-colors ${battleType === 'team' ? 'border-purple-500 text-purple-400 bg-purple-500/10' : 'border-zinc-800 text-stone-500 hover:border-zinc-600'}`}
          >
            Командный Турнир
          </button>
        </div>

        {disciples.length === 0 ? (
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-sm text-center">
            <Swords size={32} className="mx-auto text-zinc-700 mb-4" />
            <h3 className="text-lg text-stone-300 mb-2">Учеников пока нет</h3>
            <p className="text-stone-500 text-sm">Наймите учеников, чтобы участвовать в боях.</p>
          </div>
        ) : (
          battleType === '1v1' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                 <h3 className="text-sm uppercase text-amber-500 tracking-widest mb-4">Выбор Бойца</h3>
                 
                 <div className="grid grid-cols-2 gap-3 mb-6 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                   {disciples.map((d: any) => (
                     <button
                       key={d.id}
                       onClick={() => setSelectedId(d.id)}
                       className={`p-3 border text-left flex flex-col transition-all ${
                         selectedId === d.id
                           ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                           : 'bg-zinc-950 border-zinc-800 text-stone-300 hover:border-zinc-700'
                       }`}
                     >
                       <span className="font-medium text-sm truncate w-full">{d.name}</span>
                       <span className="text-[10px] uppercase text-zinc-500 font-mono mt-1">БМ: {d.power} | {d.element}</span>
                     </button>
                   ))}
                 </div>
  
                 <motion.button 
                    whileHover={selectedId ? { scale: 1.02 } : {}}
                    whileTap={selectedId ? { scale: 0.98 } : {}}
                    onClick={start1v1Combat}
                    disabled={!selectedId}
                    className={`w-full py-3 border text-xs uppercase font-bold tracking-widest transition-colors ${
                      selectedId 
                        ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' 
                        : 'border-zinc-800 text-stone-600 cursor-not-allowed'
                    }`}
                 >
                   Найти противника
                 </motion.button>
              </div>
              {selectedId && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm"
                >
                   <h3 className="text-sm uppercase text-sky-500 tracking-widest mb-4">Характеристики</h3>
                   {(() => {
                     const d = disciples.find((d:any) => d.id === selectedId);
                     return d ? (
                       <div className="space-y-2 text-sm text-stone-400">
                         <p>Имя: <span className="text-stone-200">{d.name}</span></p>
                         <p>Боевая мощь: <span className="text-amber-400 font-mono">{d.power}</span></p>
                         <p>Стихия: <span className="text-sky-300">{d.element}</span></p>
                         <p>Роль: <span className="text-purple-300">{d.role}</span></p>
                       </div>
                     ) : null;
                   })()}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm max-w-2xl">
              <h3 className="text-sm uppercase text-purple-500 tracking-widest mb-4">Командный Турнир Сект (5 на 5)</h3>
              
              {team.length === 0 ? (
                <p className="text-stone-500 text-sm mb-6">Ваша команда пуста. Перейдите во вкладку <span className="text-sky-400">Тактика и Отряд</span>, чтобы сформировать отряд.</p>
              ) : (
                <div className="mb-6 space-y-2 text-sm text-stone-300">
                  <p>Формация: <span className="text-purple-400">{formation}</span></p>
                  <p>Учеников в отряде: <span className="text-sky-400">{team.length}</span></p>
                  <p>Общая мощь (базовая): <span className="text-amber-400">{
                    Math.floor(team.reduce((acc: number, id: string) => {
                      const d = disciples.find((x: any) => x.id === id);
                      return acc + (d?.power || 0);
                    }, 0))
                  }</span></p>
                </div>
              )}

              <motion.button 
                 whileHover={team.length > 0 ? { scale: 1.02 } : {}}
                 whileTap={team.length > 0 ? { scale: 0.98 } : {}}
                 onClick={startTeamCombat}
                 disabled={team.length === 0}
                 className={`w-full py-3 border text-xs uppercase font-bold tracking-widest transition-colors ${
                   team.length > 0 
                     ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' 
                     : 'border-zinc-800 text-stone-600 cursor-not-allowed'
                 }`}
              >
                Бросить вызов случайной секте
              </motion.button>
            </div>
          )
        )}
      </motion.div>
    );
  }

  if (combatState === 'fighting') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center p-32 space-y-6"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Swords size={64} className="text-amber-500/80 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        </motion.div>
        <div className="text-stone-300 font-bold tracking-widest uppercase text-sm animate-pulse">Бой идет...</div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring" } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm relative">
        {combatData.won ? (
          <motion.div 
            initial={{ rotate: -10, scale: 2, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-4 right-4 px-4 py-1 border border-green-500/50 bg-green-500/10 text-green-400 uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            Победа
          </motion.div>
        ) : (
          <motion.div 
            initial={{ rotate: 10, scale: 2, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-4 right-4 px-4 py-1 border border-red-500/50 bg-red-500/10 text-red-400 uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            Поражение
          </motion.div>
        )}
        
        <h2 className="text-2xl font-light text-stone-100 mb-6">Результат Дуэли</h2>
        
        <div className="flex items-center justify-between mb-8 bg-zinc-950 p-4 border border-zinc-800">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center w-1/3">
            <div className="text-xl text-sky-300">{combatData.player.name}</div>
            <div className="text-[10px] uppercase text-zinc-500 mt-1">Ваша секта</div>
          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl text-stone-600 font-bold w-1/3 text-center">
            VS
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center w-1/3">
            <div className="text-xl text-red-400">{combatData.enemy.name}</div>
            <div className="text-[10px] uppercase text-zinc-500 mt-1">Оппонент ({combatData.enemy.power} БМ)</div>
          </motion.div>
        </div>

        <h3 className="text-sm uppercase text-purple-300 tracking-widest mb-4">Журнал Событий</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3 text-xs mb-8 h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {combatData.log.map((entry: any, i: number) => (
            <motion.div variants={itemVariants} key={i} className="flex gap-3 text-stone-400 border-b border-zinc-800/50 pb-2 last:border-0">
              <span className="text-zinc-500 font-mono w-16 shrink-0">Раунд {entry.round}</span>
              <span className={entry.actor === combatData.player.name ? 'text-sky-400 font-medium' : 'text-red-400 font-medium'}>{entry.actor}</span>
              <span>{entry.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + combatData.log.length * 0.1 }} // wait for log to finish roughly
          className="border-t border-zinc-800 pt-6"
        >
           <h3 className="text-sm uppercase text-amber-500 tracking-widest mb-4">Награды</h3>
           <div className="flex gap-6 mb-6">
             <div className="flex flex-col">
               <span className="text-[10px] uppercase text-stone-500">Духовные Камни</span>
               <span className="text-amber-400 font-mono text-lg">+{combatData.rewards.stones} ֏</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] uppercase text-stone-500">Престиж</span>
               <span className="text-purple-400 font-mono text-lg">+{combatData.rewards.prestige} ★</span>
             </div>
           </div>

           <div className="flex gap-4">
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => combatData?.mode === 'team' ? startTeamCombat() : start1v1Combat()}
                className="flex-1 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs uppercase font-bold tracking-widest transition-colors"
             >
               {combatData?.mode === 'team' ? 'Следующий турнир' : 'Следующая дуэль'}
             </motion.button>
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCombatState('select')}
                className="flex-1 py-3 border border-zinc-700 text-stone-400 hover:text-stone-200 text-xs uppercase font-bold tracking-widest transition-colors"
             >
               Закрыть
             </motion.button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TacticsView({ state, onUpdate }: { state: any, onUpdate: any }) {
  const { disciples, team = [], formation = 'Круговая оборона' } = state;
  const [localTeam, setLocalTeam] = useState<string[]>(team);
  const [localFormation, setLocalFormation] = useState<string>(formation);

  const formations = [
    { name: 'Клинок прорыва', desc: 'Агрессивная расстановка. Подходит для Воинов и Ассасинов. Быстро пробивает защиту.' },
    { name: 'Черепаха', desc: 'Глухая защита. Танки принимают весь урон. Очень низкий темп, высокая выживаемость.' },
    { name: 'Круговая оборона', desc: 'Сбалансированная защита. Средний темп боя, защита распределяется поровну.' },
    { name: 'Волчья стая', desc: 'Стремительная контратака. Ассасины и Атакующие наносят сильный массовый урон.' },
    { name: 'Лотос', desc: 'Поддерживающая формация. Эффективность исцеления Поддержки увеличена.' }
  ];

  const handleToggle = (id: string) => {
    if (localTeam.includes(id)) {
      setLocalTeam(localTeam.filter(t => t !== id));
    } else if (localTeam.length < 5) {
      setLocalTeam([...localTeam, id]);
    }
  };

  const handleSave = () => {
    onUpdate(localTeam, localFormation);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h2 className="text-2xl font-light text-stone-100 mb-2">Тактика и Отряд</h2>
        <p className="text-stone-500 text-sm">Сформируйте отряд из 5 учеников для участия в командных турнирах.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
            <h3 className="text-sm uppercase text-sky-400 tracking-widest mb-4 flex justify-between items-center">
              <span>Доступные ученики</span>
              <span className="text-stone-500">{localTeam.length} / 5</span>
            </h3>
            {disciples.length === 0 ? (
              <p className="text-zinc-600 text-sm font-mono p-4 text-center">Нет доступных учеников</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                {disciples.map((d: any) => {
                  const isSelected = localTeam.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleToggle(d.id)}
                      className={`p-3 border text-left flex flex-col transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 opacity-100'
                          : 'bg-zinc-950 border-zinc-800 text-stone-300 hover:border-zinc-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <span className="font-medium text-sm truncate w-full">{d.name} <span className="text-[10px] text-zinc-500 ml-1">Ур. {d.level || 1}</span></span>
                      <span className="text-[10px] uppercase font-mono mt-1 opacity-70">
                        {d.role} | БМ: {d.power}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
            <h3 className="text-sm uppercase text-amber-500 tracking-widest mb-4">Формация</h3>
            <div className="space-y-3">
              {formations.map(f => (
                <button
                  key={f.name}
                  onClick={() => setLocalFormation(f.name)}
                  className={`w-full text-left p-3 border transition-colors ${
                    localFormation === f.name 
                      ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' 
                      : 'border-zinc-800 bg-zinc-950 text-stone-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{f.name}</div>
                  <div className="text-[10px] text-zinc-500 leading-tight">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={handleSave}
             className="w-full py-4 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs uppercase font-bold tracking-widest transition-colors flex justify-center items-center gap-2"
          >
             <Shield size={16} /> Утвердить Тактику
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Helpers
function getRarityTag(rarity: string) {
  switch (rarity) {
    case 'Легендарный': return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', borderTop: 'border-amber-500/50', text: 'text-amber-400' };
    case 'Эпический': return { bg: 'bg-purple-500/10', border: 'border-purple-500/20', borderTop: 'border-purple-500/50', text: 'text-purple-400' };
    case 'Редкий': return { bg: 'bg-sky-500/10', border: 'border-sky-500/20', borderTop: 'border-sky-500/50', text: 'text-sky-400' };
    default: return { bg: 'bg-stone-500/10', border: 'border-stone-500/20', borderTop: 'border-stone-500/50', text: 'text-stone-400' };
  }
}
