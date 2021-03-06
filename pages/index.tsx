import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import CLIModal from '../components/CLIModal'
import RequestModal from '../components/RequestModal'
import { requestNFTPopupAtom, cliPopupAtom } from '../utils/atoms'

const Home: NextPage = () => {
  const [requestPopup, setRequestPopup] =
    useRecoilState<boolean>(requestNFTPopupAtom)
  const [cliPopup, setCliPopup] = useRecoilState<boolean>(cliPopupAtom)

  const showRequestPopup = () => {
    setRequestPopup(true)
  }

  const showCliPopup = () => {
    setCliPopup(true)
  }

  return (
    <div className="relative">
      <Head>
        <title>NFTank - Faucet for NFTs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {requestPopup && <RequestModal />}
      {cliPopup && <CLIModal />}
      <div
        className="flex min-h-screen w-screen flex-col items-center justify-center p-5"
        style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover' }}
      >
        <h1 className="max-w-4xl text-center text-5xl font-black leading-snug lg:text-7xl lg:leading-[5rem]">
          Need <span className="text-blue-700">NFTs</span> for testing? You're
          at the right place!
        </h1>
        <div className="mt-7 max-w-3xl text-center text-2xl leading-snug text-gray-700">
          Quickly gain access to NFTs. Need more customization? You can upload
          your own details for the NFT!
        </div>
        <div className="mt-7 flex flex-col md:flex-row">
          <button
            onClick={showRequestPopup}
            className="mx-3 my-2 w-52 rounded-md bg-blue-700 py-3 text-xl text-white transition-all hover:bg-blue-800"
          >
            Request NFT
          </button>
          <button
            onClick={showCliPopup}
            className="mx-3 my-2 w-52 rounded-md bg-gray-900 py-3 text-xl text-white transition-all hover:bg-black"
          >
            Install CLI
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
