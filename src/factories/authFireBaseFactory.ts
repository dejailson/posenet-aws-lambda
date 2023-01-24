import AuthFireBaseService from '@utils/services/authFireBaseService'
import FireBaseRepository from '@repositories/fireBaseRepository'

const generateInstanceAuthFireBase = (): AuthFireBaseService => {
    const fireBaseRepository = new FireBaseRepository();
    const authFireBaseService = new AuthFireBaseService({
        fireBaseRepository
    })

    return authFireBaseService;
}

export default {
    generateInstanceAuthFireBase
}