export const LOOP_CARD_WIDTH = 190;
export const LOOP_CARD_HEIGHT = 56;

export const LOOP_CORE_WIDTH = 260;
export const LOOP_CORE_HEIGHT = 104;

// Center of the canvas coordinate system (1000 x 520)
export const LOOP_CENTER = { x: 500, y: 260 };

export const LOOP_POSITIONS = {
  center: {
    x: LOOP_CENTER.x - LOOP_CORE_WIDTH / 2, // 370
    y: LOOP_CENTER.y - LOOP_CORE_HEIGHT / 2, // 208
  },
  // Stage 1 (Top Center: 1. Pesquisa)
  stage1: {
    x: LOOP_CENTER.x - LOOP_CARD_WIDTH / 2, // 405
    y: 30,
  },
  // Stage 2 (Top Right: 2. Decidir)
  stage2: {
    x: 760,
    y: 125,
  },
  // Stage 3 (Bottom Right: 3. Verificação de Risco)
  stage3: {
    x: 760,
    y: 335,
  },
  // Stage 4 (Bottom Center: 4. Executar)
  stage4: {
    x: LOOP_CENTER.x - LOOP_CARD_WIDTH / 2, // 405
    y: 430,
  },
  // Stage 5 (Bottom Left: 5. Liquidar)
  stage5: {
    x: 50,
    y: 335,
  },
  // Stage 6 (Top Left: 6. Monitorar)
  stage6: {
    x: 50,
    y: 125,
  },
};

