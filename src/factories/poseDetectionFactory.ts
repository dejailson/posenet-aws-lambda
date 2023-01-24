import firebaseFactory from '@factories/authFireBaseFactory'
import posenetFactory from '@factories/posenetFactory'

import PosenetService from '@services/posenetService'

const authFireBaseService = firebaseFactory.generateInstanceAuthFireBase()
const posenetProcess = posenetFactory.generatePosenetInstance()

const generateInstance = () => {
    return new PosenetService(authFireBaseService,posenetProcess)
}

export default{
    generateInstance
}