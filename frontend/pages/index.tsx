import Image from "next/image"; // Images
import { eth } from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import { useRouter } from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles
import config from "config"; // Airdrop config

// Setup project details
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";
const heading: string = process.env.NEXT_PUBLIC_HEADING ?? "Some heading";
const description: string =
  process.env.NEXT_PUBLIC_DESCRIPTION ?? "Some description";



export default function Home() {
  // Routing
  const { push } = useRouter();
  // Authentication status
  const { address }: { address: string | null } = eth.useContainer();

  return (
    <Layout>
      <div className={styles.home}>
        {/* Project logo */}
        <div>
          <Image unoptimized={true} src="/logo.png" alt="Logo" width={250} height={250} priority />
        </div>

        {/* Project heading */}
        <h1>{heading}</h1>

        {/* Project description */}
        <p>{description}</p>

        {/* Claim button */}
        {(!address) ? (
          // If not authenticated, disabled
          <button disabled>Connect Wallet to Claim Tokens</button>
        ) : config.map((token,i)=>{
          return  <button key={i} onClick={() => push({
            pathname: '/claim/[pid]',
            query: { pid: i, name:token.symbol },
          })}>{token.symbol}</button>
        })}
      </div>
    </Layout>
  );
}
