import { useEffect, useState } from "react";

import { WebsocketEvent, Sensor } from "../interfaces";
import { Container } from '../interfaces/websocket';


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

    // Hand shake on open
    socket.onopen = () => {
      try {
        socket.send(JSON.stringify({
          event: 'message',
          data: 1,
        }));

        // State change to connected
        setIsConnected(true);

      } catch (error) {
        console.error('Error connecting to the database: ', error);
        
        // If cannot connect return the socket to disconnected state
        return setSocket(undefined);
      }
    }
    
    // Reaction to any entering message
    socket.onmessage = (e: MessageEvent) => {

      // Get data from the websocket response
      const { data, event } = JSON.parse(e.data) as WebsocketEvent;

      // Filter the event type stored inside the 'event' attr of the ws response
      if (event !== 'message') return;

      // Stores last data readed from ws
      setContainersData(data.containers);
      setSensorsData(data.sensors);
    }

  }, [socket]);

  return {
    containersData,
    sensorsData,
    isConnected,
  }
}
