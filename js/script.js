console.log('heller')

const racerForm = document.getElementById('racerForm')
const yearInput = document.getElementById('yearInput')
const roundInput = document.getElementById('roundInput')



async function racerApiCall(season, round){
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverstandings.json`,{
        method:"Get",
        // headers:{
        //     'Content-Type': 'application/json'
        // }
    })
    if (res.ok){
        const data = await res.json()
        for (racer of data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)){
            handleRacerData(racer)
        }
    } 

    }

//promise, we have to await
function handleRacerData({position,points,Driver:{givenName,familyName,nationality},Constructors:[{constructorId}]}){
    console.log(position, points,givenName,familyName,nationality,constructorId)
    const td = document.createElement('td')
    td.classList.add('className')
    const tdRacerName = document.createElement('td')
    const tdNationality = document.createElement('td')
    const tdConstructorId = document.createElement('td')
    const tdPoints = document.createElement('td')

    //create row then append that row into const driver table info
    const row=document.createElement('tr')

    td.innerHTML = position
    tdRacerName.innerHTML = givenName + familyName
    tdNationality.innerHTML = nationality
    tdConstructorId.innerHTML = constructorId
    tdPoints.innerHTML = points

    const driverTableInfo = document.getElementById('driverTableMain')
    row.append(td,tdRacerName, tdNationality, tdConstructorId,tdPoints)
    driverTableInfo.append(row)
//replace with row

}

 //this is my event listener to the form when submitting/triggers it
 racerForm.addEventListener('submit', async (event)=>{
    event.preventDefault()
    //const Year = yearInput()
    //const Round = roundInput()
    //await handleRacerData('Year','Round')
    //yearInput() = ''
    //roundInput()= ''
 
    //this is form info with the season & round
    const seasonInput = document.getElementById('seasonInput')
    const roundInput = document.getElementById('roundInput')
    const season = seasonInput.value
    const round = roundInput.value

    //step 2
    await racerApiCall(season,round)
})