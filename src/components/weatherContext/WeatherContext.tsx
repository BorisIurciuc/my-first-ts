import React, { createContext, ReactNode, useState } from 'react'

interface IWeatherData {
    weather: {
        id: number;
        main: string;
        icon: string;
    }[];
    main: {
        temp: number;
    };
    name: string;
}


interface IWeatherContext {
    cityWeather: IWeatherData,
    setCityWeather: React.Dispatch<React.SetStateAction<IWeatherData>>
}

interface IWeatherProviderProps {
    children: ReactNode
}

const initialContext: IWeatherContext = {
    cityWeather: 
    
    {
        weather: [
            {
                id: 0,
                main: '',
                icon: ''
            }
        ],
        main: {
            temp: 0,
        },
        name: ''
    },
    setCityWeather: () => {}
}

export const WeatherContext = createContext<IWeatherContext>(initialContext)


export function WeatherProvider({children}: IWeatherProviderProps) {

const [cityWeather, setCityWeather] = useState<IWeatherData>({
    weather: [
    {
        id: 0,
        main: '',
        icon: '',
    },
    ],
    main: {
        temp: 0,
    },
    name: '',
});

    return (
        <WeatherContext.Provider value={{cityWeather, setCityWeather}}>
            {children}
        </WeatherContext.Provider>
    )
}
