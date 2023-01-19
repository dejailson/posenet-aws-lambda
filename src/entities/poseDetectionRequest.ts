import { randomUUID } from "crypto"
import PosenetConfig from './posenetConfig'

export default class PoseDetectionRequest {
    private id: string
    private posenetConfig: PosenetConfig
    constructor (
        protected base64string, 
        protected mobileNetMultiplier, 
        protected poseNetArchitecture, 
        protected poseNetOutputStride, 
        protected poseNetQuantBytes, 
        protected poseNetInputResolution,
        protected poseNetDeviceResolution
    ){
        this.id = randomUUID()
        this.base64string = base64string
        this.posenetConfig = new PosenetConfig(
            mobileNetMultiplier,
            poseNetArchitecture,
            poseNetOutputStride,
            poseNetQuantBytes, 
            poseNetInputResolution,
            poseNetDeviceResolution
        )
    }

    public getId(): string {
        return this.id
    }
    public getPosenetConfig(): PosenetConfig {
        return this.posenetConfig
    }
}