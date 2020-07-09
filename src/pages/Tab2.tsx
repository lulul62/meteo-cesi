import React, { useState, useEffect, Fragment } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard, 
  IonAvatar, 
  IonCardTitle, 
  IonList, 
  IonLabel,
  IonItem,
  IonCardContent,
  IonCardHeader
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import firebase from "firebase";
import helpers from "../helpers/helpers";
import moment from 'moment'
import "./Tab2.css";


const firebaseConfig = {
  apiKey: "AIzaSyBCGUH7lP_dbFBT99EnqsLGGBFWn5PIhSk",
  authDomain: "testcesimeteo.firebaseapp.com",
  databaseURL: "https://testcesimeteo.firebaseio.com",
  projectId: "testcesimeteo",
  storageBucket: "testcesimeteo.appspot.com",
  messagingSenderId: "79665149858",
  appId: "1:79665149858:web:ee16bd194edbd21bcc64fb",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const Tab2: React.FC = () => {
  const [citys, setCitys] = useState(null);

  useEffect(() => {
    async function getWeatherFromList() {
      const documents = await db.collection("WeatherList").get();
      let citys = [];
      documents.forEach((doc) => {
        citys.push(doc.data());
      });

      const weathersList = await Promise.all(
        citys.map(async (item) => {
          return {
            ...item,
            weather: await helpers.getWeather(item.city),
          };
        })
      );
      console.log(weathersList, 'list')
      setCitys(weathersList)
    }
    
 getWeatherFromList();
  }, []);

  const formatTemperature = (temp: number) => `${(temp - 273.15).toFixed(0)}°`;

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
            <IonTitle size="large">Liste météo</IonTitle>
          </IonToolbar>
        </IonHeader>
        {citys !== null && <Fragment>
          {citys.map((item) => (
        <IonCard>
            <IonCardContent>
              <IonList>
                  <IonItem>
                    <IonAvatar slot="start">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather.weather[0].icon}.png`}
                      />
                    </IonAvatar>

                    <IonLabel>
                      <h1>{item.city}</h1>
                      <h2>{formatTemperature(item.weather.main.temp)}</h2>
                      <h3>{item.weather.weather[0].main}</h3>
                      <p>{item.weather.weather[0].description}</p>
                    </IonLabel>
                  </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
          ))}
          
          </Fragment>}
      
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
