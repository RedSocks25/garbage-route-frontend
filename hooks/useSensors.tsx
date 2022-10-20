import { useEffect, useState } from "react";

import { WebsocketEvent, Sensor } from "../interfaces";
import { Container } from '../interfaces/websocket';


export const useSensors = (url: string) => {
  
  // Store the websocket instance
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  // Store all the values from websocket separately
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [containers, setContainers] = useState<Container[]>([]);

  useEffect(() => {
    // Create websocket instance pointing to the ws url
    if (!socket) return setSocket(new WebSocket(url));

    // Hand shake on open
    socket.onopen = () => {
      socket.send(JSON.stringify({
        event: 'message',
        data: 1,
      }));
    }
    
    // Reaction to any entering message
    socket.onmessage = (e: MessageEvent) => {

      console.log(e.data);

      const { data, event } = JSON.parse(e.data) as WebsocketEvent;

      // Filter the event type stored inside the 'event' attr of the ws response
      if (event !== 'message') return;

      // Stores last data readed from ws
      setContainers(data.containers);
      setSensors(data.sensors);
    }

  }, [socket]);

  return {
    containers,
    sensors,
  }
}
