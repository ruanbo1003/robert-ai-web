'use client';


import { useEffect, useState } from "react"
import mqtt from "mqtt";


export default function MattPage() {
    const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);
    const username = "emqx_test";
    const password = "emqx_test";

    const [client, setClient] = useState<mqtt.MqttClient|null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const mqttConnect = () => {
        const newClient = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
            clientId,
            username,
            password,
        });
        setClient(newClient)
    }
    const mqttDisconnect = () => {
        if(!client) {
            return
        }
        client.end(() => {
            console.log('MQTT disconnected.')
            setIsConnected(false);
        })
    }

    useEffect(() => {
        mqttConnect();
        return () => {
            mqttDisconnect();
        }
    }, [])

    useEffect(() => {
        if(!client) {
            return
        }

        client.on('connect', () => {
            setIsConnected(true);
            console.log('MQTT Connected');
        });

        client.on('error', (err) => {
            console.error('MQTT Connection error: ', err);
            client.end();
        });

        client.on('reconnect', () => {
            setIsConnected(true);
        });

        client.on('message', (_topic, message) => {
            const payloadMessage = { topic: _topic, message: message.toString() };
            console.log("new message:", payloadMessage);
        });

    }, [client])

    const mqttPublish = (payload) => {
        const topic = "robert/iot"
        const qos = 1

        if(!client) {
            return
        }

        client.publish(topic, payload, { qos }, (error) => {
            if (error) {
                console.log("Publish error: ", error);
            } else {
                console.log("Publish success")
            }
        });
    };

    const mqttSubscribe = () => {
        const topic = "robert/iot"
        const qos = 1

        if(!client) {
            return
        }

        client.subscribe(topic, { qos }, (error) => {
            if(error) {
                console.log("subscribe failed:", error)
                return
            } else {
                console.log("subscribe success")
            }
        })
    }

    const mqttUnSub = () => {
        const topic = "robert/iot"
        const qos = 1

        if(!client) {
            return
        }

        client.unsubscribe(topic, { qos }, (error) => {
            if(error) {
                console.log('unsubscribe error:', error)
                return
            } else {
                console.log('unsubscribe success')
            }
        })
    }

    // const mqttConnect = (brokerUrl) => {
    //     setConnectStatus('Connecting');
    //     const client = mqtt.connect(brokerUrl);
    //     setClient(client);
    // };

    // mqttConnect("http://www.ruanbo.fun:3000/")

    const handlerSpeedUpBtn = (event) => {
        event.preventDefault();

        console.log('up')

        mqttPublish("Hello World")
    }

    return (
        <div id="mqtt" className="flex flex-col w-full h-full border-2">
            <div id="mqtt_header" className="flex h-24 border-2 text-center items-center">
                <p className="m-auto text-4xl text-blue-500">IOT  -  MQTT broker  -  Server</p>
            </div>

            <div id="intput_output" className="flex flex-row flex-grow justify-items-center">
                <div id="input" className="w-1/2 border-2">
                    <label className="ml-4 mt-4 text-blue-400 text-2xl">IOT</label>
                    <br/>
                    <label className="ml-4 mt-4 text-sm">pub: mqtt/iot/up, sub: mqtt/iot/down</label>

                    <hr className="bg-slate-100 border rounded-full mx-4 my-4"/>

                    <div className="flex flex-row justify-between ml-4">
                        <div>
                            <label className="text-lg">speed:</label>
                            <input type="text" className="w-20 border-2 ml-2 rounded-sm"/>
                        </div>
                        <button onClick={handlerSpeedUpBtn} className="mr-4 w-12 bg-blue-400 rounded-lg">
                            up
                        </button>
                    </div>

                    <hr className="bg-slate-100 border rounded-full mx-4 my-4"/>
                </div>
                <div id="ouput" className="w-1/2 border-2">
                <label className="ml-4 mt-4 text-blue-400 text-2xl">Server</label>
                    <br/>
                    <label className="ml-4 mt-4 text-sm">pub: mqtt/iot/down, sub: mqtt/iot/up</label>
                </div>
            </div>
        </div>
    )
}
