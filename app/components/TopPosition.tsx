import React from 'react'
import { LeaderboardDataI } from '../leaderboard/page'
import Leaderboardbox from './Leaderboardbox'
interface LeaderInterface {
  data: LeaderboardDataI[]
}

const TopPosition = ({ data }: LeaderInterface) => {
  return (
    <main className=' p-4 '>
      {data && (
        <section className=' flex justify-center items-end gap-4 py-24'>
          <Leaderboardbox data={data[1]} place={2}/>
          <Leaderboardbox data={data[0]} place={1}/>
          <Leaderboardbox data={data[2]} place={3}/>
        </section>
      )}
    </main>
  )
}

export default TopPosition