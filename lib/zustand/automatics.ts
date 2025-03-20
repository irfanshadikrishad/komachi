import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Automatics {
  /**
   * Current state of autoplay button
   */
  autoplay: boolean
  /**
   * Current state of autoskip button
   */
  autoskip: boolean
  /**
   * Current state of autonext button
   */
  autonext: boolean
  /**
   * Change the state of autoplay
   * @param val - boolean (true or false)
   */
  setAutoPlay: (val: boolean) => void
  /**
   * Change the state of autoskip
   * @param val - boolean (true or false)
   */
  setAutoSkip: (val: boolean) => void
  /**
   * Change the state of autonext
   * @param val - boolean (true or false)
   */
  setAutoNext: (val: boolean) => void
}

export const useAutomatics = create<Automatics>()(
  persist(
    (set) => ({
      autoplay: false,
      autoskip: false,
      autonext: false,

      setAutoPlay: (val: boolean) => set({ autoplay: val }),
      setAutoSkip: (val: boolean) => set({ autoskip: val }),
      setAutoNext: (val: boolean) => set({ autonext: val }),
    }),
    {
      name: "automatics-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
