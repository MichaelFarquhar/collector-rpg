export interface PlayerStateCurrency {
  coins: number;
  souls: number;
}

export interface PlayerStateEquippment {
  main_hand: string;
  off_hand: string;
  head: string;
  body: string;
  legs: string;
  feet: string;
  necklace: string;
  bracelet: string;
  earring: string;
  ring_1: string;
  ring_2: string;
}

export interface PlayerStateToolbelt {
  scavenging_tool: string;
  woodcutting_tool: string;
  occultism_tool: string;
  thieving_tool: string;
}

export type PlayerState = {
  name: string;
  level: number;
  currency: PlayerStateCurrency;
  equippment: Record<string, unknown>;
  toolbelt: PlayerStateToolbelt;
};
