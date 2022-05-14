import React, { FC } from 'react'
import Modal from './templates/Modal'
import { cliPopupAtom } from "../utils/atoms"
import { useRecoilState } from "recoil"

const CLIModal: FC = () => {
  const [modal, setModal] = useRecoilState<boolean>(cliPopupAtom)

  return (
    <Modal>
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="text-3xl font-bold">Install CLI</div>

        <div className="mb-6 flex flex-col gap-y-3 rounded-md bg-gray-800 py-6 pl-3 pr-10">
          <div className="top-0 left-0 ml-3 flex flex-row items-center gap-x-2">
            <div className="rounded-full bg-red-500 p-2"></div>
            <div className="rounded-full bg-yellow-500 p-2"></div>
            <div className="rounded-full bg-green-500 p-2"></div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="mt-2 ml-3 flex flex-row items-center gap-x-2 font-fira text-xl font-medium">
              <p className="text-blue-300">$</p>

              <p className="text-blue-200">npm i -g nftank</p>
            </div>

            <div className="mt-2 ml-3 flex flex-row items-center gap-x-2 font-fira text-xl font-medium">
              <p className="text-lg text-green-300">⠏</p>

              <p className="text-lg text-green-50">Installing nftank</p>
            </div>

            <div className="mt-2 ml-3 flex flex-row items-center gap-x-2 font-fira text-xl font-medium">
              <p className="text-lg text-green-400">✔</p>

              <p className="text-lg text-green-50">
                nftank installed successfully. try running nftank help
              </p>
            </div>
          </div>
        </div>

        <button className="absolute bottom-0 right-0 m-2 mt-8 rounded-md bg-gray-200 px-3 py-2 transition-all duration-100 hover:bg-gray-300" onClick={()=>setModal(false)}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default CLIModal
