import { useState, useEffect, useCallback } from 'react';
import { GameState, Disciple, FormationType } from '../types';

const INITIAL_STATE: GameState = {
  resources: { stones: 1000, qi: 100, prestige: 10, herbs: 0, ore: 0 },
  buildings: { mainHall: 1, mine: 1, cave: 1, alchemyLab: 0, herbGarden: 0 },
  inventory: { breakthroughPills: 0 },
  disciples: [],
  team: [],
  formation: 'Круговая оборона',
  lastUpdate: Date.now(),
};

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('wuxia_sect_save_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load save', e);
    }
    return INITIAL_STATE;
  });

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('wuxia_sect_save_v2', JSON.stringify(state));
  }, [state]);

  // Game Loop (Resources generation)
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const now = Date.now();
        const deltaSeconds = (now - prev.lastUpdate) / 1000;
        
        const stoneIncome = prev.buildings.mine * 5 * deltaSeconds; 
        const oreIncome = prev.buildings.mine * 1 * deltaSeconds;
        const qiIncome = prev.buildings.cave * 2 * deltaSeconds;
        const herbsIncome = prev.buildings.herbGarden * 1.5 * deltaSeconds;

        return {
          ...prev,
          resources: {
            ...prev.resources,
            stones: prev.resources.stones + stoneIncome,
            ore: prev.resources.ore + oreIncome,
            qi: prev.resources.qi + qiIncome,
            herbs: prev.resources.herbs + herbsIncome,
          },
          lastUpdate: now,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const upgradeBuilding = useCallback((buildingId: keyof GameState['buildings'], cost: number) => {
    setState((prev) => {
      if (prev.resources.stones >= cost) {
        return {
          ...prev,
          resources: {
            ...prev.resources,
            stones: prev.resources.stones - cost,
          },
          buildings: {
            ...prev.buildings,
            [buildingId]: prev.buildings[buildingId] + 1,
          },
        };
      }
      return prev;
    });
  }, []);

  const addDisciple = useCallback((disciple: Disciple, cost: number) => {
    setState((prev) => {
      if (prev.resources.stones >= cost) {
        return {
          ...prev,
          resources: {
            ...prev.resources,
            stones: prev.resources.stones - cost,
          },
          disciples: [...prev.disciples, disciple],
        };
      }
      return prev;
    });
  }, []);

  const craftPill = useCallback((costHerbs: number, costQi: number) => {
    setState((prev) => {
      if (prev.buildings.alchemyLab > 0 && prev.resources.herbs >= costHerbs && prev.resources.qi >= costQi) {
        return {
          ...prev,
          resources: {
            ...prev.resources,
            herbs: prev.resources.herbs - costHerbs,
            qi: prev.resources.qi - costQi,
          },
          inventory: {
            ...prev.inventory,
            breakthroughPills: prev.inventory.breakthroughPills + 1,
          }
        };
      }
      return prev;
    });
  }, []);

  const promoteDisciple = useCallback((discipleId: string) => {
    setState((prev) => {
      if (prev.inventory.breakthroughPills >= 1) {
        const dIndex = prev.disciples.findIndex(d => d.id === discipleId);
        if (dIndex === -1 || prev.disciples[dIndex].cultivationStage >= 4) return prev;
        
        const newDisciples = [...prev.disciples];
        const d = { ...newDisciples[dIndex] };
        d.cultivationStage += 1;
        d.level = (d.level || 1) + 1;
        d.power = Math.floor(d.power * 2.5); // Major power boost on breakthrough
        newDisciples[dIndex] = d;

        return {
          ...prev,
          inventory: {
            ...prev.inventory,
            breakthroughPills: prev.inventory.breakthroughPills - 1,
          },
          disciples: newDisciples,
        };
      }
      return prev;
    });
  }, []);

  const claimArenaReward = useCallback((stones: number, prestige: number) => {
    setState((prev) => ({
      ...prev,
      resources: {
        ...prev.resources,
        stones: prev.resources.stones + stones,
        prestige: prev.resources.prestige + prestige,
      }
    }));
  }, []);

  const updateTactics = useCallback((team: string[], formation: FormationType) => {
    setState((prev) => ({
      ...prev,
      team,
      formation,
    }));
  }, []);

  const clearSave = useCallback(() => {
    localStorage.removeItem('wuxia_sect_save_v2');
    setState({ ...INITIAL_STATE, lastUpdate: Date.now() });
  }, []);

  const addCheats = useCallback(() => {
    setState((prev) => ({
      ...prev,
      resources: {
        stones: prev.resources.stones + 100000,
        qi: prev.resources.qi + 10000,
        herbs: prev.resources.herbs + 10000,
        ore: prev.resources.ore + 10000,
        prestige: prev.resources.prestige + 500,
      },
      inventory: {
        ...prev.inventory,
        breakthroughPills: prev.inventory.breakthroughPills + 10,
      }
    }));
  }, []);

  return { state, upgradeBuilding, addDisciple, craftPill, promoteDisciple, claimArenaReward, updateTactics, clearSave, addCheats };
}
