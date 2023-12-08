import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import Menu from '../components/Menu';
import { useState } from 'react';




const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  async function getAssetCount(): Promise<number> {
    return await fetch('http://localhost:8000/assets')
      .then(response => response.json())
      .then(data => { return data.length }).catch(e => {
        console.error(e);
        return 0;
      })
  }

  async function getAssets(): Promise<any> {
    return await fetch('http://localhost:8000/assets')
      .then(response => response.json()).then(data => { return data });
  }

  async function promoteAsset(id: number) {
    await fetch('http://localhost:8000/assets/' + id, {method:"post", headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
  }

  const [assetCount, setCount] = useState(0);
  const [assetArray, setAssets] = useState([]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        <IonButton onClick={() => { getAssetCount().then(data => { console.log('c' + data); setCount(data) }) }}>
          Here
        </IonButton>
        <IonTitle>{assetCount}</IonTitle>
        <IonButton onClick={() => { getAssets().then(data => { console.log('c' + data); setAssets(data) }).catch(e => console.log(e)) }}>
          Here
        </IonButton>
        {assetArray.map((value, index) => {
          console.log(value);
          return (
            <IonItem key={index}>
              <IonButton onClick={ () => {promoteAsset(value["id"]).then(() => getAssets().then(data => { console.log('c' + data); setAssets(data) }))}}>
                <IonTitle>{value["id"] + value["name"] + ' ' + value["isPromoted"]}</IonTitle>
              </IonButton>
            </IonItem>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default Page;
