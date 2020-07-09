import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import firebase from 'firebase'
import helpers from '../helpers/helpers'
import './Tab2.css';


const firebaseConfig = {
  apiKey: "AIzaSyBCGUH7lP_dbFBT99EnqsLGGBFWn5PIhSk",
  authDomain: "testcesimeteo.firebaseapp.com",
  databaseURL: "https://testcesimeteo.firebaseio.com",
  projectId: "testcesimeteo",
  storageBucket: "testcesimeteo.appspot.com",
  messagingSenderId: "79665149858",
  appId: "1:79665149858:web:ee16bd194edbd21bcc64fb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Tab2: React.FC = () => {
  const [citys, setCitys] = useState(null);

  useEffect(() => {
    async function getWeatherFromList() {
      const documents = await db.collection("WeatherList").get()
        let citys = []
        documents.forEach(doc => {
            citys.push(doc.data())
        });

        const weathersList = await Promise.all(citys.map(async item => {
          return {
            ...item,
            weather: await helpers.getWeather(item.city)
          }
        }))
        return weathersList
      }
      getWeatherFromList()
    })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
