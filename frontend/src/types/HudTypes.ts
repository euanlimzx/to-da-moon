export type HudConfig = {
    dataName: string; 
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