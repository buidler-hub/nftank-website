import { atom } from 'recoil'

const requestNFTPopupAtom = atom({
  key: 'requestNFTAtom',
  default: false,
})

const cliPopupAtom = atom({
  key: 'cliPopupAtom',
  default: false,
})

export { requestNFTPopupAtom, cliPopupAtom }
