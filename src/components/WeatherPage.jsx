import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast"
import { useEffect, useState } from "react";
import "./WeatherPage.css";

function WeatherPage() {

    //states
    const[city,setCity]=useState("Hyderabad");
    const[currentWeather,setCurrentWeather]=useState(null)
    const[foreCast,setForeCast]=useState(null)
    const[err,setErr]=useState(null)
    const[loading,setLoading]=useState(false)

    //api keys and api integration
    const apiKey='8d4e9d2545b702e7359bd96e18f7c28d';


    //fetching via live location
    const getLiveLocationWeather = () => {

    if(!navigator.geolocation){
        fetchData()
        return
    }

    navigator.geolocation.getCurrentPosition(
        async(position)=>{

            const lat = position.coords.latitude
            const lon = position.coords.longitude

            try{

            setLoading(true)
            setErr(null)

            const currRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            )

            const foreRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            )

            const currData = await currRes.json()
            const foreData = await foreRes.json()

            setCity(currData.name)
            setCurrentWeather(currData)
            setForeCast(foreData)

            }catch(err){
                console.log(err)
                fetchData()
            }
            finally{
                setLoading(false)
            }

        },
        ()=>{
            console.log("Location access denied")
            fetchData() // fallback to default city
        }
    )
}

    //search handler
    const handleSearch=(newCity)=>{
        if(newCity!==null)
        {
            setCity(newCity)
            setCurrentWeather(null)
            setForeCast(null)
        }

    }

    //fetch data using city
    const fetchData=async()=>{
        try{

        //loading and error handling
        setLoading(true)
        setErr(null)

        //current weather fetching
         const currRes=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

        //forecast weather fetching
        const foreRes=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)

        //error check
        if (!currRes.ok || !foreRes.ok) {
             throw new Error(`Unable to fetch data from city ${city}`);
         }

        //extracting data
        const currData=await currRes.json()
        const foreData=await foreRes.json()

        //setting state
        setCurrentWeather(currData)
        setForeCast(foreData)

        //debugging
        console.log(currData)
        console.log(foreData)

        }catch(err)
        {
            //error handling
            setErr(err.message)
            setCurrentWeather(null)
            setForeCast(null)
        }
        finally {

        //loading false
        setLoading(false)

    }

    }

    //useEffect for live location on first load
    useEffect(()=>{
        getLiveLocationWeather()
    },[])

    //useEffect for city search updates
    useEffect(()=>{
        fetchData()
    },[city])

    //loading state ui
    if(loading) return <h2 className="status">Loading weather...</h2>

    //error state ui
    if(err) return <h2 className="status">{err}</h2>

  return (

    <div className="weather-page">

        <div className="container">

        {/* search bar */}
        <SearchBar onSearch={handleSearch}/>

        {/* current weather */}
        {
            currentWeather && 
            <CurrentWeather data={currentWeather} city={city} />
        }

        {/* forecast title */}
        <h2 className="forecast-title">Hourly Forecast</h2>

        {/* forecast cards */}
       <div className="d-flex gap-3 overflow-x-auto forecast-container">

      {
       foreCast?.list?.map((it,index)=>(
           <Forecast key={index} data={it}/>
        ))
      }

       </div>

       </div>
        
    </div>
  )
}

export default WeatherPage;