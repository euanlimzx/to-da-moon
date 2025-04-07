export type HudConfig = {
    dataName: string; 
    dataCol: number; 
    min: number; 
    max: number;
    value: number; 
    secondDisplayType: keyof typeof displayTypes;
    units: string;

}

export enum displayTypes{
    gauge = "gauge", 
    linear = "linear", 
    graph = "graph", 
}


export interface OverviewConfig {
    name: string
    currStage: number
    numStages: number
    isActive: boolean
    isDelayed: boolean
    estimatedLaunchTime: number
}