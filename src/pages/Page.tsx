import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonMenuButton, IonPage, IonProgressBar, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import Menu from '../components/Menu';
import { useState } from 'react';
import Asset from '../Asset';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
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

  const [assetCount, setCount] = useState(0);
  const [assetArray, setAssets] = useState([]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
          
        </IonHeader>
        {/* <IonButton onClick={() => { getAssetCount().then(data => { console.log('c' + data); setCount(data) }) }}>
          Here
        </IonButton> */}
        <IonButton onClick={() => { getAssets().then(data => { console.log('c' + data); setAssets(data) }).catch(e => console.log(e)) }} shape='round'>
          Refresh
        </IonButton>
        <IonList>
          <IonItem>
            <IonInput label="Name"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Parent" type='number'></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          {assetArray.sort((a, b) => (a as Asset).id - (b as Asset).id)
          .map((value, index) => {
            console.log(value);
            let asset = value as Asset;
            return (
              <IonItem key={index}>
                <IonButton  onClick={() => { promoteAsset(value["id"]).then(() => getAssets().then(data => { console.log('c' + data); setAssets(data) })) }}>
                  Promote
                </IonButton>
                <IonTitle>{asset.name}</IonTitle>
                <IonTitle>{'id: ' + asset.id}</IonTitle>
                <IonTitle>{(asset.parentAsset === null) ? '': 'child of: ' + asset.parentAsset}</IonTitle>
                <IonTitle>{'promoted: ' + asset.isPromoted}</IonTitle>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
