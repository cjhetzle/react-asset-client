import { IonButton, IonContent, IonItem, IonList, IonPopover, IonProgressBar, IonTitle } from "@ionic/react"
import Asset from "../Asset";
import { useState } from "react";

const DataTable: React.FC = () => {

    let hostname: String = import.meta.env.VITE_REST_URL;

    async function getAssetCount(): Promise<number> {
        return await fetch(hostname + '/assets')
            .then(response => response.json())
            .then(data => { return data.length }).catch(e => {
                console.error(e);
                return 0;
            })
    }

    async function getAssets(): Promise<any> {
        <IonProgressBar type="indeterminate"></IonProgressBar>
        return await fetch(hostname + '/assets')
            .then(response => response.json()).then(data => { return data });
    }

    async function promoteAsset(id: number) {
        await fetch(hostname + '/assets/' + id, {
            method: "post", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async function deleteAsset(id: number) {
        await fetch(hostname + '/assets/' + id, {
            method: "delete", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    const [assetCount, setCount] = useState(0);
    const [assetArray, setAssets] = useState([]);

    return (
        <IonContent>
            <IonItem>
                <IonButton onClick={() => { getAssets().then(data => { console.log('c' + data); setAssets(data); setCount(data.length); }).catch(e => console.log(e)) }} shape='round'>
                    Refresh
                </IonButton>
                <IonButton shape='round'>
                    Insert
                </IonButton>
                <IonTitle slot="end">{'Count = ' + assetCount}</IonTitle>
            </IonItem>
            <IonList>
                {assetArray.sort((a, b) => (a as Asset).id - (b as Asset).id)
                    .map((value, index) => {
                        console.log(value);
                        let asset = value as Asset;
                        return (
                            <IonItem key={index}>
                                <IonButton onClick={() => { promoteAsset(asset.id).then(() => getAssets().then(data => { console.log('c' + data); setAssets(data) })) }}>
                                    Promote
                                </IonButton>
                                
                                <IonButton id={'click-trigger-'+asset.id}>{asset.name}</IonButton>
                                <IonPopover trigger={'click-trigger-'+asset.id} triggerAction="click">
                                    <IonContent>{'id: ' + asset.id}</IonContent>
                                    <IonContent class="ion-padding">{(asset.parentAsset === null) ? '' : 'child of: ' + asset.parentAsset}</IonContent>
                                </IonPopover>


                                <IonContent>{'promoted: ' + asset.isPromoted}</IonContent>
                                <IonButton onClick={() => deleteAsset(asset.id).then(() => getAssets().then(data => { setAssets(data) }))}>
                                    X
                                </IonButton>
                            </IonItem>

                        )
                    })}
            </IonList>
        </IonContent>)
};

export default DataTable;