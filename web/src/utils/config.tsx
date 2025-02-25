import { http } from "wagmi";
import { mainnet, polygon, scrollSepolia } from "wagmi/chains";
import { createConfig } from "wagmi";
import { citreaTestnet } from "@/components/CitreaTestnet";
import { ethereumClassic } from "@/components/EthereumClassic";
import { milkomeda } from "@/components/Milkomeda";

const chains = [
  scrollSepolia,
  polygon,
  mainnet,
  citreaTestnet,
  ethereumClassic,
  milkomeda,
] as const;

// Create wagmi config with public provider
export const config = createConfig({
  chains,
  transports: {
    // Map each chain to use the public HTTP provider
    [scrollSepolia.id]: http(),
    [polygon.id]: http(),
    [mainnet.id]: http(),
    [citreaTestnet.id]: http(),
    [ethereumClassic.id]: http(),
    [milkomeda.id]: http(),
  },
});
