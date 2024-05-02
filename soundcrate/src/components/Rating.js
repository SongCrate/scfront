'use client';
import { Star } from '@phosphor-icons/react';

export default function Rating({ rating=0, out_of=5 }) {

  const filled_stars = Array.from({ length: rating }, (_, i) => (
    <Star weight="fill" key={"filled_star_"+i} />
  ));

  const empty_stars = Array.from({ length: out_of - rating }, (_, i) => (
    <Star weight="fill" className="opacity-20" key={"empty_star_"+i}/>
  ));

  return (
    <div className="flex items-center text-accent">
      {filled_stars}
      {empty_stars}
    </div>
  );
}