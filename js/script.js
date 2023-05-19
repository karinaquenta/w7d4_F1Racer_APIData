console.log('heller')

const racerForm = document.getElementById('racerForm')
const yearInput = document.getElementById('yearInput')
const roundInput = document.getElementById('roundInput')



async function racerApiCall(season, round){
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverstandings.json`,{
        method:"Get",
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if (res.ok){
        const data = await res.json()
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.url
    } 
    const driverTableInfo = document.getElementById('driverTableMain')
    driverTableInfo.innerHTML = ''
    }

// const aside=document.querySelector('.aside')
// //aside.style.display='flex'
// aside.style.columnGap='10px'
// aside.style.flexWrap='wrap'

async function handleRacerData({ season, round, DriverStandings:{Driver,Constructors} }){
    const div = document.createElement('div')
    div.classList.add('className')
    const racerName = document.createElement('racerName')
    const nationality = document.createElement('nationality')
    const sponsor = document.createElement('sponsor')
    const points = document.createElement('points')

    const url = await racerApiCall(season,round)

    div.innerHTML = Constructors['position']
    racerName.innerHTML = Driver['givenName']
    nationality.innerHTML = Driver['nationality']
    sponsor.innerHTML = Driver['constructorId']
    points.innerHTML = Constructors['position']

    div.append(racerName,nationality, sponsor, points)

    const aside = document.getElementById('racerInfo')
    aside.appendChild(div)
    //im getting the form elements from DOM
    const form = document.getElementById('racerForm')
    
    //this is my event listener to the form when submitting
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

    racerApiCall(season,round)
})
}