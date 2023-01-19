export default class PosenetConfig {
    constructor (
        private mobileNetMultiplier, 
        private poseNetArchitecture, 
        private poseNetOutputStride, 
        private poseNetQuantBytes, 
        private poseNetInputResolution,
        private poseNetDeviceResolution
    ){}

    getMobileNetMultiplier(){
        return this.mobileNetMultiplier
    }

    getPoseNetArchitecture(){
        return this.poseNetArchitecture
    }

    getPoseNetOutputStride(){
        return this.poseNetOutputStride
    }

    getPoseNetQuantBytes(){
        return this.poseNetQuantBytes
    }

    getPoseNetInputResolution(){
        return this.poseNetInputResolution;
    }

    getPoseNetDeviceResolution(){
        return this.poseNetDeviceResolution;
    }
}