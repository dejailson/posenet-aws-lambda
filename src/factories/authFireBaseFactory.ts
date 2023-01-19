import AuthFireBaseService from '@utils/services/authFireBaseService'
import FireBaseRepository from '@repositories/fireBaseRepository'

const generateInstanceAuthFireBase = () => {
    const fireBaseRepository = new FireBaseRepository();
    const authFireBaseService = new AuthFireBaseService({
        fireBaseRepository
    })

    return authFireBaseService;
}

export {
    generateInstanceAuthFireBase
}