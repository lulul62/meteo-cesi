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
  IonCardHeader,
  IonToast,
  IonAlert
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import firebase from "firebase";
import helpers from "../helpers/helpers";
import moment from 'moment'
import "./Tab2.css";
import {DB} from '../env'
 
const Tab2: React.FC = () => {
  const [citys, setCitys] = useState(null);
  const [notification, setNotification] = useState('')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [id, setId] = useState(null)
 
  async function getWeatherFromList() {
    const documents = await DB.collection("WeatherList").get();
    let citys = [];
    documents.forEach((doc) => {
      citys.push({dataWeather: doc.data(), keyId: doc.ref.id});
        console.log(doc, 'les villes')
    });
 
    console.log(citys, 'test ville')
 
    const weathersList = await Promise.all(
      citys.map(async (item) => {
        return {
          ...item,
          weather: await helpers.getWeather(item.dataWeather.city),
        };
      })
    );
    console.log(weathersList, 'list')
    setCitys(weathersList)
  }
 
  useEffect(() => {
    getWeatherFromList();
  }, []);
 
  const formatTemperature = (temp: number) => `${(temp - 273.15).toFixed(0)}°`;
 
  const removeCity = async () => {
    setNotification('')
      DB.collection("WeatherList").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
          getWeatherFromList()
          setNotification('La ville a été supprimé avec succes')
      }).catch(function(error) {
          console.error("Error removing document: ", error);
          getWeatherFromList()
          setNotification('Une erreur est survenue')
      });
        // console.log(item.city)
    }
 
    const deleteData = (item) => {
      setShowDeleteAlert(true)
      setId(item.keyId)
    }


    return (
      <Fragment>
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
          <IonCard onClick={() => deleteData(item)}>
              <IonCardContent>
                <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather.weather[0].icon}.png`}
                          alt=""
                        />
                      </IonAvatar>
   
                      <IonLabel>
                        <h1>{item.dataWeather.city}</h1>
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
    <IonToast
     isOpen={notification.length > 0 ? true : false}
     message={notification}
     position="bottom"
     duration={1000}
   />
   <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          cssClass='my-custom-class'
          header={'Supprimer'}
          message={'Etes vous sûr de vouloir supprimer'}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                setShowDeleteAlert(false)
              }
            },
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
                removeCity()
              }
            }
          ]}
        />
    </Fragment>
  );
};
 
export default Tab2;