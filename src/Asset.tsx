interface Asset {
    id: number;
    name: string;
    isPromoted: boolean;
    parentAsset: number;
}

export default Asset;