import React, { useState, FC } from 'react'
import { useRecoilState } from 'recoil'
import { requestNFTPopupAtom } from '../utils/atoms'
import Modal from './templates/Modal'
import Loader from 'react-spinners/HashLoader'
import toast from 'react-hot-toast'
import { getBase64FromUrl, getBase64 } from '../utils/base64'
import axiosInstance from '../utils/axios'

interface Props {
  handleClose: () => void
}

export default function RequestModal() {
  const [type, setType] = useState<string>('erc721')
  const [modal, setModal] = useRecoilState<boolean>(requestNFTPopupAtom)
  const [address, setAddress] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File>()
  const [amount, setAmount] = useState<number>(1)
  const [network, setNetwork] = useState<string>('mumbai')
  const [loading, setLoading] = useState<boolean>(false)

  const closeModal = () => {
    setModal(false)
  }

  const sendRequest = async () => {
    setLoading(true)
    try {
      // check data
      if (!address) {
        toast.error('Please enter wallet address!')
        return setLoading(false)
      }
      // construct ipfsUrl
      let imgUrl: string | null = null
      // check image and assign ipfsUrl
      if (image) {
        const imageBase64: string = (await getBase64(image)) as string
        console.log(imageBase64)

        const base64Final = imageBase64.split(',')

        const ipfsRequest = await axiosInstance.post('/image/upload', {
          image: base64Final[1],
        })
        imgUrl = ipfsRequest.data.url
      }
      // Create request
      const response = await axiosInstance.post(`/${type}/mint`, {
        address,
        network,
        name,
        description,
        image: imgUrl,
        amount,
      })
      console.log(response.data)
      setLoading(false)
      toast.success(
        () => (
          <div>
            NFT minted successfully!
            <br />
            <a
              href={response.data.openseaLink}
              target="_blank"
              className="text-blue-500"
            >
              View on OpenSea
            </a>
          </div>
        ),
        {
          duration: 15000,
        }
      )
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again.')
      setLoading(false)
    }
  }

  return (
    <Modal>
      <div className="flex w-full flex-col items-center">
        <div className="text-3xl font-bold">Request NFT</div>
        <div className="mt-5 mb-3 flex text-lg">
          <div className="mx-3 flex items-center">
            <input
              type="radio"
              checked={type === 'erc721'}
              onChange={(e) => e.target.checked && setType('erc721')}
            />
            <span className="ml-3">ERC-721</span>
          </div>
          <div className="mx-3 flex items-center">
            <input
              type="radio"
              checked={type === 'erc1155'}
              onChange={(e) => e.target.checked && setType('erc1155')}
            />
            <span className="ml-3">ERC-1155</span>
          </div>
        </div>
        {/* Form starts */}
        <input
          type="text"
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Name of the NFT (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none  file:mr-4 file:rounded-full file:border-0
      file:bg-violet-50 file:py-2
      file:px-4 file:text-sm
      file:font-semibold file:text-violet-700
      hover:file:bg-violet-100"
          placeholder="Name of the NFT (Optional)"
          accept="image/*"
          onChange={(e) => setImage(e.target.files![0])}
        />
        {type === 'erc1155' && (
          <input
            type="number"
            className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        )}
        <select
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          onChange={(e) => setNetwork(e.target.value)}
          value={network}
        >
          <option value="mumbai">Polygon Mumbai</option>
          <option value="rinkeby">
            Rinkeby (Deprecated, will be removed soon)
          </option>
        </select>

        <div className="my-5 flex flex-col md:flex-row">
          <button
            onClick={sendRequest}
            disabled={loading}
            className={`mx-3 w-52 rounded-md ${
              loading ? 'bg-blue-800' : 'bg-blue-700'
            } my-2 py-3 text-xl text-white transition-all hover:bg-blue-800`}
          >
            {loading ? <Loader size={30} color="white" /> : 'Request NFT'}
          </button>
          <button
            onClick={closeModal}
            className="mx-3 my-2 w-52 rounded-md bg-red-500 py-3 text-xl text-white transition-all hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
