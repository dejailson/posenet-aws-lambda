import PosenetProcessService from '@utils/services/posenetProcessService';


const generatePosenetInstance = () => {
    return new PosenetProcessService()
}

export default{
    generatePosenetInstance
}