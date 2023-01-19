export default class BlazeposeConfig {
    constructor (
        private runtime,
        private enableSmoothing,
        private enableSegmentation,
        private smoothSegmentation,
        private blazeposeType,
        private solutionPath
        ){}


    getRuntime(){
        return this.runtime;
    }
    getEnableSmoothing(){
        return this.enableSmoothing;
    }
    getEnableSegmentation(){
        return this.enableSegmentation;
    }
    getSmoothSegmentation(){
        return this.smoothSegmentation;
    }
    getBlazeposeType(){
        return this.blazeposeType;
    }
    getSolutionPath(){
        return this.solutionPath;
    }
}