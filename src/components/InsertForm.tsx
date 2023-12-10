import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonInput } from "@ionic/react";
import { useState } from "react";

let hostname: String = import.meta.env.VITE_REST_URL;

class Asset {
    name: string;
    parentId: number;
    isPromoted: boolean;
    constructor(name: string, parentId: number) {
        this.name = name;
        this.isPromoted = false;
        if (parentId > 0)
            this.parentId = parentId;
        else
            this.parentId = -1;
    }
}

async function insertAsset(name: string, id: number) {
    let asset = new Asset(name, id);
    
    let bodyJson = JSON.stringify({
        name: asset.name,
        isPromoted: asset.isPromoted,
        parentAsset: (asset.parentId === -1 ? null : asset.parentId)
    });
    
    console.log(bodyJson);

    await fetch(hostname + '/assets', {
        method: "post", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyJson
    }).catch(e => {console.log(e)})
}

const InsertForm: React.FC = () => {

    const [assetName, setName] = useState('')
    const [parentId, setParentId] = useState(-1)

    const updateName = (ev: Event) => {
        const value = (ev.target as HTMLIonInputElement).value as string;

        setName(value);
    }

    const updateParentId = (ev: Event) => {
        const value = (ev.target as HTMLIonInputElement).value as number;

        setParentId(value);
    }

    return (
        <>
            <IonInput type='text' onIonInput={updateName} label="Name: "></IonInput>
            <IonInput type="number" onIonInput={updateParentId} label="ParentID: "></IonInput>
            <IonButton onClick={() => insertAsset(assetName, parentId)}>Confirm</IonButton>
        </>
    )
}

export default InsertForm;