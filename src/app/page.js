"use client"
import Image from 'next/image'
import Rock from '../../public/picture/rock.png'
import Scissors from '../../public/picture/scissors.png'
import Paper from '../../public/picture/paper.png'
import { useState,useEffect } from 'react'
import Winner from '../../public/picture/winner.jpg'
import Loser from '../../public/picture/loser.jpg'

export default function Home() {
  const [userName, setUserName]=useState({
    myname : ''
  })
  const [gameStart, setGameStart] = useState(false)
  const [rockCard, setRockCard] = useState(false)
  const [scissorsCard, setScissorsCard] = useState(false)
  const [paperCard, setPaperCard]= useState(false)
  const [comRockCard, setComRockCard] = useState(false)
  const [comScissorsCard, setComScissorsCard] = useState(false)
  const [comPaperCard, setComPaperCard]= useState(false)
  const [yourTurn, setYourTurn]= useState(false)
  const [disableButton, setDisableButton]=useState(false)
  const [cardResult, setCardResult] = useState('')
  const [comCardResult, setComCardResult] = useState('')
  const countDown = 2
  const [times, setTimes]=useState(countDown)
  const [comCount, setComCount]=useState(0)
  const [userCount, setUserCount]=useState(0)
  const [drawCount, setDrawCount] = useState(0)
  const [round, setRound] = useState(1)
  const [nextDisable, setNextDisable] = useState(false)
  const [result, setResult]= useState(false)
  const [lastChance, setLastChance] = useState(false)
  const [userWin, setUserWin] = useState(false)

  const handleRestart = ()=>{
    setGameStart(false)
    setRockCard(false)
    setScissorsCard(false)
    setPaperCard(false)
    setComRockCard(false)
    setComPaperCard(false)
    setYourTurn(false)
    setDisableButton(false)
    setCardResult('')
    setComCardResult('')
    setTimes(countDown)
    setComCount(0)
    setUserCount(0)
    setDrawCount(0)
    setRound(1)
    setNextDisable(false)
    setResult(false)
    setLastChance(false)
    setUserWin(false)
  }

  useEffect(()=>{
    if(userCount > comCount){
      setUserWin(true)
    }else{
      setUserWin(false)
    }
  },[comCount,userCount])


  useEffect(()=>{
      const timing = setTimeout(()=>{
        setTimes(times - 1)
      },2000)
      if(times === 0){
        const comGame = ['Rock','Scissors','Paper']
      const comGameRound = Math.floor(Math.random()*comGame.length)
      const comRandomCard = comGame[comGameRound]
      setComCardResult(comRandomCard)
      if(comRandomCard === 'Rock'){
        setComRockCard(true)
        setComScissorsCard(false)
        setComPaperCard(false)
      }else if( comRandomCard === 'Scissors'){
        setComRockCard(false)
        setComScissorsCard(true)
        setComPaperCard(false)
      }else if(comRandomCard === 'Paper'){
        setComRockCard(false)
        setComScissorsCard(false)
        setComPaperCard(true)
      }
      }
      return()=> {
        clearTimeout(timing)
      }
  },[times])






  const handleChange = (e)=>{
    const {name , value} = e.target

    setUserName((previouName)=>{
      return {
        ...previouName,
        [name]:value
      }
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    setGameStart(true)
    setTimes(countDown)
  }



  const yourTurnButton = (e) => {
    e.preventDefault();
    const game = ['Rock', 'Scissors', 'Paper'];
    const gameRound = Math.floor(Math.random() * game.length);
    const randomCard = game[gameRound];
    setCardResult(randomCard);
  
    if (randomCard === 'Rock') {
      setRockCard(true);
      setScissorsCard(false);
      setPaperCard(false);
    } else if (randomCard === 'Scissors') {
      setRockCard(false);
      setScissorsCard(true);
      setPaperCard(false);
    } else if (randomCard === 'Paper') {
      setRockCard(false);
      setScissorsCard(false);
      setPaperCard(true);
    }
    setYourTurn(true);
    setDisableButton(true)
    setNextDisable(true)

  };

  const handleNext = ()=>{
    setRound(round + 1)
    setTimes(countDown)
    setYourTurn(false);
    setDisableButton(false)
    setCardResult('')
    setComCardResult('')
    setRockCard(false)
    setScissorsCard(false)
    setPaperCard(false)
    setComRockCard(false)
    setComScissorsCard(false)
    setComPaperCard(false)
    setNextDisable(false)

  }

  useEffect(()=>{
    if(round > 7 && comCount === userCount){
      setLastChance(true)
    }else if(round > 7 && comCount !== userCount){
      setResult(true) 
    }
  },[round,comCount,userCount])

  useEffect(()=>{
    if (comRockCard && rockCard) {
      setDrawCount((prevDrawCount) => prevDrawCount + 1);
    } else if (comRockCard && scissorsCard) {
      setComCount((prevComCount) => prevComCount + 1);
    } else if (comRockCard && paperCard) {
      setUserCount((prevUserCount) => prevUserCount + 1);
    } else if (comScissorsCard && paperCard) {
      setComCount((prevComCount) => prevComCount + 1);
    } else if (comScissorsCard && scissorsCard) {
      setDrawCount((prevDrawCount) => prevDrawCount + 1);
    } else if (comScissorsCard && rockCard) {
      setUserCount((prevUserCount) => prevUserCount + 1);
    } else if (comPaperCard && rockCard) {
      setComCount((prevComCount) => prevComCount + 1);
    } else if (comPaperCard && paperCard) {
      setDrawCount((prevDrawCount) => prevDrawCount + 1);
    } else if (comPaperCard && scissorsCard) {
      setUserCount((prevUserCount) => prevUserCount + 1);
    }
  },[comRockCard,comPaperCard,comScissorsCard,rockCard,scissorsCard,paperCard])
  
  
  return (
    <div className='min-h-screen flex flex-row justify-center'>
      <div className='md:w-3/12 h-auto p-5 bg-[#ebddb9] w-full text-center m-auto border-2 border-black rounded-md'>
      {gameStart? <>
        <div className='flex justify-between text-black font-bold mb-3 md:text-[0.8rem]'>
          <div className=''>
            <h3>Computer</h3>
            <h3>{comCount}</h3>
          </div>
          <div>
            <h3>Draw Game</h3>
            <h3>{drawCount}</h3>
          </div>
          <div>
            <h3>{userName.myname}</h3>
            <h3>{userCount}</h3>
          </div>
        </div>
        {result ? <>
        
          <div className='w-full flex justify-center gap-5 h-auto m-auto bg-white p-5  rounded-md'>
          
          {userWin ? <>
            <div className='w-full border-2 border-[#ebddb9] rounded-md p-3'>
              <Image
              src={Winner}
              className="w-[7rem] h-[7rem] text-center m-auto rounded-full border-2 border-[#ebddb9]"
              /> <br/>
              <h3 className='text-sm '>Congratulation {userName.myname}, You Win</h3>
              <button onClick={handleRestart} className='w-full h-10 mt-5 border-2 bg-[#b0926b] border-black text-white rounded-md'>Restart</button>
            </div>
          
          </> :<>
            <div className='w-full border-2 border-[#ebddb9] rounded-md p-3'>
              <Image
              src={Loser}
              className="w-[7rem] h-[7rem] text-center m-auto rounded-full border-2 border-[#ebddb9]"
              /> <br/>
              <h3 className='text-sm '>Sorry {userName.myname}, You Lose</h3>
              <button onClick={handleRestart} className='w-full h-10 mt-5 border-2 bg-[#b0926b] border-black text-white rounded-md'>Restart</button>
            </div>
          
          </>}

          </div>

        </> : <>
        <h3 className='mb-3'>{round > 6 ? 'Final Round' : `Round ${round}`}</h3>
        <div className='w-full flex justify-center gap-5 h-auto m-auto bg-white p-5  rounded-md'>
          
          <div className='w-1/2 border-2 border-[#ebddb9] rounded-md p-3'>
          {times > 0 ? <>
          <h3 className='text-[5rem]'>{times}</h3>
          </> : <>
            <Image 
            src={comRockCard? Rock : comScissorsCard ? Scissors : Paper}
            alt='Rock'
            className='w-[5rem] h-[5rem] m-auto'
            />
              <div className='mt-5 text-center'>
                <p className='text-sm'>Computer :</p>    
                <h3 className='font-bold'>{comCardResult}</h3>
              </div>
          </>}
          </div>
          {yourTurn?<>
          <div className='w-1/2 border-2 border-[#ebddb9] rounded-md p-3'>
            <Image 
            src={rockCard? Rock : scissorsCard? Scissors : Paper}
            alt='Rock'
            className='w-[5rem] h-[5rem] m-auto '
            />
              <div className='mt-5 text-center'>
                <p className='text-sm'>You :</p>    
                <h3 className='font-bold'>{cardResult}</h3>
              </div>
          </div>
          
          </> : <>
          
          </>}
        </div>
          <h3 className='font-bold mt-5'>{times > 0? 'Computer' : 'Your'} Turn</h3>
          <button disabled={times > 0 || disableButton ? true : false} onClick={yourTurnButton} type='submit' id={times > 0 ? 'wrong' : ''} className='bg-[#b0926b] border-2 text-white border-black mt-4 rounded-[0.2rem] w-full md:h-10 h-12'>Play Game</button>
          <button disabled={nextDisable === false ? true : false} className='mt-5 border-2 border-[#b0926b] text-[#b0926b] text-sm rounded-md px-5 py-2 bg-white' onClick={handleNext}>Next Round</button>
        </>}
        
      </> : <>
        <h1 className='text-xl mb-2 font-bold mt-5'>ITS A GAME</h1>
        <div className='w-full h-auto m-auto bg-white p-5 text-center rounded-md'>
          <div className='flex justify-between'>
            <h3 className='font-bold'>Rock</h3>
            <h3 className='font-bold'>Scissors</h3>
          </div>
          <div className='w-full flex justify-between text-center'>
            <Image 
            src={Rock}
            alt='Rock'
            className='w-[5rem] h-[5rem]'
            />
            <Image 
            src={Scissors}
            alt='Paper'
            className='w-[5rem] h-[5rem]'
            />
            </div>
            <div className="col-span-2 flex justify-center items-center">
            <Image 
            src={Paper}
            alt='Paper'
            className='w-[4rem] h-[4rem]'
            />
            </div>
            <h3 className='font-bold'>Paper</h3>
        </div>
          <h3 className='font-bold mt-5'>Guide</h3>
          <div className='h-24 overflow-y-scroll'>
            <p className='text-[0.7rem] m-auto '>There is 7 round, and computer is to play first then You,Computer will pick randomly around Rock Paper Scissors then u click on Play button and it will randomly generate probably Rock or Paper or Scissors for u too <br/>
            
            if the two card is Rock and Paper, that means Paper win <br/> if the two card is Rock and scissors, that means Rock win <br/> if the two card is Rock and Rock, that means its draw <br/> if the two card is Paper and Scissors, that means Scissors win </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input placeholder='Enter Your Name' name='myname' className='border-2 border-black rounded-[0.2rem] pl-5 mt-5 text-sm w-full md:h-9 h-12' onChange={handleChange} value={userName.myname}/> 
            <button disabled={userName.myname? false : true} type='submit' className='bg-[#b0926b] border-2 text-white border-black mt-4 rounded-[0.2rem] w-full md:h-10 h-12'>Start Game</button>
          </form>
      
      </>}
      </div>
    </div>
  )
}

