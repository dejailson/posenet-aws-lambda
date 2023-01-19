export default class MovenetConfig {
    constructor (
        private movenetType,
        private deviceResolution,
        private enableSmoothing, 
        private modelUrl, 
        private minPoseScore, 
        private multiPoseMaxDimension,
        private enableTracking,
        private trackerType,
        private trackerConfig
        ){}

    getModelType(){
        return this.movenetType;
    }
    getDeviceResolution(){
        return this.deviceResolution;
    }
    getEnableSmoothing(){
        return this.enableSmoothing;
    }
    getModelUrl(){
        return this.modelUrl;
    }
    getMinPoseScore(){
        return this.minPoseScore;
    }
    getMultiPoseMaxDimension(){
        return this.multiPoseMaxDimension;
    }
    getEnableTracking(){
        return this.enableTracking;
    }
    getTrackerType(){
        return this.trackerType;
    }
    getTrackerConfig(){
        return this.trackerConfig;
    }
}