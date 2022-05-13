import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { requestNFTPopupAtom } from '../utils/atoms'
import Modal from './templates/Modal'

export default function RequestModal() {
  const [type, setType] = useState<string>('erc721')
  const [modal, setModal] = useRecoilState<boolean>(requestNFTPopupAtom)

  const closeModal = () => {
    setModal(false)
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
        />
        <input
          type="text"
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Name of the NFT (Optional)"
        />
        <textarea
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Description (Optional)"
        />
        <input
          type="file"
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Name of the NFT (Optional)"
        />
        <select
          className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
          placeholder="Description (Optional)"
        >
          <option>Mumbai</option>
          <option>Rinkeby</option>
        </select>
        {type === 'erc1155' && (
          <input
            type="number"
            className="my-3 w-full max-w-3xl rounded-md border border-gray-400 px-5 py-3 text-lg outline-none"
            placeholder="Amount"
          />
        )}
        <div className="my-5 flex">
          <button className="mx-3 w-52 rounded-md bg-blue-700 py-3 text-xl text-white transition-all hover:bg-blue-800">
            Request NFT
          </button>
          <button
            onClick={closeModal}
            className="mx-3 w-52 rounded-md bg-red-500 py-3 text-xl text-white transition-all hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
