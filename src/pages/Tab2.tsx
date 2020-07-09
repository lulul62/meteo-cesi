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
import {DB} from '../env'

const Tab2: React.FC = () => {
  const [citys, setCitys] = useState(null);

  useEffect(() => {
    async function getWeatherFromList() {
      const documents = await DB.collection("WeatherList").get();
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
