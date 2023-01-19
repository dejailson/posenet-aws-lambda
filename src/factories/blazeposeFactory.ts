import BlazeposeService from '@utils/services/blazeposeService'

const generateBlazeposeInstance = () => {
    return new BlazeposeService();
}

export {
    generateBlazeposeInstance
}