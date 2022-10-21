import { useEffect, useState } from "react";

import { WebsocketEvent, Sensor } from "../interfaces";
import { Container } from '../interfaces/websocket';
import { PING_PONG_INTERVAL } from "../utils";


export const useSensors = (url: string) => {
  
  // Store the websocket instance
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  // Store all the values from websocket separately
  const [sensorsData, setSensorsData] = useState<Sensor[]>([]);
  const [containersData, setContainersData] = useState<Container[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);


  useEffect(() => {

    // Create websocket instance pointing to the ws url
    if (!socket) return setSocket(new WebSocket(url));

    // Try to interact in any way with the websocket
    try {
      
      // Hand shake to stablish connection
      socket.onopen = () => {
        socket.send(JSON.stringify({
          event: 'message',
          data: 1,
        }));

        return setIsConnected(true);
      }

      // Listen to any message events
      socket.onmessage = (e: MessageEvent) => {

        // console.log(e);

        // Get data from the websocket response
        const { data, event } = JSON.parse(e.data) as WebsocketEvent;
  
        // Filter the event type stored inside the 'event' attr of the ws response
        if (event !== 'message') return;
  
        // Stores last data readed from ws
        setContainersData(data.containers);
        setSensorsData(data.sensors);
      }
    } catch (err) {
      console.error('Error: ', err);

      // On error, delete the socket instance and stablish a non-connection state to retry to connect
      setIsConnected(false);
      return setSocket(undefined);
    }

  }, [socket, isConnected]);


  // Ping Pong logic to stay connected to the Websocket
  useEffect(() => {
    // console.log('Entrando a logica ping pong');
    
    if (!isConnected) return;

    // console.log('Tenemos websocket intanciado');

    const interval = setInterval(() => {
      // console.log('sending pong message');
      
      socket!.send(JSON.stringify({
        event: 'ping',
        data: 'true',
      }));
    }, PING_PONG_INTERVAL);

    return () => clearInterval(interval);
  }, [isConnected]);


  return {
    containersData,
    sensorsData,
    isConnected,
  }
}
