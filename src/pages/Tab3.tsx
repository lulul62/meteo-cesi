import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import {DB} from '../env'
import { add } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const addCity = () => {
    DB.collection("WeatherList").doc().set({
      city: "Los Angeles",
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
       <IonButton onClick={() => addCity()}>Ajouter la ville</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
