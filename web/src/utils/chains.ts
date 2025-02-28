import { citreaTestnet } from "@/utils/chains/CitreaTestnet";
import { ethereumClassic } from "@/utils/chains/EthereumClassic";
import { milkomeda } from "@/utils/chains/Milkomeda";
import { mainnet, polygon, scrollSepolia } from "wagmi/chains";

// Combine all chains into a single export
export const chains = [
  scrollSepolia,
  polygon,
  mainnet,
  citreaTestnet,
  ethereumClassic,
  milkomeda,
] as const;
